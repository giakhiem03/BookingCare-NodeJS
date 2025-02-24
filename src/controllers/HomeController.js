import db from "../models/index";
import UserServices from "../services/CRUDServices";

class HomeController {
    getHomePage = async (req, res) => {
        try {
            let data = await db.User.findAll();

            return res.render("homePage", { data: JSON.stringify(data) });
        } catch (e) {
            console.log(e);
        }
    };

    getAboutPage = (req, res) => {
        return res.render("aboutPage");
    };

    getCreateUser = (req, res) => {
        return res.render("crud");
    };

    postCreateUser = async (req, res) => {
        let data = await UserServices.createNewUser(req.body);
        return res.render("crud");
    };

    displayGetCRUD = async (req, res) => {
        let users = await UserServices.getAllUser();
        return res.render("displayCRUD", { users });
    };

    getEditCRUD = async (req, res) => {
        let userId = req.query.id;
        if (userId) {
            let user = await UserServices.getUserById(userId);
            if (user) {
                return res.render("userDetail", { user });
            }
            return res.send("User Not Found");
        }

        return res.send("User Not Found");
    };

    putCRUD = async (req, res) => {
        let data = req.body;
        if (data) {
            let dataRS = await UserServices.updateUser(data);
            if (dataRS) {
                return res.redirect("/get-crud");
            }
            return res.send("User isn't exist");
        }
        return res.send("User isn't exist");
    };

    deleteCRUD = async (req, res) => {
        let userId = req.query.id;
        if (userId) {
            try {
                await UserServices.deleteUser(userId);
                return res.redirect("/get-crud");
            } catch (error) {
                return res.send(error);
            }
        } else {
            return res.send("User isn't exist");
        }
    };

    // deleteCRUD = async (req, res) => {
    //     try {
    //         let userId = req.query.id;
    //         if (!userId) {
    //             return res.status(400).send("User ID is required");
    //         }

    //         const result = await UserServices.deleteUser(userId);
    //         return res.redirect("/get-crud");
    //     } catch (error) {
    //         console.error("Error in deleteCRUD:", error); // Ghi log lỗi
    //         return res.status(500).send(error.message);
    //     }
    // };
}

export default new HomeController();
