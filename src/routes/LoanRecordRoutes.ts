import express from "express";

import LoanRecordController from "../controllers/LoanRecordController";
import { Schemas, ValidateSchema } from "../middlewares/Validations";
const router = express.Router();

router.get("/", LoanRecordController.getAllRecords);
router.post("/", ValidateSchema(Schemas.Loan.create, 'body'), LoanRecordController.createRecord);
router.put("/", ValidateSchema(Schemas.Loan.update, 'body'), LoanRecordController.updateRecord);
router.post("/query", ValidateSchema(Schemas.Loan.query, 'body'), LoanRecordController.getRecordsByProperty);

export = router;

