import React from 'react';
import styles from './Sidebar.module.css'
import {Button, Col, Divider, Form, InputNumber, Radio, Row, Slider, Switch} from 'antd';
import {RootState, useAppDispatch} from "../../store/store";
import {saveSettings, setTrainingMode} from "../../store/slices/settings/slice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {MyTreeSelect} from "../ui/MyTreeSelect";
import {ProgressionSettings} from "../ui/ProgressionSettings";
import {EPresetMode} from "../../store/slices/preset/types";
import {setBpm} from "../../store/slices/metronome/slice";
import {RadioChangeEvent} from "antd/es/radio/interface";
import {ETrainingMode} from "../../store/slices/settings/types";


export type FormSettingsValuesType = {
    presetName: string,
    bpm: number,
    soundMode: boolean
    isShowNext: boolean,
    isRandom: boolean
    key: string
}

export const Sidebar: React.FC = () => {
    const {preset, settings, metronome} = useSelector((state: RootState) => state);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [localBpm, setLocalLocalBpm] = React.useState<number>(metronome.bpm);

    const onChange = (newValue: number | null) => {
        if (newValue) {
            setLocalLocalBpm(newValue);
        }
    };

    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const onStartButtonHandler = (formValues: FormSettingsValuesType) => {
        dispatch(saveSettings(formValues))
        dispatch(setBpm(localBpm))
        if (settings.trainingMode === ETrainingMode.METRONOME) {
            navigate('/metronome-progress');
        } else {
            navigate('/interval-progress');
        }
    };

    const onChangeModeHandler = (e: RadioChangeEvent) => {
        dispatch(setTrainingMode(e.target.value))
    };

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarContent}>
                <h2>Music GYM</h2>
                <h3>Settings</h3>

                <Form{...formItemLayout}
                     onFinish={onStartButtonHandler}
                     form={form}
                     initialValues={{
                         'soundMode': settings.isSoundOn,
                         'isShowNext': settings.isShowNext,
                         'beats': metronome.beatsPerMeasure,
                         'bpm': metronome.bpm
                     }}
                     style={{maxWidth: 600}}>

                    <Divider plain>Training mode</Divider>
                    <Radio.Group onChange={e => onChangeModeHandler(e)}
                                 name="radiogroup" defaultValue={ETrainingMode.METRONOME}>
                        <Radio value={ETrainingMode.METRONOME}>Metronome </Radio>
                        <Radio value={ETrainingMode.INTERVAL_FUNCTIONS}>Interval functions</Radio>
                    </Radio.Group>
                    <Divider/>


                    <Form.Item
                        name="preset"
                        label="Preset">
                        <MyTreeSelect/>
                    </Form.Item>

                    {preset.currentPreset.type === EPresetMode.DEGREE && <>
                        <ProgressionSettings/>
                    </>}


                    {settings.trainingMode === ETrainingMode.METRONOME && <>
                        <Form.Item name="bpm" label="BPM">
                            <Row>
                                <Col span={12}>
                                    <Slider
                                        min={20} max={240}
                                        onChange={onChange}
                                        value={typeof localBpm === 'number' ? localBpm : 0}
                                    />
                                </Col>
                                <Col span={4}>
                                    <InputNumber
                                        min={20} max={240}
                                        style={{margin: '0 16px'}}
                                        value={localBpm}
                                        onChange={onChange}
                                    />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item name="soundMode" label="Sound" valuePropName="checked">
                            <Switch/>
                        </Form.Item>
                    </>}

                    <Form.Item name="isShowNext" label="Show next element" valuePropName="checked">
                        <Switch/>
                    </Form.Item>

                    <Form.Item name="isRandom" label="Random order" valuePropName="checked">
                        <Switch/>
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit" block> START </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
};