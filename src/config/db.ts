import mongoose from 'mongoose';
import color from 'ansi-colors';
import { copyFileSync } from 'fs';

class Database {
    db: string;

    constructor() {
        this.db =
            'mongodb+srv://moon:moon123@cluster0.l5nxcyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    }

    async connectDB() {
        try {
            await mongoose.connect(this.db);
            console.log(color.green('connected to DB...'));
        } catch (err) {
            console.log(err);
            console.log(color.red('Unable to connect DB'));
        }
    }
}

export default new Database();
