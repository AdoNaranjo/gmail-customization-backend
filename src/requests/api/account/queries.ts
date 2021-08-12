import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class AccountQueryRequest implements QueryRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
