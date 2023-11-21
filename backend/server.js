import app from "./app.js";
import db from "./config/db.js";

const PORT = process.env.PORT || 3000;

db.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
