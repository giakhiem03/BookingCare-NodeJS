import doctorService from "../services/doctorService";

class DoctorController {
    getTopDoctorHome = async (req, res) => {
        let limit = req.query.limit;
        if (!limit) limit = 10;
        try {
            let response = await doctorService.getTopDoctorHome(+limit);
            console.log(response);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res
                .status(200)
                .json({ errCode: -1, message: "Error from server..." });
        }
    };

    getAllDoctors = async (req, res) => {
        try {
            let response = await doctorService.getAllDoctorsService();
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res
                .status(200)
                .json({ errCode: -1, message: "Error from server..." });
        }
    };

    postInfoDoctor = async (req, res) => {
        try {
            let response = await doctorService.saveDetailInfoDoctor(req.body);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res
                .status(200)
                .json({ errCode: -1, message: "Error from server..." });
        }
    };
}
export default new DoctorController();
