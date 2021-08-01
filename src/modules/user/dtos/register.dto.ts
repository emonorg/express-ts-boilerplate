import { IsString, Length } from 'class-validator';

class RegisterUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export default RegisterUserDto;
