import { STATUS_CODES } from "http";
import { DeleteTaskBLL } from "../../bll/delete-tasks";

exports.post =async (req, res) => {
    const id = req.body; 
    const result = await new DeleteTaskBLL().deleteTask(id);
    res.status(200).send(result);
}