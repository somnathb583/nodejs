import { ObjectId } from "mongodb";
import { getManager } from "../index";

export class GetAllTask {

    // This method will will fetch all records based on the id present or not
    public async getTask(filterName: string, filterValue : string | number) {
        let result;
        const tasks = await getManager().collection('tasks');
        if (!filterName && !filterValue) {
            result = await tasks.find({}).toArray();
        } else {
            let filter;
            if (filterName == "_id"){
                filter = new ObjectId(filterValue)
            }
            result = await tasks.find({[filterName]: filter ?? Number(filterValue)}).toArray();
        }
        return result;
    }
}  