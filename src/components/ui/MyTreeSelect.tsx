import React from "react";
import {TreeSelect} from 'antd';
import {DataNode} from 'antd/lib/tree';
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {EPresetMode, PresetType} from "../../store/slices/preset/types";
import {setPreset} from "../../store/slices/preset/slice";


export const MyTreeSelect: React.FC = () => {
    const {preset} = useSelector((state: RootState) => state);

    const dispatch = useAppDispatch();
    const [value, setValue] = React.useState<string>();
    const treeData: DataNode[] = getTreeData(preset.allPresets);

    const onChange = (newValue: string) => {
        setValue(newValue);
        let find = preset.allPresets.find(p => p.title === newValue);
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
                // treeDefaultExpandedKeys={["Notes"]}
                treeDefaultExpandAll
                onChange={onChange}
                treeData={treeData}
                defaultValue={preset.currentPreset.title}
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