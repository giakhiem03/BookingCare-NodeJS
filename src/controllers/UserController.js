import userService from "../services/userService";

class UserController {
    handleLogin = async (req, res) => {
        console.log(req.body);
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: "Missing inputs parameter!",
            });
        }

        let user = await userService.handleUserLogin(email, password);

        return res.status(200).json({
            errCode: user.errCode,
            errMessage: user.errMessage,
            user: user.user || {},
        });
    };

    getAllCode = async (req, res) => {
        try {
            let type = req.query.type;
            let data = await userService.getAllCodeService(type);

            return res.status(200).json(data);
        } catch (error) {
            console.log("Get all code error: ", error);
            return res.status(200).json({
                errCode: -1,
                errMessage: "Error from server",
            });
        }
    };
}

export default new UserController();
