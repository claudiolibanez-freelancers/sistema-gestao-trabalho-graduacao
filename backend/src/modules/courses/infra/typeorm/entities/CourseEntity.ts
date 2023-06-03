import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuidV4 } from "uuid";
import { TeachingUnitEntity } from "@modules/teachingUnits/infra/typeorm/entities/TeachingUnitEntity";
import { DisciplineEntity } from "@modules/disciplines/infra/typeorm/entities/DisciplineEntity";

@Entity({ name: "courses" })
export class CourseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
  })
  name!: string;

  @Column({
    name: "teaching_unit_id",
    type: "uuid",
    nullable: false,
  })
  teachingUnitId?: string;

  @ManyToOne(() => TeachingUnitEntity)
  @JoinColumn({ name: "teaching_unit_id" })
  teachingUnit?: TeachingUnitEntity;

  @ManyToMany(() => DisciplineEntity, (discipline) => discipline.courses, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "courses_disciplines",
    joinColumns: [{ name: "course_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "discipline_id", referencedColumnName: "id" }],
  })
  disciplines!: DisciplineEntity[];

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
