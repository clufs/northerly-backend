import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { RawMaterialModule } from '../raw_material/raw_material.module';

@Module({
  imports:[
    RawMaterialModule,
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
