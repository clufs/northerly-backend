import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RawMaterialService } from './raw_material.service';
import { CreateRawMaterialDto } from './dto/create-raw_material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw_material.dto';
import { RawMaterial } from './entities/raw_material.entity';
import { Sizes } from './entities/sizes.entity';
import { UpdateSizesDto } from './dto/Sizes/update-size.dto';

@Controller('raw-material')
export class RawMaterialController {
  constructor(private readonly rawMaterialService: RawMaterialService) {}

  @Post()
  async create(
    @Body() createRawMaterialDto: CreateRawMaterialDto,
  ): Promise<RawMaterial> {
    return this.rawMaterialService.create(createRawMaterialDto);
  }

  @Get()
  findAll() {
    return this.rawMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawMaterialService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRawMaterialDto: UpdateRawMaterialDto,
  ): Promise<RawMaterial> {
    return this.rawMaterialService.update(id, updateRawMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawMaterialService.remove(id);
  }


  //-------- size ---------
  @Get('/size/:id')
  async getOneSize(@Param('id') id: string): Promise<Sizes>{
    return this.rawMaterialService.findOneSize(id);
  }

  @Patch('/size/:id')
  async updateSize(
    @Param('id') id: string,
    @Body() updateSizeDto: UpdateSizesDto, 
  ): Promise<Sizes>{
    return this.rawMaterialService.updateSizeDetails(id, updateSizeDto);
  }

}

