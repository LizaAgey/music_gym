import React from "react";
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import styles from './PresetElementsList.module.scss'
import {Divider, List, Typography} from "antd";
import {EPresetMode} from "../../store/slices/preset/types";
import {setPreset} from "../../store/slices/preset/slice";


export const PresetElementsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const {preset} = useSelector((state: RootState) => state);

    React.useEffect(() => {
        dispatch(setPreset(preset.currentPreset));
    }, [])

    return (
        <>
            <div className={styles.container}>
                <Divider orientation="left">{preset.currentPreset.title}</Divider>
                <List
                    header={<div>{EPresetMode[preset.currentPreset.type]}S</div>}
                    bordered
                    dataSource={preset.rawElements}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text mark></Typography.Text> {item}
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
}