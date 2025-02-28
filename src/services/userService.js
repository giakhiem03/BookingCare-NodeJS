import { where } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";
import e from "express";

class UserService {
    checkUserEmail = (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await db.User.findOne({
                    where: {
                        email,
                    },
                });

                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    handleUserLogin = (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = {};
                let isExist = await this.checkUserEmail(email);
                if (isExist) {
                    let user = await db.User.findOne({
                        where: {
                            email,
                        },
                        raw: true,
                        attributes: ["email", "roleId", "password"],
                    });
                    if (user) {
                        let check = await bcrypt.compareSync(
                            password,
                            user.password
                        );
                        if (check) {
                            userData.errCode = 0;
                            userData.errMessage = "Ok";
                            delete user.password;
                            userData.user = user;
                        } else {
                            userData.errCode = 3;
                            userData.errMessage = `Wrong password`;
                        }
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = `User's not found`;
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = `Username isn't exist in your system. Please try other email!`;
                }
                resolve(userData);
            } catch (error) {
                reject(error);
            }
        });
    };

    compareUserPassword = () => {
        return new Promise((resolve, reject) => {
            try {
            } catch (error) {
                reject(error);
            }
        });
    };

    getAllCodeService = (type) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!type) {
                    resolve({
                        errCode: 1,
                        errMessage: "Missing required parameters",
                    });
                } else {
                    let res = {};

                    let allCode = await db.AllCode.findAll({
                        where: {
                            type,
                        },
                    });
                    res.errCode = 0;
                    res.data = allCode;
                    resolve(res);
                }
            } catch (error) {
                reject(error);
            }
        });
    };
}

export default new UserService();
