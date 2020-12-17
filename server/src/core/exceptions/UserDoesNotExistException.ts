import HttpException from "./HttpException";

class UserDoesNotExistException extends HttpException {
    constructor() {
        super(404, `User does not exist`);
    }
}


export default UserDoesNotExistException;