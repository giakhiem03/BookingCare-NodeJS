import bcrypt from "bcryptjs";
import db from "../models";
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

    createNewUser(data) {
        return this.hashPassword(data.password)
            .then(async (res) => {
                data.password = res;
                await db.User.create({
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === "1" ? true : false,
                    roleId: data.roleId,
                });
                return "create a new user succeed!";
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getAllUser = async () => {
        try {
            let users = await db.User.findAll({ raw: true });
            return users;
        } catch (error) {
            console.log(error);
        }
    };

    getUserById = async (id) => {
        try {
            let user = await db.User.findByPk(id, { raw: true });
            return user;
        } catch (error) {
            console.log(error);
        }
    };

    updateUser = async (data) => {
        try {
            let user = await db.User.findOne({ where: { id: data.id } });
            if (user) {
                return await db.User.update(data, {
                    where: {
                        id: data.id,
                    },
                })
                    .then((res) => {
                        return "update user succeed";
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    };

    // deleteUser = async (id) => {
    //     try {
    //         let user = await db.User.findOne({ where: { id } });
    //         if (user) {
    //             return await db.User.destroy({
    //                 where: {
    //                     id,
    //                 },
    //             })
    //                 .then((res) => {
    //                     return "delete user succeed";
    //                 })
    //                 .catch((e) => {
    //                     console.log(e);
    //                 });
    //         } else {
    //             return null;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    deleteUser = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await db.User.findOne({ where: { id } });
                if (user) {
                    await user.destroy();
                }
                resolve("delete user succeed");
            } catch (error) {
                reject(error);
            }
        });
    };
}

export default new UserService();
