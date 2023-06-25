import { UserRegistrationBLL } from "../../bll/user-registration";

exports.post = async (req, res) => {
    const { email, userpassword } = req.body;
    const result = await new UserRegistrationBLL().loginUser(email, userpassword);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send(result);
    }
}