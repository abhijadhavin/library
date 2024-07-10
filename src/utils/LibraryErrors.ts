export class UnableToSaveUserError extends Error {
    constructor(message:string) {
        super(message);
    }
}

export class InvalidUsernameOrPasswordError extends Error {
    constructor(message:string) {
        super(message);
    }
}


export class UserDoesNotExistError extends Error {
    constructor(message:string) {
        super(message);
    }
}

export class BookDoesNotExistError extends Error {
    constructor(message:string) {
        super(message)
    }
}

export class LibraryCardDoesNotExistError extends Error {
    constructor(message:string) {
        super(message);
    }
}

export class LoadRecordDoesNotExistError extends Error {
    constructor(message:string) {
        super(message);
    }
}