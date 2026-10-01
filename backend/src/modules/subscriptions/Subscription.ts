import { Model, DataTypes } from 'sequelize';
import { DatabaseConnection } from '../../database/DatabaseConnection';

const sequelize = DatabaseConnection.getInstance().getSequelize();

export class Subscription extends Model {
  declare id: number;
  declare userId: number; 
  declare productId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Subscription.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'subscriptions',
  timestamps: true 
});