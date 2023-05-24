import "dotenv/config";
import app from "./app/app";


// Start the server on PORT 3000
const PORT: number | string = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  const secretKey = process.env.SECRET;

  console.log(secretKey);
});


