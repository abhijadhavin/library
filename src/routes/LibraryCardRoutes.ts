import express from "express";

import LibraryCardController from "../controllers/LibraryCardController";

import { Schemas, ValidateSchema } from "../middlewares/Validations";
const router = express.Router();

router.get('/:cardId', ValidateSchema(Schemas.libaryCard.get, 'params'), LibraryCardController.getLibraryCard);
router.post('/', ValidateSchema(Schemas.libaryCard.create, 'body') , LibraryCardController.createLibaryCard);

export = router;