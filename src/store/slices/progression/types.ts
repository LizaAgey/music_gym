import { Mode as TonalMode } from "@tonaljs/tonal";
import {ENoteName} from "../../types/musicEntities";

export type ProgressionSettings = {
    key: ENoteName
    seventhChords: boolean
    mode: string,
    progression: Array<number>
}

