import { Model, DataTypes } from 'sequelize';
import { DatabaseConnection } from '../../database/DatabaseConnection';

//se obtiene la instancia unica y extraemos sequelize
const sequelize = DatabaseConnection.getInstance().getSequelize();
    
export class Product extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare status: 'DISPONIBLE' | 'SIN_STOCK' | 'DISCONTINUADO';
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Product.init({
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  status: { 
    type: DataTypes.ENUM('DISPONIBLE', 'SIN_STOCK', 'DISCONTINUADO'), 
    allowNull: false,
    defaultValue: 'DISPONIBLE' 
  }
}, {
  sequelize, //se inyecta la conexión obtenida del Singleton
  tableName: 'products',
  timestamps: true
});