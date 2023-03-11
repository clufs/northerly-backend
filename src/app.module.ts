import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterialModule } from './raw_material/raw_material.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: (process.env.STATE === 'prod') ? {rejectUnauthorized: false, sslmode: 'require'}: false as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    RawMaterialModule,
    ProductModule,
  ],
})
export class AppModule {
  constructor(){
    console.log("STATE", process.env.STATE);
    console.log("host", process.env.DB_HOST);
    console.log("port", +process.env.DB_PORT);
    console.log("database", process.env.DB_NAME);
    console.log("username", process.env.DB_USERNAME);
    console.log("password", process.env.DB_PASSWORD);
  }
}
