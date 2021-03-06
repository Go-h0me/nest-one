import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConfirmUserInput,
  CreateUserInput,
  LoginInput,
  User,
  UserDocument,
} from './user.schema';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { omit } from 'lodash';
import Ctx from '../types/context.type';
import { signJwt } from 'utils/jwt.utils';
import { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
  domain: 'localhost', //<- Change to your client domain
  secure: false,
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(input: CreateUserInput) {
    const confirmToken = nanoid(32);
    return this.userModel.create({ ...input, confirmToken });
  }

  async confirmUser({ email, confirmToken }: ConfirmUserInput) {
    //find out user

    const user = await this.userModel.findOne({ email });

    //Check if the user exists
    //Check if the confirmation tokens === confirmToken
    if (!user || confirmToken !== user.confirmToken) {
      throw new Error('Email or confirm token are incorrect');
    }

    //change active to true
    user.active = true;

    //save the user
    await user.save();

    //return user
    return user;
  }

  async login({ email, password }: LoginInput, context: Ctx) {
    //Find our user
    const user = await this.userModel
      .findOne({ email })
      .select('-_v -confirmToken');

    //Check that user exists
    //Compare input password with the user's hashed password
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }

    //Check that the user is active
    if (!user.active) {
      throw new Error('Please confirm your email address');
    }

    //Create a JWT
    const jwt = signJwt(omit(user.toJSON(), ['password', 'active']));

    //Set the JwT in a cookie!
    context.res.cookie('token', jwt, cookieOptions);

    //return the user

    return user;
  }

  async logout(context) {
    context.res.cookie('token', '', { ...cookieOptions, maxAge: 0 });
    return null;
  }
}
