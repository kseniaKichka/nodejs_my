import { IsDefined, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import "reflect-metadata";
import AddressDto from "./address.dto";

class CreateUserDto {
    @IsString()
    public name: string;

    @IsString()
    public email: string;

    @IsString()
    @IsOptional()
    public gender: string;

    @IsNumber()
    @IsOptional()
    public age?: number;

    @IsString()
    public password: string;

    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => AddressDto)
    public address: AddressDto;
}

export default CreateUserDto;