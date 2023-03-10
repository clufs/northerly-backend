import { IsArray, isBoolean, IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';


export class CreateRawMaterialDto {
  
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  priceToBuy: number;

  @IsNumber()
  @IsOptional()
  stock?: number

  @IsString({each: true})
  @IsArray()
  @IsOptional()
  sizes?: string[] 
}
