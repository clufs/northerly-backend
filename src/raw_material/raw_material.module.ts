import { Module } from '@nestjs/common';
import { RawMaterialService } from './raw_material.service';
import { RawMaterialController } from './raw_material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw_material.entity';
import { Sizes } from './entities/sizes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RawMaterial, Sizes]),
  ],
  controllers: [RawMaterialController],
  providers: [RawMaterialService],
  exports: [
    RawMaterialService,
    TypeOrmModule // esto es muy importante para exportar.
  ]
})

export class RawMaterialModule {}
