import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class ContactsQueryRequest implements QueryRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
