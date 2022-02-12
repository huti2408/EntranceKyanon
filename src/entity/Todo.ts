import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import User from "./User"

@Entity()
export default class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    useId: number;

    @Column({type:"timestamp", default:() => "CURRENT_TIMESTAMP"})
    dateOfCompletion: string;
    
    @Column({type:"enum",enum:{new :"NEW",complete : "COMPLETE"},default:"NEW"})
    status: boolean;

    @Column({type:"timestamp", default:() => "CURRENT_TIMESTAMP"})
    dateOfCreation: string;
    
    @Column({type:"timestamp", default:() => "CURRENT_TIMESTAMP"})
    dateOfModification: string;

    @ManyToOne(type=>User, user => user.todos) 
    user: User;
    
}