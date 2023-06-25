import { UserRegistrationBLL } from "../../bll/user-registration";

exports.post = async (req, res) => {
    const { username , userPassword, email } = req.body;
    const result = await new UserRegistrationBLL().registerUser(username, userPassword,email);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send(result);
    }
}