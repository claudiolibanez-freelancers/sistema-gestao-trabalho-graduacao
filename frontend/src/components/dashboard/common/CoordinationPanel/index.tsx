import { useRouter } from 'next/router';
import nookies, { parseCookies } from 'nookies';

import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";

import styles from './styles.module.css';
import { useState } from 'react';

type CoordinationPanelProps = {
  teachers: any[];
};

export function CoordinationPanel({ teachers }: CoordinationPanelProps) {
  const [teachersList, setTeacherList] = useState<any[]>(teachers);
  const { push } = useRouter();

  const handleNavigateToCreateTeacher = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    push('/teacher');
  }

  const handleDeleteTeacher = (
    id: number
  ) => {
    const cookies = parseCookies();
    const teachers = cookies["teachers"];

    const updateTeachers = teachers ? JSON.parse(teachers) : [];

    const teacherIndex = updateTeachers.findIndex((teacher: any) => teacher.id === id);

    updateTeachers.splice(teacherIndex, 1);

    nookies.set(undefined, 'teachers', JSON.stringify(updateTeachers));

    setTeacherList(updateTeachers);
  }

  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className='w-32' />
          <div className={styles.header}>
            <h2 className={styles.heading}>
              Professores Ativos
            </h2>
            {!teachersList.filter((teacher) => teacher.isActive).length && (
              <span className={styles.subtitle}>
                Nenhum professor cadastrado ativo
              </span>
            )}
          </div>
          <div className='w-32'>
            <Button
              variant='success'
              onClick={handleNavigateToCreateTeacher}
            >
              Adicionar
            </Button>
          </div>
        </div>
        <div className={styles.teachersList}>
          {teachersList
            .filter((teacher) => teacher.isActive)
            .map((teacher, index) => (
              <div key={index} className={styles.teacherItem}>
                <div className={styles.teacherInfo}>
                  <span className={styles.teacherName}>
                    {teacher.fullName}
                  </span>
                  <span className={styles.teacherEmail}>
                    {teacher.email}
                  </span>
                </div>
                <div className={styles.buttonContainer}>
                  <div>
                    <Button
                      variant='success'
                      onClick={() => push(`/teacher/${teacher.id}`)}
                    >
                      Ver
                    </Button>
                  </div>

                  <div>
                    <Button
                      variant='cancel'
                      onClick={() => handleDeleteTeacher(teacher.id)}
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.heading}>
              Professores Desativados
            </h2>
            {!teachersList.filter((teacher) => !teacher.isActive).length && (
              <span className={styles.subtitle}>
                Nenhum professor cadastrado desativados
              </span>
            )}
          </div>
        </div>
        <div className={styles.teachersList}>
          {teachersList
            .filter((teacher) => !teacher.isActive)
            .map((teacher, index) => (
              <div key={index} className={styles.teacherItem}>
                <div className={styles.teacherInfo}>
                  <span className={styles.teacherName}>
                    {teacher.fullName}
                  </span>
                  <span className={styles.teacherEmail}>
                    {teacher.email}
                  </span>
                </div>
                <div className={styles.buttonContainer}>
                  <div>
                    <Button
                      variant='success'
                      onClick={() => push(`/teacher/${teacher.id}`)}
                    >
                      Ver
                    </Button>
                  </div>

                  <div>
                    <Button
                      variant='cancel'
                      onClick={() => handleDeleteTeacher(teacher.id)}
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
}