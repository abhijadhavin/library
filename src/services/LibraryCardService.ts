import LibaryCardDeo, {ILibraryCardModel} from "../daos/LibaryCardDeo";
import { ILibraryCard } from "../models/LibraryCard ";


import { LibraryCardDoesNotExistError } from "../utils/LibraryErrors";

export async function registerLibraryCard(card:ILibraryCard):Promise<ILibraryCardModel> {
    try {
        const savedCard = new LibaryCardDeo(card);
        return await savedCard.save();
    } catch (error: any) {
        let c = await LibaryCardDeo.findOne({user:card.user}).populate('user');
        if(c) return c;
        throw error;
    }
}


export async function findLibraryCard(libraryCardId: string):Promise<ILibraryCardModel> {
    try {
        let card = await LibaryCardDeo.findOne({_id:libraryCardId}).populate('user');
        if(card) return card;

        throw new LibraryCardDoesNotExistError('The library card specified does not exist')
    } catch (error:any) {
        throw error;
    }
}