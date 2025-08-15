import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}
    registerUser(createUserDto: CreateUserDto) {
        const user = this.userService.findByEmail(createUserDto.email);
        if(user) {
            throw new ConflictException('User with this email already exists');
        } else {
            return this.userService.create(createUserDto);
        }
    }

    async validateLocalUser(email: string, password: string) {
        const user = this.userService.findByEmail(email);

        if(!user) throw new UnauthorizedException('User not found');

        const isPasswordMatch = verify(user.password, password);
        if(!isPasswordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        } 

        return { id: user.id, name: user.name}
    }
  
}
