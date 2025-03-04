import { where } from "sequelize";
import db from "../models";

class DoctorService {
    getTopDoctorHome = (limit) => {
        return new Promise(async (resolve, reject) => {
            try {
                let users = await db.User.findAll({
                    where: {
                        roleId: "R2",
                    },
                    limit: limit,
                    order: [["createdAt", "DESC"]],
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: db.AllCode,
                            as: "positionData",
                            attributes: ["valueEn", "valueVi"],
                        },
                        {
                            model: db.AllCode,
                            as: "genderData",
                            attributes: ["valueEn", "valueVi"],
                        },
                    ],
                    raw: true,
                    nest: true,
                });

                resolve({ errCode: 0, data: users });
            } catch (error) {
                reject(error);
            }
        });
    };

    getAllDoctorsService = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let doctors = await db.User.findAll({
                    where: {
                        roleId: "R2",
                    },
                    attributes: { exclude: ["password", "image"] },
                });
                resolve({ errCode: 0, data: doctors });
            } catch (error) {
                reject(error);
            }
        });
    };

    saveDetailInfoDoctor = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    !data.doctorId ||
                    !data.contentHTML ||
                    !data.contentMarkdown
                ) {
                    resolve({ errCode: 1, message: "Missing parameters" });
                } else {
                    await db.Markdown.create({
                        contentMarkdown: data.contentMarkdown,
                        contentHTML: data.contentHTML,
                        description: data.description,
                        doctorId: data.doctorId,
                    });
                    resolve({
                        errCode: 0,
                        message: "Save info doctor succeed",
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    };
}
export default new DoctorService();
