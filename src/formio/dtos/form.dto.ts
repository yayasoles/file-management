/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class CreateFormCommand{
    @ApiProperty()
    name: string;
    @ApiProperty()
    design: any
    @ApiProperty()
    formData: any
}

export class UpdateFormDataCommand extends CreateFormCommand{
    @ApiProperty()
    id: string;
    
}
export class deleteFormDataCommand  {
    @ApiProperty()
    id: string;
    
}