import LoanRecordDeo, {ILoanRecordModel} from "../daos/LoanRecordDeo";
import { findBookById, modifyBook } from "./BookService";
import { ILoanRecord } from "../models/LoanRecord";
import { LoadRecordDoesNotExistError } from "../utils/LibraryErrors";
 

export async function generateRecord(record:ILoanRecord): Promise<ILoanRecordModel> {
    try {
        let createdRecord = new LoanRecordDeo(record);
        createdRecord = await createdRecord.save();

        let book = await findBookById(record.item);
        let records  = book.records;

        records = [createdRecord, ...records];
        book.records = records;

        await modifyBook(book);
        return createdRecord;

    } catch (error:any) {
        throw error;
    }
}

export async function modifyRecord(record:ILoanRecordModel): Promise<ILoanRecordModel> {
    try {
        let updatedRecord = await LoanRecordDeo.findOneAndUpdate({_id: record._id}, record, {new: true});

        if(updatedRecord) {
            let book = await findBookById(record.item);
            let records = book.records;

            records[0] = updatedRecord;
            book.records = records;
            
            await modifyBook(book);

            return updatedRecord;
        }

        throw new LoadRecordDoesNotExistError("The record does not exist");
    } catch (error:any) {
        throw error;
 
    }
}

export async function findAllRecords():Promise<ILoanRecordModel[]> {
    try {
        return await LoanRecordDeo.find();
    } catch(e: any ){
        throw e;
    }
}

export async function queryRecords(params: {property:string, value:string | Date}):Promise<ILoanRecordModel[]>{
    try {
        return await LoanRecordDeo.find({[params.property]: params.value}).populate("item").sort("-loanedDate");
    } catch (error:any) {
        throw error;
    }
}

