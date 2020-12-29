import { Request } from 'express';
import SharedUserInterface from "../models/sharedUserInterface";

interface RequestWithUser extends Request {
    user: SharedUserInterface;
}

export default RequestWithUser;