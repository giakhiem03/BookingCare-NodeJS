import { where } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";
import e from "express";
import { raw } from "body-parser";

class UserService {
    salt = bcrypt.genSaltSync(10);
    hashPassword(password) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashPassword = await bcrypt.hashSync(password, this.salt);
                resolve(hashPassword);
            } catch (e) {
                reject(e);
            }
        });
    }

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
                        attributes: [
                            "email",
                            "roleId",
                            "firstName",
                            "lastName",
                            "password",
                        ],
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

    createNewUser = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let check = await this.checkUserEmail(data.email);
                if (check) {
                    resolve({
                        errCode: 1,
                        errMessage: "Your email is already in used",
                    });
                } else {
                    let hashPasswordFromBcrypt = await this.hashPassword(
                        data.password
                    );
                    await db.User.create({
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        roleId: data.roleId,
                        positionId: data.positionId,
                        image: data.avatar,
                    });

                    resolve({
                        errCode: 0,
                        message: "OK",
                    });
                }
            } catch (error) {
                resolve({ errCode: 2, errMessage: error.name });
            }
        });
    };

    getAllUser = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let listUser;
                if (id === "ALL") {
                    listUser = await db.User.findAll();
                } else {
                    listUser = await db.User.findOne({
                        where: {
                            id,
                        },
                    });
                }
                resolve({
                    errCode: 0,
                    users: listUser,
                });
            } catch (error) {
                resolve({ errCode: 2, errMessage: error.name });
            }
        });
    };

    deleteUser = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.User.destroy({
                    where: {
                        id,
                    },
                });
                resolve({
                    errCode: 0,
                    message: "OK",
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    updateUserData = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    !data.id ||
                    !data.roleId ||
                    !data.positionId ||
                    !data.gender
                ) {
                    resolve({
                        errCode: 2,
                        errMessage: "Missing required parameters",
                    });
                }
                let user = await db.User.findOne({
                    where: { id: data.id },
                    raw: false,
                });
                if (user) {
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;
                    user.address = data.address;
                    user.roleId = data.roleId;
                    user.positionId = data.positionId;
                    user.gender = data.gender;
                    user.phoneNumber = data.phoneNumber;
                    if (data.avatar) {
                        user.image = data.avatar;
                    }
                    await user.save();
                    resolve({ errCode: 0, message: "Update user succeed" });
                }
            } catch (error) {
                reject(error);
            }
        });
    };
}

export default new UserService();
