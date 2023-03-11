import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RawMaterial } from '../raw_material/entities/raw_material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductToShow } from './interfaces/productsToShow';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(RawMaterial)
    private readonly rawMaterialRepository: Repository<RawMaterial>,
  ){}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productRepository.create(createProductDto);
      await this.productRepository.save(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
    }    
  }


  async findOne(id: string): Promise<ProductToShow> {
    try {
      const product = await this.productRepository.findOneBy({id});
      const {raw_materials_uuids, priceToSell ,...rest} = product;

      let totalPrice = 0;
      const rawsmaterials = await Promise.all(raw_materials_uuids.map( rm => this.rawMaterialRepository.findOneBy({id: rm})));
      rawsmaterials.forEach( rm => totalPrice = totalPrice + +rm.priceToBuy);
      
      const productToSend:ProductToShow = {
        ...rest,
        priceToSell: +priceToSell,
        totalPrice,
        profits: priceToSell - totalPrice
      };
      
      return productToSend;
      
    } catch (error) {
      throw new NotFoundException('El producto no fue encontrado.')
    }
  }
  
  async findAll(): Promise<ProductToShow[]> {
    
    try {

      const products = await this.productRepository.find();
      return await Promise.all(products.map(product => this.findOne(product.id)));

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('algo paso negraso revisar logs...')
    }

  }

  async update(id: string, updateProductDto: UpdateProductDto):Promise<ProductToShow> {
    
    try {

      const product = await this.findOne(id);
      
      await this.productRepository.update(product.id, updateProductDto);

      return await this.findOne(product.id);

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('algo paso negraso revisar logs...')
    }

  }

  async remove(id: string):Promise<{msg: string}> {
    
    try {
      await this.productRepository.delete(id);
      return {
        msg: 'producto eliminado'
      }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('algo paso negraso revisar logs...')
    }


  }
}
