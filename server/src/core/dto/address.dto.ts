import { IsString } from "class-validator";

class AddressDto {
    @IsString()
    public city: string;

    @IsString()
    public street: string;
}

export default AddressDto;