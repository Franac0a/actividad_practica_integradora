import { IProductRepository } from './IProductRepository';
// import { ISubject } from '../observer/ISubject';
import { Product } from './Product';

export class ProductService {
  constructor(
    private productRepository: IProductRepository,
    private eventPublisher: ISubject
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: number): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    return await this.productRepository.create(data);
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product | null> {
    return await this.productRepository.update(id, data);
  }

  async changeStatus(id: number, status: 'DISPONIBLE' | 'SIN_STOCK' | 'DISCONTINUADO'): Promise<Product | null> {
    const updatedProduct = await this.productRepository.updateStatus(id, status);

    if (updatedProduct) {
      // Patrón Observer: El Subject notifica a los Observers registrados.
      // El payload contiene la información que el NotificationService necesitará.
      await this.eventPublisher.notify({
        resourceId: updatedProduct.id,
        resourceTitle: updatedProduct.title,
        newStatus: updatedProduct.status,
      });
    }

    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return await this.productRepository.delete(id);
  }
}