import React, {useEffect, useState} from 'react';
import styles from './Sidebar.module.css'
import {SettingsType} from '../SidebarDisplayContainersPropsCreator';
import {Button, Form, InputNumber, Select, Slider, Switch} from 'antd';
import {PresetGroupType, presetsInitialData} from '../../data/presetsInitialData';


const Sidebar: React.FC<SettingsType> = (props) => {
    useEffect(() => {
        props.setPresetsDataToStore(presetsInitialData)
    }, [])


    const [soundMode, setSoundMode] = useState<boolean>(props.state.isSoundOn)
    const presetId = props.state.presetId

    const soundModeHandler = () => {
        setSoundMode(!soundMode)
    };

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const {Option} = Select;

    const onFinish = (formValues: any) => {
        console.log(formValues);
        // props.saveSettings(presetId, trainingPeriod, interval, soundMode);
    };

    //  -----------OK
    const onPresetSelectChangeHandler = (currentPresetName: string) => {
        let currentPresetId = props.state.presetsInitialData.find(presetGroup => presetGroup.presetName === currentPresetName)?.presetId
        currentPresetId && props.setSettingsPresetId(currentPresetId)
    }

    const onTrainingInputChangeHandler = (trainingPeriod: number| null) => {
        trainingPeriod && props.setTrainingPeriod(trainingPeriod)
    };

    const onIntervalChangeHandler = (interval: number) => {
     props.setInterval(interval)
    };

    const onSoundModeChangeHandler = (soundMode: boolean) => {
        props.setSoundMode(soundMode)
    };


    console.log(props.state)

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarContent}>
                <h2>Music GYM</h2>
                <h3>Settings</h3>

                <Form{...formItemLayout}
                     onFinish={onFinish}
                     initialValues={{'input-number': 3, 'sound': true, 'interval': 3}}
                     style={{maxWidth: 600}}>

                    <Form.Item
                        name="preset"
                        label="Preset"
                        hasFeedback
                        rules={[{required: true, message: 'Please select a preset!'}]}>

                        <Select
                            onChange={onPresetSelectChangeHandler}
                            placeholder="Please select a preset">
                            {props.state.presetsInitialData.map((preset: PresetGroupType) => {
                                return <Option value={preset.presetName}
                                               id={preset.presetId}>{preset.presetName}</Option>
                            })}
                        </Select>


                    </Form.Item>

                    {props.state.presetId !== ''
                        ? <div>
                            Included in the preset:
                            <ul>{props.state.presetsInitialData.find(preset => preset.presetId === props.state.presetId)?.presetElements.map((element) => {
                                return <li>{element.elementValue}</li>
                            })}</ul>

                        </div>
                        : null}

                    <Form.Item label="Training time, min">
                        <Form.Item name="input-number" noStyle>
                            <InputNumber min={1} max={20} onChange={onTrainingInputChangeHandler}/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item name="interval" label="Interval">
                        <Slider max={15}
                                marks={{
                                    1: '1',
                                    3: '3',
                                    6: '6',
                                    9: '9',
                                    12: '12',
                                    15: '15',
                                }}
                                onChange={onIntervalChangeHandler}
                        />
                    </Form.Item>

                    <Form.Item name="sound" label="Sound" valuePropName="checked">
                        <Switch onChange={onSoundModeChangeHandler}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit">
                            START
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Sidebar