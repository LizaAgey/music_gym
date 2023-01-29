import React, {ChangeEvent, useState} from 'react';
import {PresetsType} from './PresetsContainer';
import {PresetGroupType} from '../../../redux/presetsReducer';
import styles from './Presets.module.css'
import {log} from 'util';

const Presets: React.FC<PresetsType> = (props) => {
    // const [selectedValue, setSelectedValue] = useState<string>("")
    const selectOnChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        // setSelectedValue(event.target.value)
        // props.selectPreset(presetId,)
        props.selectPreset(event.target.options[event.target.selectedIndex].id);
    };

    return (
        <div>
            <p>Presets:</p>
            <select
                name="sounds"
                id="sounds"
                className={styles.selectElement}
                onChange={(e) => selectOnChangeHandler(e)}>

                <option value="" selected disabled hidden>Choose a preset</option>

                {props.state.presets.map((preset: PresetGroupType) => {
                    return <option value={preset.presetName} id={preset.presetId}>{preset.presetName}</option>
                })}
            </select>

            {/*{props.state.selectedPresetID !== ''*/}
            {/*    ? <div>*/}
            {/*        Included in the preset:*/}
            {/*        <ul>{props.state.presets.find(preset => preset.presetName === selectedValue)?.presetElements.map((element) => {*/}
            {/*            return <li>{element.elementValue}</li>*/}
            {/*        })}</ul>*/}

            {/*    </div>*/}
            {/*    : null}*/}
        </div>
    );
};

export default Presets;