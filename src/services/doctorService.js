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
}
export default new DoctorService();
