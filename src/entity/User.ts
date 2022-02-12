import { OneToMany } from "typeorm";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Todo } from "./Todo";


@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:""})
    username:string;
    
    @Column({default:""})
    password:string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(type=> Todo,todo=>todo.user) 
    todos: Todo[];
}
