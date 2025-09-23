import { Transform, Type } from "class-transformer";
import { IsInt, IsString, Min, MinLength } from "class-validator";

export class EchoDto {
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  hello!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  n!: number;
}
