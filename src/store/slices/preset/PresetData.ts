import {
    ChordElementType,
    DegreeElementType,
    ECategory,
    EPresetMode,
    NoteElementType,
    Progression,
    ScaleElementType
} from "./types";

export class Preset {
    id: number
    title: string
    type: EPresetMode
    elements: Array<NoteElementType | ChordElementType | DegreeElementType | ScaleElementType>
    category?: ECategory
    progression?: Progression

    constructor() {
        this.id = Math.floor(Math.random() * 1000000);
        this.title = '';
        this.type = EPresetMode.UNDEFINED;
        this.elements = []
    }


}