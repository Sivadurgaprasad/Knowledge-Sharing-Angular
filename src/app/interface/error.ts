import { ErrorHandler } from "@angular/core";

export interface Error {
    errorCode: string;
    errorMessage: string;
    errorDescription: string;
}

export class ErrorMessageConstant {
    Null_Id = "Invalid input please check the id";
}