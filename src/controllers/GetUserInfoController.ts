import { Request, Response } from "express";
import { createConnection } from "../postgres";
import { getRedis } from "../redisConfig";

export class GetUserInfoController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;

        const clientConnection = await createConnection();

        console.time();

        const userRedis = await getRedis(`user-${id}`);

        const user = JSON.parse(userRedis);

        /*
        const { rows } = await clientConnection.query(
            `SELECT * FROM USERS WHERE ID  = $1 LIMIT 1`,
            [id]
        );

        */

        console.timeEnd();

        return response.json(user);
    }
}