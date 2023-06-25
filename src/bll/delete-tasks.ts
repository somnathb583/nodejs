import { ObjectId } from "mongodb";
import { getManager } from "../index";

export class DeleteTaskBLL {

    public async deleteTask(taskId) {
        taskId.id = taskId.id.trim();
        const tasks = await getManager().collection('tasks');
        const result = await tasks.deleteOne({
            "_id": new ObjectId(taskId.id)
        });
        return result ? "Record Deleted" : "Not Deleted"; 
    }
} 