import React from "react";
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import styles from './PresetElementsList.module.scss'
import {Divider, List, Typography} from "antd";
import {PresetMode} from "../../store/slices/settings/types";


export const PresetElementsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const settingsState = useSelector((state: RootState) => state.settings);

    return (
        <>
            {!settingsState.isInProgress && settingsState.preset.id !== 0  ?
                <div className={styles.container}>
                    <Divider orientation="left">{settingsState.preset.name}</Divider>
                    <List
                        header={<div>{PresetMode[settingsState.preset.type]}S</div>}
                        bordered
                        dataSource={settingsState.preset.elements}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text mark></Typography.Text> {item.value}
                            </List.Item>
                        )}
                    />
                </div> : null}
        </>
    );
}