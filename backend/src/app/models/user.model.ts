import { DataTypes, Model } from "sequelize";
import  sequelize  from  "../config/db.config";


export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  validPassword(password: string): boolean;
}


export const UserModel = sequelize.define<UserInstance, UserAttributes>("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // add custom instance methods
  UserModel.prototype.validPassword = function (password: string): boolean {
    // compare stored hash with input password
    return password === this.password;
  };

 
