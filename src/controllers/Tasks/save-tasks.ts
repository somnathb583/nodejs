import { STATUS_CODES } from "http";
import { SaveTask } from "../../bll/save-task";

exports.post = async (req, res) => {
    const result = await new SaveTask().saveTask(req.body);
    console.log(result);
    res.send(STATUS_CODES.OK); 
}