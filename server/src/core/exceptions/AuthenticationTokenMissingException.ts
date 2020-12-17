import HttpException from "./HttpException";

class AuthenticationTokenMissingException extends HttpException {
    constructor() {
        super(400, `Token Is missing`);
    }
}

export default AuthenticationTokenMissingException;