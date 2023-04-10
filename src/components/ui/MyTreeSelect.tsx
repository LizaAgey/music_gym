import React from "react";
import {Cascader} from 'antd';
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {EPresetMode, PresetType} from "../../store/slices/preset/types";
import {setPreset} from "../../store/slices/preset/slice";
import type {DefaultOptionType} from 'antd/es/cascader';

interface Option {
    value: string;
    label: string;
    children?: Option[];
}

export const MyTreeSelect: React.FC = () => {
    const {preset} = useSelector((state: RootState) => state);
    const dispatch = useAppDispatch();
    const treeData: Option[] = getTreeData(preset.allPresets);

    function handleCascaderChange(value: any, selectedOptions: any) {
        let find = preset.allPresets.find(p => p.title === value[value.length - 1]);
        find && dispatch(setPreset(find));
    }

    const filter = (inputValue: string, path: DefaultOptionType[]) => {
        return path.some(
            (option) => (option.label as string)?.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
        );
    };

    return (
        <>
            <Cascader
                defaultValue={[EPresetMode[preset.currentPreset.type], preset.currentPreset.title]}
                onChange={handleCascaderChange}
                options={treeData}
                showSearch={{filter}}
                onSearch={(value) => console.log(value)}
                placeholder="Please select" placement={"bottomLeft"}/>
        </>
    );
}

const getTreeData = (objects: Array<PresetType>): Option[] => {

    const result: any = [
        {
            value: 'Notes',
            label: 'NOTES',
            children: [],
        },
        {
            value: 'Progressions',
            label: 'PROGRESSIONS',
            children: [],
        },
        {
            value: 'Scales',
            label: 'SCALES',
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
                    label: object.title
                })
            } else {
                progression.children.push({
                    value: object.category,
                    label: object.category,
                    children: [{
                        value: object.title,
                        label: object.title
                    }]
                })
            }
        } else if (object.type == EPresetMode.NOTE) {
            result.find((el: any) => el.value === 'Notes')
                .children.push(
                {
                    value: object.title,
                    label: object.title,
                }
            )
        } else if (object.type == EPresetMode.SCALE) {
            result.find((el: any) => el.value === 'Scales')
                .children.push(
                {
                    value: object.title,
                    label: object.title,
                }
            )
        }

    });

    return result;
};