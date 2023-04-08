import React, {useEffect} from 'react';
import styles from './Sidebar.module.css'
import {Button, Col, Form, InputNumber, Row, Slider, Switch} from 'antd';
import {RootState, useAppDispatch} from "../../store/store";
import {saveSettings} from "../../store/slices/settings/slice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {MyTreeSelect} from "../ui/MyTreeSelect";
import {ProgressionSettings} from "../ui/ProgressionSettings";
import {EPresetMode, PresetType} from "../../store/slices/preset/types";
import {selectPresetsWithPresetId} from '../../store/slices/preset/selectors';


export type FormSettingsValuesType = {
    presetName: string,
    trainingPeriod: number,
    bpm: number,
    soundMode: boolean
    isShowNext: boolean,
    elements: string
    isRandom: boolean
    key: string
}

export const Sidebar: React.FC = () => {
    const {settings, metronome, preset, progression} = useSelector((state: RootState) => state);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [bpm, setBpm] = React.useState<number | null>(70);

    const onChange = (newValue: number | null) => {
        setBpm(newValue);
    };

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldValue("elements", preset.currentPreset.elements.map(el => el.value).join('\n'));
    }, [preset.presetId])

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const onStartButtonHandler = (formValues: FormSettingsValuesType) => {
        formValues.bpm = bpm ? bpm : 0;
        dispatch(saveSettings(formValues))
        navigate('/progress');
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

                    <Form.Item
                        name="preset"
                        label="Preset">
                        <MyTreeSelect/>
                    </Form.Item>

                    {useSelector(selectPresetsWithPresetId)!.type === EPresetMode.DEGREE && <>
                        <ProgressionSettings/>
                    </>}


                    <Form.Item name="bpm" label="BPM">
                        <Row>
                            <Col span={12}>
                                <Slider
                                    min={20} max={240}
                                    onChange={onChange}
                                    value={typeof bpm === 'number' ? bpm : 0}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={20} max={240}
                                    style={{margin: '0 16px'}}
                                    value={bpm}
                                    onChange={onChange}
                                />
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item name="soundMode" label="Sound" valuePropName="checked">
                        <Switch/>
                    </Form.Item>

                    <Form.Item name="isShowNext" label="Show next element" valuePropName="checked">
                        <Switch/>
                    </Form.Item>

                    <Form.Item name="isRandom" label="Random order" valuePropName="checked">
                        <Switch/>
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit" block> START </Button>
                    </Form.Item>

                    <Form.Item name="elements" label="Elements">
                        <TextArea rows={8}/>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
};