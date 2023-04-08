import {RootState} from "../../store";
import {createSelector} from "@reduxjs/toolkit";

const selectPreset = (state: RootState) => state.preset;

export const selectPresetsWithPresetId = createSelector(
    [selectPreset],
    (preset) => preset.allPresets.find((p) => p.id === preset.presetId)
);

// const presetsWithPresetId = useSelector(selectPresetsWithPresetId);