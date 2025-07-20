import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    profilePicture?: string;

    @Prop()
    bio?: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

}

export const UserSchema = SchemaFactory.createForClass(User);