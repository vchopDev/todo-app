import { join } from "path";

export const config = () => ({
    database: {
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [
            join(__dirname, '**', '*.entity{.ts,.js}')
        ],
        synchronize: true,
    },
    api: {
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXP:process.env.JWT_EXP
    }
});