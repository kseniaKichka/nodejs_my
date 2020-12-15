import { IsNumber, IsString } from "class-validator";

class CreateUserDto {
    @IsString()
    public name: string;

    @IsString()
    public email: string;

    @IsString()
    public gender: string;

    @IsNumber()
    public age: number;
}

export default CreateUserDto;