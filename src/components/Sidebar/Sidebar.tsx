import React, {useEffect} from 'react';
import styles from './Sidebar.module.css'
import {Button, Form, Select, Slider, Switch} from 'antd';
import {presetsInitialData} from '../../data/presetsInitialData';
import {RootState, useAppDispatch} from "../../store/store";
import {initPresets, saveSettings, setPreset, stopProgress} from "../../store/slices/settings/slice";
import {PresetType} from "../../store/slices/settings/types";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";


export type FormSettingsValuesType = {
    presetName: string,
    trainingPeriod: number,
    interval: number,
    bpm: number,
    soundMode: boolean
    isShowNext: boolean
}

export const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const settingsState = useSelector((state: RootState) => state.settings);

    useEffect(() => {
        dispatch(initPresets(presetsInitialData));
    }, [])

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };
    const {Option} = Select;

    const onPresetSelectChangeHandler = (currentPresetName: string) => {
        let find = settingsState.presetsInitialData.find(p => p.name === currentPresetName);
        find && dispatch(setPreset(find));
    }

    const onStartButtonHandler = (formValues: FormSettingsValuesType) => {
        dispatch(saveSettings(formValues))
        navigate('/progress');
    };

    const onStopButtonClickHandler = () => {
        dispatch(stopProgress())
    };

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarContent}>
                <h2>Music GYM</h2>
                <h3>Settings</h3>

                <Form{...formItemLayout}
                     onFinish={onStartButtonHandler}
                     initialValues={{
                         'trainingPeriod': 2,
                         'soundMode': settingsState.isSoundOn,
                         'isShowNext': settingsState.isShowNext,
                         'interval': 3,
                         'beats': 4,
                         'bpm': settingsState.bpm
                     }}
                     style={{maxWidth: 600}}>

                    <Form.Item
                        name="preset"
                        label="Preset"
                        hasFeedback
                        rules={[{required: true, message: 'Please select a preset!'}]}>

                        <Select
                            onChange={onPresetSelectChangeHandler}
                            placeholder="Please select a preset">
                            {settingsState.presetsInitialData.map((preset: PresetType) => {
                                return <Option value={preset.name}
                                               id={preset.id}
                                               key={preset.id}
                                >{preset.name}</Option>
                            })}
                        </Select>
                    </Form.Item>

                    {/*                    {settingsState.preset?.id
                        ? <div>
                            Included in the preset:
                            <ul>{settingsState.presetsInitialData.find(preset => preset.id === settingsState.preset?.id)?.elements
                                .map((element) => {
                                    return <li key={element.id}>{element.value}</li>
                                })}</ul>

                        </div>
                        : null}*/}

                    {/*                    <Form.Item label="Training time, min">
                        <Form.Item name="trainingPeriod" noStyle>
                            <InputNumber min={1} max={20}/>
                        </Form.Item>
                    </Form.Item>*/}

                    <Form.Item name="bpm" label="BPM">
                        <Slider min={20} max={240} tooltip={{open: true}}/>
                    </Form.Item>

                    {/*                    <Form.Item label="Beats">
                        <Form.Item name="beats" noStyle>
                            <InputNumber min={1} max={8}/>
                        </Form.Item>
                    </Form.Item>*/}

                    <Form.Item name="soundMode" label="Sound" valuePropName="checked">
                        <Switch/>
                    </Form.Item>

                    <Form.Item name="isShowNext" label="Show next element" valuePropName="checked">
                        <Switch/>
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit"> START </Button>

                        {settingsState.isInProgress &&
                            <Button type="default" onClick={onStopButtonClickHandler}> STOP </Button>}

                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};