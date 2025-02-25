import express from "express";
import HomeController from "../controllers/HomeController";
import UserController from "../controllers/UserController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", HomeController.getHomePage);
    router.get("/about", HomeController.getAboutPage);
    router.get("/create", HomeController.getCreateUser);
    router.post("/post-crud", HomeController.postCreateUser);
    router.get("/get-crud", HomeController.displayGetCRUD);
    router.get("/edit", HomeController.getEditCRUD);
    router.post("/put-crud", HomeController.putCRUD);
    router.get("/delete", HomeController.deleteCRUD);

    // User Controller
    router.post("/api/login", UserController.handleLogin);

    return app.use("/", router);
};

export default initWebRoutes;
