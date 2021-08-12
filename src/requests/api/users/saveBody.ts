import { IsEmail, IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean } from "class-validator";

export class UserBodyRequest implements BodyRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  provider: string;
  displayName: string;
  photoURL: string;
  token: string;
  uid: string;
  membership: string;

  @IsNumber()
  @IsOptional()
  adminId: number;

  @IsBoolean()
  @IsOptional()
  subscribe: boolean;
  isAdmin: boolean;
}
