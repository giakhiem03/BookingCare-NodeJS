import userService from "../services/userService";

class UserController {
    handleLogin = async (req, res) => {
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
}

export default new UserController();
