import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

@Entity()
export class Users {

    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    username: string

    @Column()
    userpassword: string

    @Column()
    email: string

    @Column()
    userId: number

    @Column()
    token: string
}
