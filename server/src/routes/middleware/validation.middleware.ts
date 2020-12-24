import express from "express";
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import HttpException from "../../core/exceptions/HttpException";

function validationMiddleware<T>(type: any): express.RequestHandler {
    return (req, res, next) => {
        validate(plainToClass(type, req.body))
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    next(new HttpException(400, getErrors(errors).join(', ')));
                } else {
                    next();
                }
            });
    }
}

function getErrors(errors: ValidationError[], errorName: string = null) {
    const res = errors.map(function (error: ValidationError) {
        if ("constraints" in error) {
            if (errorName === null) {
                return Object.values(error.constraints);
            }
            return Object.values(error.constraints)
                .map((errorString: string) => errorName + '.' + errorString);
        } else
        if ("children" in error) {
            return getErrors(error.children, error.property);
        }
    });

    return res.reduce((accumulator, value) => accumulator.concat(value), []);
}

export default validationMiddleware;
