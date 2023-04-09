import React from 'react';
import styles from './SidebarIntevals.module.css'
import {Button, Form, Switch} from 'antd';
import {RootState, useAppDispatch} from "../../store/store";
import {saveSettings} from "../../store/slices/settings/slice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {MyTreeSelect} from "../ui/MyTreeSelect";
import {ProgressionSettings} from "../ui/ProgressionSettings";
import {setBpm} from "../../store/slices/metronome/slice";


export type FormSettingsValuesType = {
    presetName: string,
    trainingPeriod: number,
    bpm: number,
    soundMode: boolean
    isShowNext: boolean,
    isRandom: boolean
    key: string
}

export const SidebarIntevals: React.FC = () => {
    const {settings, metronome} = useSelector((state: RootState) => state);

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

                    <ProgressionSettings/>

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