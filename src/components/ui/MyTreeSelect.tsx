import React from "react";
import {TreeSelect} from 'antd';
import {EPresetMode, PresetType, SettingsPageType} from "../../store/slices/settings/types";
import {DataNode} from 'antd/lib/tree';
import {setPreset} from "../../store/slices/settings/slice";
import {useAppDispatch} from "../../store/store";


interface Props {
    settingsState: SettingsPageType;
}

export const MyTreeSelect: React.FC<Props> = ({settingsState}) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = React.useState<string>();
    const treeData: DataNode[] = getTreeData(settingsState.presetsInitialData);

    const onChange = (newValue: string) => {
        setValue(newValue);
        let find = settingsState.presetsInitialData.find(p => p.title === newValue);
        find && dispatch(setPreset(find));
    };

    return (
        <>
            <TreeSelect
                showSearch
                style={{width: '100%'}}
                value={value}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                placeholder="Please select"
                allowClear
                treeDefaultExpandedKeys={["Notes"]}
                onChange={onChange}
                treeData={treeData}
                defaultValue="leaf1"
            />
        </>
    );
}

const getTreeData = (objects: Array<PresetType>): DataNode[] => {

    const result: any = [
        {
            value: 'Notes',
            title: 'Notes',
            children: [],
        },
        {
            value: 'Progressions',
            title: 'Progressions',
            children: [],
        },
    ]

    objects.forEach((object) => {
        if (object.type == EPresetMode.DEGREE) {
            let progression = result.find((el: any) => el.value === 'Progressions');
            let category = progression.children.find((el: any) => el.value === object.category?.toString());
            if (category) {
                category.children.push({
                    value: object.title,
                    title: object.title
                })
            } else {
                progression.children.push({
                    value: object.category,
                    title: object.category,
                    children: [{
                        value: object.title,
                        title: object.title
                    }]
                })
            }
        } else if (object.type == EPresetMode.NOTE) {
            result.find((el: any) => el.value === 'Notes')
                .children.push(
                {
                    value: object.title,
                    title: object.title,
                }
            )
        }

    });

    return result;
};