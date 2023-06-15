import { useState } from "react";

import { GetServerSideProps } from "next";
import { notFound } from "next/navigation";
import nookies, { parseCookies } from "nookies";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { Navbar } from "@/components/common/Navbar";
import { ToggleButton } from "@/components/common/ToggleButton";

import styles from "./styles.module.css";

type TeacherDetailsPageProps = {
  teacher: any;
};

export default function TeacherDetailsPage({ teacher }: TeacherDetailsPageProps) {
  const [teacherUser, setTeacherUser] = useState(teacher);
  const [isActived, setIsActived] = useState(teacher.isActive);



  const handleToggleActive = () => {
    const cookies = parseCookies();
    const teachers = cookies["teachers"];

    const updateTeachers = teachers ? JSON.parse(teachers) : [];

    const teacherIndex = updateTeachers.findIndex((teacher: any) => Number(teacher.id) === Number(teacherUser.id));

    updateTeachers[teacherIndex].isActive = !updateTeachers[teacherIndex].isActive;

    setTeacherUser(updateTeachers[teacherIndex]);

    nookies.set(undefined, 'teachers', JSON.stringify(updateTeachers));

    setIsActived(!isActived);
  }

  return (
    <>
      <Navbar pageTitle="/teacher" />
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col gap-1">
                <h2 className={styles.heading}>
                  {teacherUser.fullName}
                </h2>
                <span>
                  {teacherUser.email}
                </span>
              </div>

              <ToggleButton
                id="check"
                checked={isActived}
                onChange={handleToggleActive}
              />
            </div>
          </div>
          <div className={styles.card}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl text-gray-700 font-semibold">
                  Sistema de Gestão de Trabalhos de Graduação
                </h3>
                <span className="text-gray-600 font-medium">
                  Resumo
                </span>
              </div>

              {/* <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <span className="text-gray-700 font-medium">
                    Justificativa 1:
                  </span>
                  <span className="text-gray-600">
                    Teste
                  </span>
                </div>

                <div className="flex gap-1">
                  <span className="text-gray-700 font-medium">
                    Justificativa 2:
                  </span>
                  <span className="text-gray-600">
                    Teste
                  </span>
                </div>

                <div className="flex gap-1">
                  <span className="text-gray-700 font-medium">
                    Justificativa 3:
                  </span>
                  <span className="text-gray-600">
                    Teste
                  </span>
                </div>

                <div className="flex gap-1">
                  <span className="text-gray-700 font-medium">
                    Justificativa 4:
                  </span>
                  <span className="text-gray-600">
                    Teste
                  </span>
                </div>

                <div className="flex gap-1">
                  <span className="text-gray-700 font-medium">
                    Justificativa 5:
                  </span>
                  <span className="text-gray-600">
                    Teste
                  </span>
                </div>
              </div> */}

              <div className="flex flex-col gap-2">
                <h3 className="text-xl text-gray-700 font-semibold">
                  Integrantes
                </h3>

                <div className="flex flex-col gap-1">
                  <span className="text-gray-700 font-medium">
                    Emiliano Callegari
                  </span>
                  <span className="text-gray-600">
                    emiliano.callegari@hotmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<TeacherDetailsPageProps>(async (ctx) => {
  const { id } = ctx.params as {
    id: string;
  }

  const cookies = parseCookies(ctx);
  const teachers = cookies["teachers"];

  const parsedTeachers = teachers ? JSON.parse(teachers) : [];

  const teacher = parsedTeachers.find((teacher: any) => Number(teacher.id) === Number(id));

  if (!teacher) {
    return notFound();
  }

  return {
    props: {
      teacher,
    }
  }
});