import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";

export interface OrderAttributes {
  cartItems?: any[];
  id?: number;
  quantity?: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  email?: string;
  zipCode?: number;
  city?: string;
  phone?: number;
}

export interface OrderInstance extends Model<OrderAttributes>, OrderAttributes {}

const OrderModel = sequelize.define<OrderInstance, OrderAttributes>(
  "Order",
  {
    cartItems: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);

export { OrderModel };