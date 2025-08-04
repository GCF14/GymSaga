import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import * as validator from 'validator';

import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async signup(email: string, password: string, username: string, firstName: string, lastName: string) {
        if (!email || !password || !username || !firstName || !lastName) {
            throw new BadRequestException('All fields must be filled');
        }

        if (!validator.isEmail(email)) {
            throw new BadRequestException('Email is not valid');
        }

        if (!validator.isStrongPassword(password)) {
            throw new BadRequestException('Password not strong enough');
        }

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new BadRequestException('Email already in use');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new this.userModel({
            email,
            password: hashedPassword,
            username,
            firstName,
            lastName,
        });

        return await newUser.save();

    }

    async login(email: string, password: string) {
        if (!email || !password) {
            throw new BadRequestException('All fields must be filled');
        }

        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Invalid login credentials');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new UnauthorizedException('Incorrect password');
        }

        return user;
    }
}
