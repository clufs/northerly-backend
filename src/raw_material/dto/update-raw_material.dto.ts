import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateRawMaterialDto } from './create-raw_material.dto';

export class UpdateRawMaterialDto extends PartialType(CreateRawMaterialDto) {

  @IsOptional()
  isActive: boolean;

}
