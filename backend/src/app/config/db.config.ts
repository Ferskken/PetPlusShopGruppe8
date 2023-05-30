 /** Import the Sequelize library */ 
import { Sequelize } from "sequelize";

 /** // Create a new Sequelize instance with SQLite as the database dialect and a file named "database.sqlite" as the storage location */ 
const sequelize: Sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

 /** Authenticate the Sequelize instance by connecting to the database and log a message to the console if the connection is successful */ 
sequelize.authenticate().then(() => {
  console.log("Database connected");
});

 /** Export the created Sequelize instance to be used in other parts of the application */ 
export default sequelize;