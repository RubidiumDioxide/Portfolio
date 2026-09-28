import { ScriptLine } from "./script-line.interface";


export interface DisplayLine extends ScriptLine { 
    displayedText: string, 
    isCursorVisible: boolean,   
    isVisible: boolean 
}
