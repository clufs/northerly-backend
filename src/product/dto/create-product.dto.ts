import { IsArray, IsPositive, IsString } from "class-validator";

export class CreateProductDto {

  @IsString({message: 'El nombre del producto es obligatorio.'})
  name: string;

  @IsPositive({message: 'El valor precio tiene que ser positivo.'})
  priceToSell: number;

  @IsArray({message:'Tiene que ser un arreglo de materias primas uuids'})
  @IsString({each: true, message: 'Las materias primas son obligatorias. Porfavor Seleccione almenos una.'} )
  raw_materials_uuids: string[];

  @IsArray({message:'Tiene que ser un arreglo de variantes.'})
  @IsString({each: true, message: 'Almenos tiene que tener una variante del producto.'})
  variants: string[];
}
