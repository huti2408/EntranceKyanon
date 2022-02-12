import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction)=>{
    const head = req.headers["authorization"]
    if(head){
        const token = head.split(" ")[1] || "";
    if (!token) return res.status(401).send({message: "Invalid token"})
    try {
        await jwt.verify(token, process.env.KEY_JWT || "abc")
        next();
     }
     catch (err){
         console.error(err)
         res.status(401).json(err);
         return;
     }
    }
    else{ 
        res.status(401).send({message: "Invalid token"})
    }
}