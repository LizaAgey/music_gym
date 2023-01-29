import React, {ChangeEvent, useState} from 'react';
import {PresetsType} from './PresetsContainer';
import {PresetGroupType} from '../../../redux/presetsReducer';
import styles from "./Presets.module.css"

const Presets: React.FC<PresetsType> = (props) => {
    const [selectedValue, setSelectedValue] = useState<string>("")
    const selectOnChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value)
    };

    return (
        <div>
            <p>Presets:</p>
            <select
                name="sounds"
                id="sounds"
className={styles.selectElement}
                onChange={(e)=>selectOnChangeHandler(e)}>

                <option value="" selected disabled hidden>Choose a preset</option>

                {props.state.presets.map((preset: PresetGroupType) => {
                    return <option value={preset.groupName} key={preset.id}>{preset.groupName}</option>
                })}
            </select>

            {selectedValue !== ""
                ? <div>
                    Included in the preset:
                    <ul>{props.state.presets.find(preset => preset.groupName === selectedValue)?.elements.map((element) => {
                        return <li>{element.value}</li>
                    })}</ul>

                </div>
            : null}
        </div>
    );
};

export default Presets;