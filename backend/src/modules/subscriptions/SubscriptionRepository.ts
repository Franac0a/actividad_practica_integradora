import { ISubscriptionRepository } from './ISubscriptionRepository';
import { Subscription } from './Subscription';

export class SubscriptionRepository implements ISubscriptionRepository {
  async subscribe(userId: number, productId: number): Promise<Subscription> {
    // findOrCreate busca la suscripcin y, si no existe, la crea
    // asi se evita duplicados sin necesidad de hacer dos consultas separada
    const [subscription] = await Subscription.findOrCreate({
      where: { userId, productId },
      defaults: { userId, productId }
    });
    
    return subscription;
  }

  async unsubscribe(userId: number, productId: number): Promise<boolean> {
    const deletedRows = await Subscription.destroy({
      where: { userId, productId }
    });
    
    return deletedRows > 0;
  }

  async findSubscribersByProduct(productId: number): Promise<Subscription[]> {
    return await Subscription.findAll({
      where: { productId }
    });
  }
}