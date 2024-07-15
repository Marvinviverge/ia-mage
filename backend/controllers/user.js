import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

/* Controleur inscription */
export const signup = async (req, res) => {
    try {
        // Hashage du mot de passe utilisateur
        if(req.body.password !== req.body.passwordconfirmation){
            res.status(401).json({message: "Les deux mots de passes ne sont pas identiques"})
        }
        const hash = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND));
        const user = new User({
            email: req.body.email,
            password: hash,
        });
        // Creation de l'utilisateur
        await user.save();
        res.status(201).json({ message: "Utilisateur créé !" });
    } catch (error) {
        res.status(400).json({ error });
    }
};

/* Controleur login */
export const signin = async (req, res) => {
    try {
        // Verification utilisateur existant
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        // Verification mot de passe utilisateur
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        // Connexion valide = token 1H
        const secret = fs.readFileSync('./validations/private.pem')
        const token = jwt.sign({
            userId: user._id, 
            hasFreeTrial: user.hasFreeTrial,
            role: user.role 
        }, secret, { expiresIn: process.env.JWT_DURING, algorithm:'RS256' }
        );
        res.status(200).json({
            userId: user._id,
            token,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const updateHasFreeTrial = async (req, res) => {
    try {
        const userId = req.body.tokenData.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé !" });
        }
        
        user.hasFreeTrial = false;
        await user.save();
        
        const secret = fs.readFileSync('./validations/private.pem')
        const token = jwt.sign({
            userId: user._id, 
            hasFreeTrial: user.hasFreeTrial,
            role: user.role 
        }, secret, { expiresIn: process.env.JWT_DURING, algorithm:'RS256' }
        );
        
        res.status(200).json({
            message: "Propriété hasFreeTrial mise à jour !",
            token,
        });

    } catch (error) {
        res.status(400).json({ error });
    }
};