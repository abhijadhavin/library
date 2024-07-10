import { Request, Response } from "express";
import { registerLibraryCard, findLibraryCard} from "../services/LibraryCardService";



import { LibraryCardDoesNotExistError } from "../utils/LibraryErrors";
import { ILibraryCard } from "../models/LibraryCard ";

async function getLibraryCard(req:Request, res:Response) {
    const {cardId} = req.params;

    try {
        let libraryCard = await findLibraryCard(cardId);
        res.status(200).json({message: 'reterieved the users card',libraryCard})
    } catch (error:any) {
        if(error instanceof LibraryCardDoesNotExistError) {
            res.status(404).json({message: "The specified libary Card does not exist"});
        }  else {
            res.status(500).json({message: "Unable the reterive the libary Card", error});
        }
    }
}

async function createLibaryCard(req:Request, res:Response) {
    const card:ILibraryCard = req.body

    try {
        let libraryCard = await registerLibraryCard(card);
        res.status(201).json({message: "Generated libary card for user", libraryCard});
    } catch (error:any) {
        res.status(500).json({message: "Unable to create libary Card at this time", error});        
    }
}

export default {getLibraryCard, createLibaryCard};
