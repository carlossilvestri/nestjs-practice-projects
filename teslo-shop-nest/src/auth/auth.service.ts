import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;


      const user = this.userRepository.create({ ...userData, password: bcrypt.hashSync(password, 10) });
      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.getJwt({id: user.id})
      };
      // TODO: Retornar json web token de acceso.
    } catch (error) {
      this.handleDBErrors(error);
    }
    return 'This action adds a new auth';
  }
  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });
    if (!user) {
      throw new UnauthorizedException('Credentials are no valid (email)');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are no valid (password)');
    }
    delete user.password;
    return {
      ...user,
      token: this.getJwt({id: user.id})
    };
    // TODO Json web token
  }
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
  async checkAuthStatus(user: User){
    return {
      ...user,
      token: this.getJwt({id: user.id})
    }
  }

  private getJwt(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
