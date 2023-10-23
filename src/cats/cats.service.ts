
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);
  private cats: Cat[] = [];
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}
  
  async create(catData: Cat): Promise<Cat> {
    this.logger.log('Criado gatos..');
    const createdCat = new this.catModel(catData);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    this.logger.log('Buscando todos os gatos..');
    return this.catModel.find().exec();
  }

  async findById(id: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(id).exec();
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return cat;
  }

  async delete(id: string): Promise<Cat> {
    const deletedCat = await this.catModel.findByIdAndRemove(id).exec();
    
    if (!deletedCat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    
    return deletedCat;
  }
 
}
