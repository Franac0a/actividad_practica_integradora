import { IProductRepository } from './IProductRepository';
import { Product } from './Product';

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    return await Product.findAll();
  }

  async findById(id: number): Promise<Product | null> {
    return await Product.findByPk(id);
  }

  async create(data: Partial<Product>): Promise<Product> {
    //see castea a 'any' internamente solo si Sequelize lo requiere por el tipo Partial, 
    // pero se mantiene el tipado estricto en la firma de nuestra interfaz
    return await Product.create(data as any); 
  }

  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    const product = await Product.findByPk(id);
    if (!product) return null;
    
    return await product.update(data);
  }

  async updateStatus(id: number, status: 'DISPONIBLE' | 'SIN_STOCK' | 'DISCONTINUADO'): Promise<Product | null> {
    const product = await Product.findByPk(id);
    if (!product) return null;
    
    return await product.update({ status });
  }

  async delete(id: number): Promise<boolean> {
    const deletedRows = await Product.destroy({ where: { id } });
    return deletedRows > 0;
  }
}