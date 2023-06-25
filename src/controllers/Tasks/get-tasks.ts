import { STATUS_CODES } from "http";
import { GetAllTask } from "../../bll/get-tasks";

exports.get = async (req, res) => {
    const filterName = req.query.filterName;
    const filterValue = req.query.filterValue;
    const result = await new GetAllTask().getTask(filterName,filterValue);
    res.status(200).send(result);
}