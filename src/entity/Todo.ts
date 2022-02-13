import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import User from "./User"

@Entity()
export default class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable:true})
    description: string;

    @Column({nullable:true})
    userId: number;

    @Column({type:"date"})
    dateOfCompletion: string;
    
    @Column({type:"enum",enum:{new :"NEW",complete : "COMPLETE"},default:"NEW"})
    status: boolean;

    @Column({type:"date", default:new Date().toISOString().slice(0,10).replace('T', ' ')})
    dateOfCreation: string;
    
    @Column({type:"date",nullable:true})
    dateOfModification: string;

    @ManyToOne(type=>User, user => user.todos) 
    user: User;
    
}