import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
    constructor() {
        super(400, `Data is wrong`);
    }
}

export default WrongCredentialsException;