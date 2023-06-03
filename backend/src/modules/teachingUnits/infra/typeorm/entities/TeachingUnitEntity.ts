import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuidV4 } from "uuid";
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";

@Entity({ name: "teaching_units" })
export class TeachingUnitEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
  })
  name!: string;

  @OneToMany(() => CourseEntity, (course) => course.teachingUnit)
  courses?: CourseEntity[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Exclude()
  updatedAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
