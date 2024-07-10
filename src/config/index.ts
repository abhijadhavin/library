import dotenv from 'dotenv'

dotenv.config();

const MONGO_USERNAME:string = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD:string = process.env.MONGO_PASSWORD || '';


let mUrl:string = '';

if(MONGO_USERNAME == '') {
    mUrl = `mongodb://localhost:27017/librarydb`;
} else {
    mUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/librarydb`;
}

const MONGO_URL:string =  mUrl;
const PORT:number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;
const ROUNDS:number = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : Math.floor(Math.random() * 11);

export const config = {
    mongo: {
        url:MONGO_URL
    }, 
    server: {
        port: PORT,
        rounds: ROUNDS
    }
}