import { Request, Response } from 'express';
import prisma from '../config/db';
import { generateCodename } from '../utils/generateCodename';
import { Status } from '@prisma/client';
import { generateConfirmationCode } from '../utils/generateConfirmationCode';

export const getGadgets = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { status } = req.query;

        // Validate status against allowed values
        if (status && !Object.values(Status).includes(status as Status)) {
            res.status(400).json({
                error: `Invalid status '${status}'. Allowed statuses are: ${Object.values(
                    Status
                ).join(', ')}.`
            });
            return;
        }
        // Fetch gadgets with optional status filtering
        const gadgets = await prisma.gadget.findMany({
            where: status ? { status: status as Status } : undefined
        });

        // If no gadgets are found, return an appropriate message
        if (gadgets.length === 0) {
            res.status(404).json({ message: 'No gadgets available' });
            return;
        }

        // Append random success probability
        const gadgetsWithProbability = gadgets.map((gadget) => ({
            ...gadget,
            missionSuccessProbability: `${Math.floor(Math.random() * 100)}%`
        }));

        res.json(gadgetsWithProbability);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const addGadget = async (req: Request, res: Response) => {
    try {
        let name = generateCodename();

        // Keep generating a new name if it already exists
        while (await prisma.gadget.findMany({ where: { name } })) {
            name = generateCodename();
        }

        const gadget = await prisma.gadget.create({
            data: { name, status: Status.Available }
        });

        res.status(201).json(gadget);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteGadget = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        const gadget = await prisma.gadget.findUnique({ where: { id } });
        if (!gadget) {
            res.status(404).json({ error: 'Gadget not found' });
            return;
        }

        if (gadget.status === 'Decommissioned') {
            res.status(400).json({ error: 'Gadget is already decommissioned' });
            return;
        }

        await prisma.gadget.update({
            where: { id },
            data: {
                status: 'Decommissioned',
                decommissionedAt: new Date() // Set timestamp
            }
        });

        res.status(200).json({ message: 'Gadget decommissioned successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const selfDestruct = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        // Check if the gadget exists
        const gadget = await prisma.gadget.findUnique({ where: { id } });
        if (!gadget) {
            res.status(404).json({ error: 'Gadget not found' });
            return;
        }

        // Generate a random confirmation code (for simulation purposes)
        const confirmationCode = generateConfirmationCode();

        // Update gadget status to 'Destroyed'
        const updatedGadget = await prisma.gadget.update({
            where: { id },
            data: { status: Status.Destroyed } // Ensures valid status update
        });

        res.json({
            message: 'Self-destruct sequence activated!',
            confirmationCode,
            gadget: updatedGadget
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
