import { IsNotEmpty, IsString } from "class-validator";

export class UserParamsRequest implements ParamsRequest {
  @IsNotEmpty()
  @IsString()
  id: string;
}
