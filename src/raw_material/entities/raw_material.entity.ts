import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { Sizes } from './sizes.entity';

@Entity()
export class RawMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{unique: true})
  name: string;

  @Column({
    default: 0,
  })
  priceToBuy: number;

  @OneToMany(
    () => Sizes,
    (size) => size.rawMaterial,
    {cascade: true}
  )
  sizes?: Sizes[];

  @Column({nullable: true})
  stock?: number;

  @Column('boolean', {default: true})
  isActive: boolean;
  
}
