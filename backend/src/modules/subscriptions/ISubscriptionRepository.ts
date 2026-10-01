import { Subscription } from './Subscription';

export interface ISubscriptionRepository {
  subscribe(userId: number, productId: number): Promise<Subscription>;
  unsubscribe(userId: number, productId: number): Promise<boolean>;
  findSubscribersByProduct(productId: number): Promise<Subscription[]>;
}