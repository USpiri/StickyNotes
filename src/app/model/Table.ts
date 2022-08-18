import { Note } from "./Note";

export interface Table{
    id: number;
    name: string;
    notes: Note[];
}