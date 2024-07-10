import { Request, Response } from "express";
import { findAllBooks, modifyBook, queryBooks, registerBook, removeBook } from "../services/BookService";
import { IBookModal } from "../daos/BookDao";
import { IBook } from "../models/Book";
import { BookDoesNotExistError } from "../utils/LibraryErrors";
 

export async function getAllBooks(req:Request, res:Response){
    try {
       let books = await findAllBooks();
       res.status(200).json({message:"Retrieved all book", count:books.length, books});         
    } catch (error:any) {
        res.status(500).json({message:"Unable to reterived books at this time", error});
    }
}


export async function createBook(req:Request, res:Response) {
    let book = req.body;
    try {
        let savedBook = await registerBook(book);
        res.status(201).json({messaeg:"Book Created Successfully", savedBook})
    } catch (error:any) {
        res.status(500).json({message:"Unable to save book at this time", error});
    }   
}


export async function updateBook(req:Request, res:Response) {    
    try {
        let book = await modifyBook(req.body);        
        res.status(202).json({message:"Book Updated Successfuly",book});         
    } catch(error:any) {
        if(error instanceof BookDoesNotExistError) {
            res.status(404).json({message:"Cannot update book that does not exist", error});
        } else {
            res.status(500).json({message:"Unable to modify book at this time", error});
        }
    }
}

export async function deleteBook(req:Request, res:Response) {    
    let {barcode} = req.params;
    try {
        let message = await removeBook(barcode);        
        res.status(202).json({message});         
    } catch(error:any) {
        if(error instanceof BookDoesNotExistError) {
            res.status(404).json({message:"Cannot delete book that does not exist", error});
        } else {
            res.status(500).json({message:"Unable to Delete book at this time", error});
        }    
    }
}


async function searchForBooksByQuery(req:Request, res: Response) {
    let {title, barcode, author, subject, description, genre, page=1, limit =25} = req.query;

    let books = await queryBooks(
        Number(page),
        Number(limit),
        title as string,
        barcode as string,
        author as string,
        subject as string,
        description as string,
        genre as string,
    );

    res.status(200).json({message: "Retrived books from query", page:books});

}

export default { getAllBooks, createBook, updateBook, deleteBook, searchForBooksByQuery};