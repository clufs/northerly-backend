import { RawMaterial } from "src/raw_material/entities/raw_material.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{unique: true})
  name: string;

  @Column('numeric')
  priceToSell: number;

  @Column('text',{array: true})
  variants: string[];

  @Column('text', {array: true})
  raw_materials_uuids: string[];

  @Column('boolean', {default: false})
  isActive: boolean;
}
