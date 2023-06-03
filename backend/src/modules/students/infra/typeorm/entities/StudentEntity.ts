import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

// entities
import { UserEntity } from "@modules/users/infra/typeorm/entities/UserEntity";
import { TeachingUnitEntity } from "@modules/teachingUnits/infra/typeorm/entities/TeachingUnitEntity";
import { CourseEntity } from "@modules/courses/infra/typeorm/entities/CourseEntity";
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

@Entity({ name: "students" })
export class StudentEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "user_id",
    type: "uuid",
  })
  userId!: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @Column({
    name: "teaching_unit_id",
    type: "uuid",
  })
  teachingUnitId!: string;

  @OneToOne(() => TeachingUnitEntity)
  @JoinColumn({ name: "teaching_unit_id" })
  teachingUnit?: TeachingUnitEntity;

  @Column({
    name: "course_id",
    type: "uuid",
  })
  courseId!: string;

  @OneToOne(() => CourseEntity)
  @JoinColumn({ name: "course_id" })
  course?: CourseEntity;

  @Column({
    name: "discipline_id",
    type: "uuid",
  })
  disciplineId?: string;

  @OneToOne(() => DisciplineEntity)
  @JoinColumn({ name: "discipline_id" })
  discipline?: DisciplineEntity;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
