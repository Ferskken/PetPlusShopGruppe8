import { DataTypes, Model, OrderItem} from "sequelize";
import  sequelize  from  "../config/db.config";


export interface OrderAttributes {
    cartItems?: OrderItem;
    id?: number;
    quantity?: number;
    firstName?: string;
    lastName?: string;
    address?: string;
    address2?: string;
    zipCode?: number;
    city?: string;
    phone?: number;
  }

  export interface OrderInstance extends Model<OrderAttributes>, OrderAttributes {}

  export  const OrderModel = sequelize.define<OrderInstance, OrderAttributes>("Order", 
  
   {
    cartItems: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    address2: {
      type: DataTypes.STRING,
      allowNull: false,
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


