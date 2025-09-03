import express from "express";

import userController from "./API/usersController.js";
// import sportsController from "./API/sportsController.js";

//==============================
// server
//==============================
const app = express();
app.use(express.json());

// app.use("/sports_EP", sportsController);
app.use("/users_EP", userController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}/api`);
});
