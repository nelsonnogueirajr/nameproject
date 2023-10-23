// cats.controller.ts
import { Controller, Get, Post, Body, Delete, Param, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CatsService } from './cats.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatDto } from './cat.dto';
import { Cat } from './cat.schema';


@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiBody({ type: CatDto })
  @ApiResponse({ status: 201, description: 'O gato foi criado com sucesso.' })
  async create(@Body() catData: Cat): Promise<string> {
    try {
      const isDataValid = this.catsService.create(catData);
      if (isDataValid) {
        await this.catsService.create(catData);
        // Retorna uma mensagem no corpo da resposta e define o código de status 201
        return 'Gato criado com sucesso!';
      } else {
        // Se os dados não forem válidos, lança uma exceção com código de status 400 (Bad Request)
        throw new HttpException('Dados do gato inválidos.', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Erro ao criar o gato.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
  //retorna tudo 
  //@Get()
  //async findAll(): Promise<Cat[]> {
  //  return this.catsService.findAll();
  //}

  @Get()
  async findAllNames(): Promise<string[]> {
    const cats = await this.catsService.findAll();
    return cats.map(cat => cat.name);
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
