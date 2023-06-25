import { getManager } from "../index";
import { tasks } from "../entity/Task";
import { ObjectId } from "mongodb";

export class SaveTask {
    public async saveTask(obj: tasks) {
        let result;
        const tasks = await getManager().collection('tasks');
        if (obj._id) {
            const { _id , ...updateObj} = obj;
            await tasks.updateOne({
                "_id": new ObjectId(obj._id)
            }, {
                $set: {...updateObj}
            });
        } else {
            result = await tasks.insertOne(obj);
        }
        return result;
    }
} 