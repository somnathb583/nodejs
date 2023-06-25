import { ObjectId } from "mongodb";
import { getManager } from "../index";

export class DeleteTaskBLL {

    public async deleteTask(id: string) {
        const tasks = await getManager().collection('tasks');
        const result = await tasks.deleteOne({
            "_id": new ObjectId(id)
        });
        return result; 
    }
} 