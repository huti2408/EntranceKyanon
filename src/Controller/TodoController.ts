import {Request, Response} from "express";
import { getRepository } from "typeorm";
import  Todo  from "../entity/Todo";
import jwt from "jsonwebtoken"
import User from "../entity/User";

interface DecodeType{
    id:number;
    name:string;
    exp:number;
}

export default class TodoController {
    public static async GetAllTodos(req: Request, res: Response){
        const todoRepo = getRepository(Todo)
        try{
            const todos = await todoRepo.find();
            res.status(200).json(todos)
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error:err.message}); 
        }
    }
    public static async AddTodo(req: Request, res: Response){
        const todoRepo = getRepository(Todo)
        try{
            const todo = await todoRepo.create(req.body)
            await todoRepo.save(todo)
            res.status(201).json("Create Successfully!")
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error:err.message}); 
        }
    }
    public static async UpdateTodo(req: Request, res: Response){
        const todoRepo = getRepository(Todo)
        try{
            const todo = await todoRepo.findOne(req.params.id)
            todo.dateOfModification = new Date().toISOString().slice(0,10).replace('T', ' ')
            todoRepo.merge(todo,req.body)
            await todoRepo.save(todo)
            res.status(201).json("Update Successfully!")
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error:err.message}); 
        }
    }
    public static async DeleteTodo(req: Request, res: Response){
        const todoRepo = getRepository(Todo)
        try{
            await todoRepo.delete(req.params.id)
            res.status(201).json("Delete Successfully!")
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error:err.message}); 
        }
    }
    public static async GetTodoById(req: Request, res: Response){
        const todoRepo = getRepository(Todo)
        try{
            const todo = await todoRepo.findOne(req.params.id)
            res.status(201).json(todo)
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error:err.message}); 
        }
    }
    public static async AssignTodo(req: Request, res: Response){
        const todoRepo = getRepository(Todo)
        try{
            const idTodo = req.params.id
            const head = req.headers["authorization"]
            if(head){
                const token = head.split(" ")[1] || "";
            if (!token) return res.status(401).send({message: "Invalid token"})
            else{
                const decode = jwt.decode(token) as DecodeType
                const userIdCurrent = decode.id
                
            }
            }
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error:err.message}); 
        }
    }
    public static async GetTodosByUser(req: Request, res: Response){
        const todoRepo = getRepository(Todo)
        try{
            const {id} = req.params
            const todos = await todoRepo.find()
            const todosByUser = todos.filter(todo => todo.userId.toString() === id)
            res.status(201).json(todosByUser)
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error:err.message}); 
        }
    }
}