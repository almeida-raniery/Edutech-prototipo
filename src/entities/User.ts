import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Classroom } from "./ClassRoom";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryColumn('uuid')
  readonly id: string;
  
  @Column("varchar", {length: 128, nullable: false})
  name: string;
  
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
  
  @ManyToOne(()=> Classroom, classroom => classroom.users)
  classroom?: Classroom;
  
  @ManyToOne(()=>Role, role => role.users)
  role?: Role;
  
  @Column()
  created_at: Date;
  
  @Column()
  last_login: Date;
}