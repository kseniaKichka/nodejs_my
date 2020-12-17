import HttpException from "./HttpException";

class WrongAuthenticationTokenException extends HttpException {
    constructor() {
        super(400, `Wrong auth token`);
    }
}

export default WrongAuthenticationTokenException;