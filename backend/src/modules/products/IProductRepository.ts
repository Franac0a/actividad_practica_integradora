import { Product } from './Product';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  create(data: Partial<Product>): Promise<Product>;
  update(id: number, data: Partial<Product>): Promise<Product | null>;
  updateStatus(id: number, status: 'DISPONIBLE' | 'SIN_STOCK' | 'DISCONTINUADO'): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
}