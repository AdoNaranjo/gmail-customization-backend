import { IsOptional, IsString } from "class-validator";

export class AuthQueryResultRequest implements QueryRequest {
  @IsOptional()
  @IsString()
  code: string;
}
