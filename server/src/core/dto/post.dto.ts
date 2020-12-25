import { IsOptional, IsString } from "class-validator";

class PostDto {
    @IsString()
    public title: string;

    @IsString()
    @IsOptional()
    public description: string;

    @IsString()
    @IsOptional()
    public content: string;

    @IsString()
    public authorId: string;
}

export default PostDto;