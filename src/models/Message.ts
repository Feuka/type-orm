import {ManyToOne,PrimaryGeneratedColumn ,Column, Entity, BaseEntity } from "typeorm";
import {User} from './User'

@Entity()
export class Message extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    content: string;

    @ManyToOne(type => User, user => user.messages)
    user: User;
}