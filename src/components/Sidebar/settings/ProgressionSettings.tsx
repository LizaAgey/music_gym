import React, {useEffect} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {Divider, Form, Select, Switch} from "antd";
import {setKey, setMode, setSeventhChords} from "../../../store/slices/progression/slice";
import {setRawElements, setRawNotes} from "../../../store/slices/preset/slice";
import {useSelector} from "react-redux";
import {getCleanNotes} from "../../../utils/tonal";
import {EModeName} from "../../../store/types/musicEntities";

export const ProgressionSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const {progression, preset} = useSelector((state: RootState) => state);

    const onChangeKey = (e: any) => {
        dispatch(setKey(e));
    }

    const onChangeMode = (e: any) => {
        dispatch(setMode(e));
    }

    const onChangeSeventhChord = (e: any) => {
        dispatch(setSeventhChords(e));
    }

    useEffect(() => {
        dispatch(setRawElements(progression));
    }, [progression])

    useEffect(() => {
        dispatch(setRawElements(progression));
    }, [])

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
                    defaultValue={progression.key}
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
                    defaultValue={progression.mode}
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