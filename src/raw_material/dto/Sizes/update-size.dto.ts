import { IsBoolean, IsNumber, IsOptional, IsPositive } from "class-validator";


export class UpdateSizesDto {
  
  @IsNumber()
  @IsOptional()
  stock: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
  
}

