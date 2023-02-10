import { connect, Connection, Mongoose } from "mongoose";
import { dbURL } from '../data/config.json';

interface dbController extends Object{
    instance: Mongoose;
    Start: () => Promise<void>;
}

const db: dbController = {instance: new Mongoose(), Start:async () => {}};

db.Start = async (): Promise<void> => {
    try {
        db.instance = await connect(dbURL);
        const connection: Connection = db.instance.connection;
        console.log(`Sucessfully connected to database at: ${connection.host}:${connection.port}`);
    } catch (error: any) {
        console.error(error);
    }
    
}

export default db;