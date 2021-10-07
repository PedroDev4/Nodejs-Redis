import { NextFunction, Request, Response } from "express";
import { verify, decode } from "jsonwebtoken";

interface IRequest {
    sub: string;
}

export async function authentication(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).end();
    }

    const [, token] = authHeader.split(" ");


    try {
        const { sub: user_id } = verify(
            token,
            String(process.env.JWT_SECRET)
        ) as IRequest;

        request.user = {
            id: user_id
        }

        next();
    } catch (err) {
        return response.status(401).end();
    }
}