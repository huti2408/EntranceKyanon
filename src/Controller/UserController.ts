import {Request, Response} from "express";
import jwt from "jsonwebtoken"
import md5 from "md5"
import { getManager, getRepository } from "typeorm";
import User from "../entity/User";

export default class UserController{
    
    public static async GetAllUsers(req: Request, res: Response){
        const entityManager = getManager();
        try{
            const users = await entityManager.find(User);
            res.status(200).json(users)
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error:err.message}); 
        }
    }
    public static async SignUp(req: Request, res: Response){
        const userRepo = getRepository(User)
        const {password,username,firstName,lastName,age} = req.body
        const existedUser = await userRepo.findOne({username})
        if(existedUser){
            res.status(400).json({message:"Username already taken"})
        }
        else{
            try{
                const hashPass = md5(password)
                const newUser =  userRepo.create({
                    username,
                    password: hashPass,
                    firstName,
                    lastName,
                    age
                })
                await userRepo.save(newUser)
                res.status(201).json("Sign Up Successfully!")
             }
             catch(err){
                 console.log(err.message)
                 res.status(400).json({error:err.message}); 
             }
        }
        
    }
    public static async SignIn(req: Request, res: Response){
        try{
            const userRepo = getRepository(User)
            const {password,username} = req.body
            if(!password || !username){
                res.status(400).json("Bad Request")
            }
            const user = await userRepo.findOne({username})
            if (!user || user.password !== md5(password)){
                res.status(400).json("Username or password is not correct!")
            }
            else{
                if(user.password === md5(password)){
                    const userid = user.id;
                    const token = jwt.sign({
                        id: userid, name: user.lastName
                    }, process.env.KEY_JWT || "ABC",
                        { expiresIn: 60 * 60 * 4 }
                    )
                    res.status(200).json({token,userid})
                }
                else{
                    res.status(400).json("Username or password is not correct!")
                }
            }
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error:err.message}); 
        }
        
    }
}