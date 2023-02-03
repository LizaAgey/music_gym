import React, {useEffect, useState} from 'react';
import styles from './Sidebar.module.css'
import {SettingsType} from '../ContainersPropsCreator';
import {Button, Form, InputNumber, Select, Slider, Switch} from 'antd';
import {PresetGroupType, presetsInitialData} from '../../data/presetsInitialData';
import {Metronome} from "../Metronome/Metronome";

type FormSettingsValuesType = {
    presetName: string,
    trainingPeriod: number,
    interval: number,
    soundMode: boolean
}

export const Sidebar: React.FC<SettingsType> = (props) => {
    useEffect(() => {
        props.setPresetsDataToStore(presetsInitialData)
    }, [])

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };
    const {Option} = Select;

    const onPresetSelectChangeHandler = (currentPresetName: string) => {
        let currentPresetId = props.state.presetsInitialData.find(presetGroup => presetGroup.presetName === currentPresetName)?.presetId
        currentPresetId && props.setSettingsPresetId(currentPresetId)
    }

    const onStartButtonHandler = (formValues: FormSettingsValuesType) => {
        props.saveSettings(formValues.trainingPeriod, formValues.interval, formValues.soundMode)
        props.start()
    };

    const onStopButtonClickHandler = () => {
        props.stop()
    };

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarContent}>
                <h2>Music GYM</h2>
                <h3>Settings</h3>

                <Form{...formItemLayout}
                     onFinish={onStartButtonHandler}
                     initialValues={{'trainingPeriod': 2, 'soundMode': true, 'interval': 3}}
                     style={{maxWidth: 600}}>

                    <Form.Item
                        name="presetName"
                        label="Preset"
                        hasFeedback
                        rules={[{required: true, message: 'Please select a preset!'}]}>

                        <Select
                            defaultValue={props.state.presetsInitialData.length > 0 ? props.state.presetsInitialData[1].presetName : null}
                            onChange={onPresetSelectChangeHandler}
                            placeholder="Please select a preset">
                            {props.state.presetsInitialData.map((preset: PresetGroupType) => {
                                return <Option value={preset.presetName}
                                               id={preset.presetId}
                                               key={preset.presetId}
                                >{preset.presetName}</Option>
                            })}
                        </Select>


                    </Form.Item>

                    {props.state.presetId !== ''
                        ? <div>
                            Included in the preset:
                            <ul>{props.state.presetsInitialData.find(preset => preset.presetId === props.state.presetId)?.presetElements.map((element) => {
                                return <li key={element.elementId}>{element.elementValue}</li>
                            })}</ul>

                        </div>
                        : null}

                    <Form.Item label="Training time, min">
                        <Form.Item name="trainingPeriod" noStyle>
                            <InputNumber min={1} max={20}/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item name="soundMode" label="Sound" valuePropName="checked">
                        <Switch/>
                    </Form.Item>

                    <Metronome/>

                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit"> START </Button>

                        {props.state.isInProgress &&
                            <Button type="default" onClick={onStopButtonClickHandler}> STOP </Button>}

                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};