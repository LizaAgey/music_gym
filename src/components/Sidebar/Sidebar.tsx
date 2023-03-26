import React, {useEffect} from 'react';
import styles from './Sidebar.module.css'
import {Button, Col, Divider, Form, InputNumber, Row, Select, Slider, Switch} from 'antd';
import {presetsInitialData} from '../../data/presetsInitialData';
import {RootState, useAppDispatch} from "../../store/store";
import {initPresets, saveSettings, setPreset, stopProgress} from "../../store/slices/settings/slice";
import {EPresetMode, PresetType} from "../../store/slices/settings/types";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {MyTreeSelect} from "../ui/MyTreeSelect";
import {CheckOutlined, CloseOutlined} from "@mui/icons-material";


export type FormSettingsValuesType = {
    presetName: string,
    trainingPeriod: number,
    interval: number,
    bpm: number,
    soundMode: boolean
    isShowNext: boolean,
    elements: string
    isRandom: boolean
    key: string
}

export const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const settingsState = useSelector((state: RootState) => state.settings);

    const [bpm, setBpm] = React.useState<number | null>(70);

    const onChange = (newValue: number | null) => {
        setBpm(newValue);
    };

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldValue("elements", settingsState.preset?.elements.join('\n'))
    }, [settingsState.preset])

    useEffect(() => {
        dispatch(initPresets(presetsInitialData));
    }, [])

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
                        label="Preset">
                        <MyTreeSelect settingsState={settingsState}/>
                    </Form.Item>

                    {settingsState.preset.type === EPresetMode.DEGREE && <>
                        <Divider plain>Progression settings</Divider>
                        <Form.Item
                            name="key"
                            label="key">

                            <Select
                                showSearch
                                placeholder="Key"
                                // optionFilterProp="children"
                                // filterOption={(input, option) =>
                                //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                // }
                                options={[
                                    {
                                        value: 'A',
                                        label: 'A',
                                    },
                                    {
                                        value: 'B',
                                        label: 'B',
                                    },
                                    {
                                        value: 'C',
                                        label: 'C',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item name="major" label="Major">
                            <Switch defaultChecked
                            />
                        </Form.Item>
                        <Form.Item name="seventh" label="Seventh chords">
                            <Switch defaultChecked
                            />
                        </Form.Item>
                        <Divider/>
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
                        <TextArea rows={8}
                                  defaultValue={settingsState.preset?.elements.join('\n')}/>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
};