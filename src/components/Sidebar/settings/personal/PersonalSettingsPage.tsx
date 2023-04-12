import React, {useState} from "react";
import {Divider, Form, InputNumber, Row, Switch} from "antd";

export const PersonalSettingsPage: React.FC = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [countdownTime, setCountdownTime] = useState<number | undefined>(undefined);

    const handleSwitchChange = (checked: boolean) => {
        setIsEnabled(checked);
    };

    const handleCountdownTimeChange = (value: number | null) => {
        if (value) {
            setCountdownTime(value);
        }
    };

    return (
        <>
            <Divider plain>Personal settings</Divider>
            <Row>
                <Form layout="horizontal" style={{paddingLeft: 100}}>

                    <Form.Item label="Precount enabled" valuePropName="checked">
                        <Switch
                            checked={isEnabled}
                            onChange={handleSwitchChange}
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                        />
                    </Form.Item>
                    <Form.Item label="Precount value">
                        <InputNumber
                            disabled={!isEnabled}
                            min={1}
                            max={60}
                            defaultValue={countdownTime}
                            onChange={handleCountdownTimeChange}
                        />
                    </Form.Item>
                </Form>

            </Row>
            <Divider/>
        </>
    );
}