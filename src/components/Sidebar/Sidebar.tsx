import React, {useEffect, useState} from 'react';
import styles from './Sidebar.module.css'
import {SettingsType} from '../SidebarDisplayContainersPropsCreator';
import {Button, Form, InputNumber, Select, Slider, Switch} from "antd";
import {PresetGroupType} from "../../redux/presetsReducer";
import {presetsInitialData} from "../../data/presetsInitialData";
import PresetsContainer from './Presets/PresetsContainer';


const Sidebar: React.FC<SettingsType> = (props) => {
    const MIN_VALUE = 0
    const [trainingPeriod, setTrainingPeriod] = useState<number>(props.settings.trainingPeriod)
    const [interval, setInterval] = useState<number>(props.settings.interval)
    const [soundMode, setSoundMode] = useState<boolean>(props.settings.isSoundOn)
    const presetId = props.settings.presetId

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

    // нужно засетать,чтобы снизу селекта увидеть описание этого пресета с описанием всех его айтемов

    // const onPresetSelectChange = (value: string) => {
    //     const presetId: any = props.presets.presets.find(preset => preset.presetName === value);
    //     if (presetId && typeof presetId === 'string') {
    //         props.setSettingsPresetID(presetId);
    //     }
    // }

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarContent}>
                <h2>Music GYM</h2>
                <h3>Settings</h3>

                {/*  JUST TO SET PRESET INTO STATE */}
                <PresetsContainer/>

                <Form{...formItemLayout}
                     onFinish={onFinish}
                     initialValues={{'input-number': 3, 'sound': true, 'interval': 3}}
                     style={{maxWidth: 600}}>

                    <Form.Item
                        name="preset"
                        label="Preset"
                        hasFeedback
                        rules={[{required: true, message: 'Please select your country!'}]}>

                        <Select
                            // onChange={onPresetSelectChange}
                            placeholder="Please select a country">
                            {props.presets.presets.map((preset: PresetGroupType) => {
                                return <Option value={preset.presetName}
                                               id={preset.presetId}>{preset.presetName}</Option>
                            })}
                        </Select>

                        {props.presets.selectedPresetID !== ''
                            ? <div>
                                Included in the preset:
                                <ul>{props.presets.presets.find(preset => preset.presetId === props.presets.selectedPresetID)?.presetElements.map((element) => {
                                    return <li>{element.elementValue}</li>
                                })}</ul>

                            </div>
                            : null}
                    </Form.Item>

                    <Form.Item label="Training time, min">
                        <Form.Item name="input-number" noStyle>
                            <InputNumber min={1} max={10}/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item name="sound" label="Sound" valuePropName="checked">
                        <Switch/>
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
                        />
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

export default Sidebar;