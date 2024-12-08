export class UnauthorizedError extends Error{
    statusCode:Number
    constructor(message:string){
        super (message)
        this.statusCode = 401
        Error.captureStackTrace(this,UnauthorizedError)
    }
}