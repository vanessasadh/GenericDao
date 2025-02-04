import { sqlite3 } from "sqlite3";
import{open}from 'sqlite';

export async function getDBConection() {
    return open ({
        filename: './database.sqlite',
        driver: ''
    });
}
    
