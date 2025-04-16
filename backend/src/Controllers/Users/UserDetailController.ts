import { UserDetailService } from "../../Services/Users/UserDetailService";
import { Request, Response } from "express";


class UserDetailController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;

        const userDetail = new UserDetailService();

        const user = await userDetail.execute(user_id);

        return res.json(user);

    }
}

export { UserDetailController }