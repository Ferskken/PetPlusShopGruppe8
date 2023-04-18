
import app from "./app/app";

// Start the server
const PORT: number | string = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


