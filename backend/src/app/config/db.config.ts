import { Sequelize} from "sequelize";

const sequelize: Sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
  });
  

  sequelize.authenticate().then(() => {
    console.log("Database connected");
  });

  export default sequelize;