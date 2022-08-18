import { Table } from "./Table";

export interface Board{
    id: number;
    name: string;
    tables: Table[];
    isActual: boolean;
}