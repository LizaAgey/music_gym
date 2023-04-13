import {createSelector} from '@reduxjs/toolkit'
import {RootState} from '../../../store'

export const rawElements = (state: RootState) => state.intervalTraining.rawElements;
export const nextChordIndex = (state: RootState) => state.intervalTraining.nextChordIndex;

export const selectNextChordString = createSelector(
    [nextChordIndex, rawElements],
    (index, array) => array[index]
);