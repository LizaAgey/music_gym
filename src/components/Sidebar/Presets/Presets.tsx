import React, {ChangeEvent, useEffect} from 'react';
import {PresetsType} from './PresetsContainer';
import {PresetGroupType} from '../../../redux/presetsReducer';
import styles from './Presets.module.css'
import {presetsInitialData} from '../../../data/presetsInitialData';

const Presets: React.FC<PresetsType> = (props) => {

    useEffect(() => {
        props.setPresets(presetsInitialData)
    }, [])

    const selectOnChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        props.selectPreset(event.target.options[event.target.selectedIndex].id);
        props.setSettingsPresetID(event.target.options[event.target.selectedIndex].id)
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

            {props.state.selectedPresetID !== ''
                ? <div>
                    Included in the preset:
                    <ul>{props.state.presets.find(preset => preset.presetId === props.state.selectedPresetID)?.presetElements.map((element) => {
                        return <li>{element.elementValue}</li>
                    })}</ul>

                </div>
                : null}
        </div>
    );
};

export default Presets;