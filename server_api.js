import express from "express";
import userController from "./API/userController.js";
import sportsController from "./API/sportsController.js";

//==============================
// server
//==============================
const app = express();
app.use(express.json());

app.use("/sports", userController);
app.use("/users", sportsController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}/api`);
});
