import { RegisterUserService } from "../../Services/Users/RegisterUserService";
import { Request, Response } from "express";
class RegisterUserController {

    async handle(req: Request, res: Response) {

        const { name, email, password } = req.body;

        const registerUser = new RegisterUserService();
        const user = await registerUser.execute({
            name,
            email,
            password,
        });

        return res.json(user);
    }
}

export { RegisterUserController }