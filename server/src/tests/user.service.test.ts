import UserService from "../services/user/user.service";
import DefaultAuthService from "../services/auth/default.auth.service";
import userModel from "../core/models/user.model";
import UserWithThatEmailAlreadyExistsException from "../core/exceptions/userWithThatEmailAlreadyExistsException";

let userData;

describe('User Service', () => {
    describe('Create user', () => {
        beforeEach(() => {
            userData = {
                name: "ksenia",
                email: "test@com1",
                password: "testpassword"
            };
            process.env.JWT_SECRET = 'jwt_secret';
        });

        it('should return error',  async () => {
            userModel.findOne = jest.fn().mockImplementation(() => Promise.resolve(userData));

            const userService = new UserService(new DefaultAuthService(), userModel);
            await expect(userService.createUser(userData))
                .rejects.toThrow(UserWithThatEmailAlreadyExistsException);

        });

        it('should return a user',  async () => {
            userModel.findOne = jest.fn().mockImplementation(() => Promise.resolve(undefined));
            userModel.create = jest.fn().mockImplementation(() => Promise.resolve(userData));

            const userService = new UserService(new DefaultAuthService(), userModel);
            await expect(userService.createUser(userData))
                .resolves.toBeDefined();
            await expect(userService.createUser(userData))
                .resolves.toEqual(userData);

        });
    });

    describe('Find User', () => {
        it('should find user by id', async () => {
            const userDataWithId = {
                ...userData,
                _id: "test_id"
            }

            userModel.findOne = jest.fn().mockRejectedValueOnce(() => Promise.resolve(userDataWithId));

            const userService = new UserService(new DefaultAuthService(), userModel);
            await expect(userService.findOneById("test_id"))
                .resolves.toBeDefined();
        });
        it('should not find user by id', async () => {
            const userDataWithId = {
                ...userData,
                _id: "test_id"
            }

            userModel.findOne = jest.fn().mockRejectedValueOnce(() => Promise.resolve(userDataWithId));

            const userService = new UserService(new DefaultAuthService(), userModel);
            await expect(userService.findOneById('test'))
                .resolves.toEqual(undefined);
        });
    });
});