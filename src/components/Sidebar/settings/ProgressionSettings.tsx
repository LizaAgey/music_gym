import React, {useEffect} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {Divider, Form, Select, Switch} from "antd";
import {setKey, setMode, setSeventhChords} from "../../../store/slices/preset/slice";
import {useSelector} from "react-redux";
import {getCleanNotes} from "../../../utils/tonal";
import {EModeName} from "../../../store/types/musicEntities";

export const ProgressionSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const {preset} = useSelector((state: RootState) => state);

    const onChangeKey = (e: any) => {
        dispatch(setKey(e));
    }

    const onChangeMode = (e: any) => {
        dispatch(setMode(e));
    }

    const onChangeSeventhChord = (e: any) => {
        dispatch(setSeventhChords(e));
    }

    return (
        <>
            <Divider plain>Progression settings</Divider>
            <Form.Item
                name="key"
                label="key">
                <Select
                    onChange={(e) => onChangeKey(e)}
                    showSearch
                    placeholder="Key"
                    defaultValue={preset.currentPreset.progression?.key}
                    options={getCleanNotes().map((n) => {
                        return {
                            value: n.value,
                            label: n.value,
                        }
                    })}
                />
            </Form.Item>
            <Form.Item
                name="mode"
                label="mode">
                <Select
                    onChange={(e) => onChangeMode(e)}
                    showSearch
                    defaultValue={preset.currentPreset.progression?.mode}
                    options={Object.values(EModeName).map((m) => {
                        return {
                            value: m,
                            label: m,
                        }
                    })}
                />
            </Form.Item>
            <Form.Item name="seventh"
                       label="Seventh chords">
                <Switch defaultChecked
                        onChange={(e) => onChangeSeventhChord(e)}
                />
            </Form.Item>
            <Divider/>
        </>
    );
}