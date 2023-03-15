import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RawMaterial } from './raw_material.entity';

@Entity()
export class Sizes{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: string;

  @Column('numeric', {
    default: 0,
  })
  stock?: number;

  @ManyToOne(
    () => RawMaterial,
    (rm) => rm.sizes,
    
  )
  rawMaterial: RawMaterial;

}
