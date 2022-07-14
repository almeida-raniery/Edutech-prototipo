import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Course } from "./Course";
import { Role } from "./Role";

@Entity()
export class Workspace {
  @PrimaryColumn('uuid')
  readonly id: string;
  @Column({unique: true, nullable: false})
  name: string;
  @OneToMany(() => Course, course => course.workspace, {nullable: true})
  courses: Course[];
  @OneToMany(()=> Role, role => role.workspace, {nullable: false})
  roles: Role[]
  @Column()
  created_at: Date;
}