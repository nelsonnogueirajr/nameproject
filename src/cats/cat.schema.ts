import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
});

export interface Cat extends mongoose.Document {
  name: string;
  breed: string;
  age: number;
}