import React from "react";
import {useAppDispatch} from "../../store/store";
import {Divider, Form, Select, Switch} from "antd";
import {SettingsPageType} from "../../store/slices/settings/types";
import {setKey} from "../../store/slices/settings/slice";


interface Props {
    settingsState: SettingsPageType;
}

export const ProgressionSettings: React.FC<Props> = ({settingsState}) => {
    const dispatch = useAppDispatch();
    const keys: Array<String> = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

    return (
        <>
            <Divider plain>Progression settings</Divider>
            <Form.Item
                name="key"
                label="key">
                <Select
                    onChange={(e) => dispatch(setKey(e))}
                    showSearch
                    placeholder="Key"
                    defaultValue={"C"}
                    options={keys.map((key) => {
                        return {
                            value: key,
                            label: key,
                        }
                    })}
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
        </>
    );
}