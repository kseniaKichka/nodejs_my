import HttpException from "./HttpException";

class UserWithThatEmailAlreadyExistsException extends HttpException {
    constructor(email: string) {
        super(404, `User with this ${email} already exists`);
    }
}


export default UserWithThatEmailAlreadyExistsException;