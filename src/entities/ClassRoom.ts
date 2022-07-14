import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@Entity()
export class Classroom {
  @PrimaryColumn('uuid')
  readonly id: string;
  @Column({nullable: false})
  title: string;
  @ManyToOne(()=>Course, course => course.classRooms, {nullable: false})
  course: Course;
  @OneToMany(()=>User, user => user.classroom, {nullable: true})
  users: User[];
  @Column()
  created_at: Date;
}