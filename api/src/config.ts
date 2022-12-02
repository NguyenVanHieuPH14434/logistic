import * as dotenv from 'dotenv';

export async function ReadConfig() {
    dotenv.config();
    const config = {
        server: {
            port : process.env.PORT || 3000
        },
        database : {
            db_url: process.env.DB_URL,
            db_name: process.env.DB_NAME,
        }
    }

    // hide the database url
    Object.defineProperty(config.database, 'db_url', {
        enumerable: false
    });

    return config;
}