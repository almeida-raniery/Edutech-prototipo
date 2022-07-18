import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Workspace } from "./Workspace";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column("varchar", { length: 128, nullable: false, unique: false })
  name: string;
  @Column("int")
  permissions: number;
  @OneToMany(() => User, (user) => user.role, { nullable: true })
  users?: User[];
  @ManyToOne(() => Workspace, (workspace) => workspace.roles, {
    nullable: false,
  })
  workspace: Workspace;
  @Column()
  created_at: Date;
}
