import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { username }
        });
        if (existingUser) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { username, password: hashedPassword }
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ userId: user.id }, SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
