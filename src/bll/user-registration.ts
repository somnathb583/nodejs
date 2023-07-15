import { ObjectId } from "mongodb";
import { getManager } from "../index";
import * as jwt  from 'jsonwebtoken';
import * as NodeCache from 'node-cache';

export class UserRegistrationBLL {

    static cache = new NodeCache();

    public async registerUser(username: string, userpassword: string, email: string) {

        // check for existing user
        const users = await getManager().collection('Users');
        const oldUser = await users.find({ "email": email }).toArray();

        if (oldUser.length > 0) {
            return { "message": "User already Present, Please login"};
        } else {
            const totalUser = await users.find({}).count({});
            const newUserObj = {
                username,
                userpassword,
                email,
                userId : totalUser + 1
            }
            const token = this.createToken(newUserObj, totalUser + 1);
            newUserObj['token'] = token;
            const result = await users.insertOne(newUserObj);
            if(result) {
                return newUserObj;
            }
        }
    }

    public async loginUser(email: string, password: string) {
        
        // check whether user exist or not 
        const users = await getManager().collection('Users');
        const [oldUser] = await users.find({ "email": email }).toArray();
        if (oldUser && oldUser.userpassword === password) {
            let token = oldUser.token;
            const details = UserRegistrationBLL.cache.get(oldUser.email);
            if (!details) {
                const isValidToken = this.validateToken(oldUser, oldUser.token);
                if (!isValidToken) {
                    token = this.createToken(oldUser, oldUser.userId);
                    await users.updateOne({
                        "_id" : new ObjectId(oldUser._id)
                    }, {
                        $set : {
                            "token": token
                        }
                    })
                }
                UserRegistrationBLL.cache.set(oldUser.email,token, 60 * 5);
            } 
            return Object.assign({},oldUser,{Authtoken: token});
        } else if(!oldUser) {
            return "You are not register, Please Sign Up ➡️➡️";
        } else {
            return "Email or Password is incorrect 🥺🥺";
        }
    }

    public validateToken(user, token) {
        try {
            jwt.verify(token, user.email);
            return true;
        } catch(error) {
            return false;
        }
    }

    public createToken(user, userId) {
        return jwt.sign(
            {
                userId: userId,
                email : user.email
                
            },
            user.email,
            {
                expiresIn: "300000"
            }
        );
    }
}