import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port:  Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'test12',
    password:  process.env.DATABASE_PASSWORD || '1234',
    database: process.env.DATABASE_DB || 'nest',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
}