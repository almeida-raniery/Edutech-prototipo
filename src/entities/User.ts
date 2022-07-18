import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Classroom } from "./ClassRoom";
import { Role } from "./Role";
import { v4 as uuid } from "uuid";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;
  @Column("varchar", { length: 128, nullable: false })
  name: string;
  
  @Column()
  email: string;
  @Column({ select: false })
  password: string;
  @ManyToOne(() => Classroom, (classroom) => classroom.users, {
    nullable: true,
  })
  classroom?: Classroom;
  @ManyToOne(() => Role, (role) => role.users)
  role?: Role;
  @Column()
  created_at: Date;
  @Column({ nullable: true })
  last_login: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
