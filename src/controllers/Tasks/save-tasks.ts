import { STATUS_CODES } from "http";
import { SaveTask } from "../../bll/save-task";

exports.post = async (req, res) => {
    const result = await new SaveTask().saveTask(req.body,req.user);
    if(result) {
        res.status(200).send(result); 
    } else {
        res.status(400).send("Not Added")
    }
}