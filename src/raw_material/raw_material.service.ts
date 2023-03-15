import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRawMaterialDto } from './dto/create-raw_material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw_material.dto';
import { RawMaterial } from './entities/raw_material.entity';
import { Sizes } from './entities/sizes.entity';
import { UpdateSizesDto } from './dto/Sizes/update-size.dto';

@Injectable()
export class RawMaterialService {

  private readonly logger = new Logger('[Raw Material]');  

  constructor(
    @InjectRepository(RawMaterial)
    private readonly rawMaterialRepository: Repository<RawMaterial>,
    @InjectRepository(Sizes)
    private readonly sizesRepository: Repository<Sizes>,
  ) {}

  async create(createRawMaterialDto: CreateRawMaterialDto): Promise<RawMaterial> {
    try {    
      const { sizes: sizesFromDTO = [], ...rmDetails } = createRawMaterialDto;

      const newRawProduct = this.rawMaterialRepository.create({
        ...rmDetails,
        sizes: sizesFromDTO.map((size) => this.sizesRepository.create({size: size})),
      });

      await this.rawMaterialRepository.save(newRawProduct);
      return newRawProduct;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return this.rawMaterialRepository.find({
      relations: {
        sizes: true,
      }
    });
  }

  async findOne(id: string):Promise<RawMaterial> {
    return this.rawMaterialRepository.findOne(id, {relations : ['sizes']},);
  }

  async update(id: string, updateRawMaterialDto: UpdateRawMaterialDto):Promise<RawMaterial> {
    try {
      const { priceToBuy, isActive = true } = updateRawMaterialDto;
      
      await this.rawMaterialRepository.update(id, {
        priceToBuy,
        isActive,
      });

      return this.rawMaterialRepository.findOneBy({id});

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
      
  }

  async remove(id: string): Promise<{msg: string}> {
    try {
      await this.rawMaterialRepository.delete(id);
      return {
        msg: 'El producto fue eliminado correctamente'
      };
    }
    catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

//----------------- Sizes -------------------

  async findOneSize(id: string): Promise<Sizes>{
    return this.sizesRepository.findOneBy({id});
  }

  async updateSizeDetails(id: string, updateSizesDto: UpdateSizesDto):Promise<Sizes>{
    try {
      await this.sizesRepository.update(id, updateSizesDto);
      const size = await this.sizesRepository.findOneBy({id});
      return size;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async removeSize(id: string):Promise<{msg: string}>{
    try {
      this.sizesRepository.delete(id);
      return{
        msg: 'El talle fue eliminado correctamente'
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
