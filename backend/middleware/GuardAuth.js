import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ encoding: "latin1" });

export const GuardAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Il n'y a pas de token !" });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Il n'y a pas de token !" });
    }
    
    try {
        const secret = fs.readFileSync('/etc/secrets/public.pem', 'utf-8');

        const decodedToken = jwt.verify(token, secret);

        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            return res.status(401).json({ message: "Invalid user ID" });
        }

        req.auth = {
            userId: userId
        };
        
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid request!",
            error: error.message
        });
    }
};