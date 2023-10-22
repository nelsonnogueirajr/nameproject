// cats.controller.ts
import { Controller, Get, Post, Body, Delete, Param, NotFoundException } from '@nestjs/common';
import { CatsService } from './cats.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CatDto } from './cat.dto';
import { Cat } from './cat.schema';


@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiBody({ type: CatDto })
  async create(@Body() catData: Cat): Promise<Cat> {
    return this.catsService.create(catData);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Cat> {
    try {
      const cat = await this.catsService.findById(id);
      return cat;
    } catch (error) {
      // Se o erro for uma NotFoundException, retorne uma resposta com status 404
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      // Se for outro tipo de erro, retorne uma resposta com status 500 (Internal Server Error)
      throw error;
    }
  }
  
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Cat> {
    try {
      const deletedCat = await this.catsService.delete(id);
      return deletedCat;
    } catch (error) {
      // Se o erro for uma NotFoundException, retorne uma resposta com status 404
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      // Se for outro tipo de erro, retorne uma resposta com status 500 (Internal Server Error)
      throw error;
    }
  }
}
