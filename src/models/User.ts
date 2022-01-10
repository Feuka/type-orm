import {OneToMany,PrimaryGeneratedColumn ,Column, Entity, BaseEntity } from "typeorm";
import {Message} from './Message'

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToMany(type => Message, message => message.user, {
        cascade : true
    }) 
    messages: Message[];
}