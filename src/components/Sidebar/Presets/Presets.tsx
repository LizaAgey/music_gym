import React from 'react';
import Button from '../../Button/Button';
import {PresetsType} from './PresetsContainer';
import {PresetElementType} from '../../../redux/presetsReducer';

const Presets: React.FC<PresetsType> = (props) => {
    return (
        <div>
            <p>Sounds for intervals:</p>
            <select name="sounds" id="sounds">
                {props.state.map((element: PresetElementType) => {
                    return <option value={element.value} key={element.id}>{element.value}</option>
                })}
            </select>
            <div>
                INFO:
                {props.state.map((element: PresetElementType) => {
                   return element.value;
                })}
            </div>
            <div>
                <span>Sound</span>
                <Button name={'on'} onClick={() => {
                }}/>
            </div>
        </div>
    );
};

export default Presets;