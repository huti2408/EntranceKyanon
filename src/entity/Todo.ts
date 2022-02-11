import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./User"

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    useId: number;

    @Column("date")
    dateOfCompletion: string;
    
    @Column({type:"enum",enum:{new :"NEW",complete : "COMPLETE"},default:"NEW"})
    status: boolean;

    @Column("date")
    dateOfCreation: string;
    
    @Column("date")
    dateOfModification: string;

    @ManyToOne(type=>User, user => user.todos) 
    user: User;
    
}