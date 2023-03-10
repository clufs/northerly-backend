import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw_material.entity';
import { RawMaterialService } from './raw_material.service';
import { Repository } from 'typeorm';

describe('Raw material [service]', () => {
  let service: RawMaterialService;
  let rmRepo: Repository<RawMaterial>;

  const RM_REPO_TOKEN = getRepositoryToken(RawMaterial);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RawMaterialService,
        {
          provide: RM_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          }
        },
      ],
    }).compile();

    service = module.get<RawMaterialService>(RawMaterialService);
    rmRepo = module.get<Repository<RawMaterial>>(RM_REPO_TOKEN);

  });

  describe('[CREATE] Materia Prima', () => { 
    it('Tiene que crear un nuevo producto con su respectivo UUID', async() => {
      
      await service.create({size: 'xl'})
      
      
    }) 
  })
});
