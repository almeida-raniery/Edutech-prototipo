import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Classroom } from "./ClassRoom";
import { User } from "./User";
import { Workspace } from "./Workspace";

@Entity()
export class Course {
  @PrimaryColumn('uuid')
  readonly id: string;
  @Column("varchar", {length: 128, nullable: false})
  title: string;
  @OneToMany(() => Classroom, ClassRoom => ClassRoom.course)
  classRooms: Classroom[];
  @ManyToOne(() => Workspace, workspace => workspace.courses, {eager: true} )
  workspace: Workspace;
  @Column()
  created_at: Date;
}