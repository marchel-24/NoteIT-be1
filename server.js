const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

const app = require("./app");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
