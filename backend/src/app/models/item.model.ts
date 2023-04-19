import { DataTypes, Model} from "sequelize";
import  sequelize  from  "../config/db.config";


export interface ItemAttributes {
  id?: number;
  name: string;
  description: string;
  categories:string;
  price: number;
  image? : string;
}

export interface ItemInstance extends Model<ItemAttributes>, ItemAttributes {}

//defining the databasemodel
export  const ItemModel = sequelize.define<ItemInstance, ItemAttributes>("Item", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categories: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
      image : {
        type: DataTypes.STRING,
        allowNull: true,  
      }
    });
 
