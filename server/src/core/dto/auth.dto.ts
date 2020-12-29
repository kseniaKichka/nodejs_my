import { IsOptional, IsString } from "class-validator";

export default class AuthDto {
    @IsString()
    @IsOptional()
    public accessToken: string;

    @IsString()
    @IsOptional()
    public refreshToken: string;

    @IsString()
    @IsOptional()
    public expiredIn: string;
}