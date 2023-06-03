import { useState } from "react";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import nookies from 'nookies';

import constants from "@/constants";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { Navbar } from "@/components/Navbar";
import { TextInput } from "@/components/TextInput";
import { Select } from "@/components/Select";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";

import styles from './styles.module.css';
import { setupAPIClient } from "@/services/api";
import { api } from "@/services/apiClient";

const studentSchema = z.object({
  fullName: z.string()
    .nonempty('Informe seu nome completo'),
  displayName: z.string()
    .nonempty('Informe seu username'),
  secondaryEmail: z.string()
    .email('Informe um e-mail válido'),
  unit: z.string()
    .nonempty('Selecione uma unidade de ensino'),
  course: z.string()
    .nonempty('Selecione um curso'),
  discipline: z.string()
    .nonempty('Selecione uma disciplina'),
  phone: z.string(),
  isWhatsapp: z.boolean(),
  isPhoneVisible: z.boolean(),
});

type StudentFormData = z.infer<typeof studentSchema>;

type Discipline = {
  id: string;
  name: string;
  createdAt: string;
}

type Course = {
  id: string;
  name: string;
  teachingUnitId: string;
  disciplines: Discipline[];
  createdAt: string;
}

type TeachingUnit = {
  id: string;
  name: string;
  courses: Course[];
  createdAt: string;
}

type StudentPageProps = {
  email: string;
  teachingUnits: TeachingUnit[];
}

export default function StudentPage({ email, teachingUnits }: StudentPageProps) {
  const [selectTeachingUnit, setSelectTeachingUnit] = useState('');
  const [selectCourse, setSelectCourse] = useState('');

  const [acceptTerm, setUserAcceptTerm] = useState(false);

  const { pathname, push } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit: SubmitHandler<StudentFormData> = async ({
    fullName,
    displayName,
    secondaryEmail,
    unit,
    course,
    discipline,
    phone,
    isPhoneVisible,
    isWhatsapp,
  }) => {
    try {
      const reponse = await api.post('/students', {
        fullName,
        displayName,
        secondaryEmail,
        unitId: unit,
        courseId: course,
        disciplineId: discipline,
        phone,
        isPhoneVisible,
        isWhatsapp,
      });

      const {
        student: {
          user
        },
        token,
        refreshToken,
      } = reponse.data;

      nookies.set(null, constants.USER_TOKEN, token, {
        path: '/',
        maxAge: 86400
      });

      nookies.set(null, constants.USER_REFRESH_TOKEN, refreshToken, {
        path: '/',
        maxAge: 86400
      });

      nookies.set(null, constants.USER, JSON.stringify(user), {
        path: '/',
        maxAge: 86400
      });

      push('/dashboard');

    } catch (error) {
      console.log(error);
    }
  }

  const handleTeachingUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;

    setSelectTeachingUnit(value);
  }

  const handleCourseChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;

    setSelectCourse(value);
  }

  const handleRegisterStudentSubmit = async () => await handleSubmit(onSubmit)();

  const handleUserAcceptTerm = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = event.target;

    setUserAcceptTerm(checked);
  }

  return (
    <>
      <Navbar pageTitle={pathname} email={email} />
      <main className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.title}>
              Complete seu Cadastro
            </h2>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.formControl}>
              <label
                htmlFor="fullName"
                className={styles.label}
              >
                Nome completo
              </label>
              <TextInput
                id="fullName"
                type='text'
                {...register('fullName')}
              />
              {errors.fullName && (
                <small className={styles.messageError}>
                  {errors.fullName?.message}
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="displayName"
                className={styles.label}
              >
                Username
              </label>
              <TextInput
                id="displayName"
                type='text'
                iconLeft={<span className={styles.iconText}>@</span>}
                {...register('displayName')}
              />
              {errors.displayName ? (
                <small className={styles.messageError}>
                  {errors.displayName?.message!}
                </small>
              ) : (
                <small className={styles.messageHelper}>
                  Esse é o nome que será exibido para outros participantes
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="email"
                className={styles.label}
              >
                E-mail institucional
              </label>
              <TextInput
                id="email"
                type='email'
                placeholder='nome@examplo.com'
                defaultValue={email}
                disabled
              />
            </div>

            <div className={styles.formControl}>
              <div className={styles.labelContainer}>
                <label
                  htmlFor="secondaryEmail"
                  className={styles.label}
                >
                  E-mail Secundário
                </label>
                <span
                  className={styles.labelHelper}
                >
                  (Opcional)
                </span>
              </div>
              <TextInput
                id="secondaryEmail"
                type='email'
                placeholder='nome@examplo.com'
                {...register('secondaryEmail')}
              />
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="unit"
                className={styles.label}
              >
                Unidade de Ensino
              </label>
              <Select
                id="unit"
                {...register('unit', { required: true })}
                value={selectTeachingUnit}
                onChange={handleTeachingUnitChange}
              >
                <option>Selecione...</option>
                {teachingUnits.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </Select>
              {errors.unit && (
                <small className={styles.messageError}>
                  {errors.unit?.message}
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="discipline"
                className={styles.label}
              >
                Curso
              </label>
              <Select
                id="course"
                {...register('course')}
                value={selectCourse}
                onChange={handleCourseChange}
              >
                <option>Selecione...</option>
                {teachingUnits.find((item) => item.id === selectTeachingUnit)?.courses.map((subitem) => (
                  <option
                    key={subitem.id}
                    value={subitem.id}
                  >
                    {subitem.name}
                  </option>
                ))}
              </Select>
              {errors.course && (
                <small className={styles.messageError}>
                  {errors.course?.message}
                </small>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="discipline"
                className={styles.label}
              >
                Disciplina
              </label>
              <Select
                id="discipline"
                {...register('discipline')}
              >
                <option>Selecione...</option>

                {teachingUnits
                  .find((item) => item.id === selectTeachingUnit)?.courses.find((subitem) => subitem.id === selectCourse)?.disciplines.map((discipline) => (
                    <option
                      key={discipline.id}
                      value={discipline.id}
                    >
                      {discipline.name}
                    </option>
                  ))}
              </Select>
              {errors.discipline && (
                <small className={styles.messageError}>
                  {errors.discipline?.message}
                </small>
              )}
            </div>

            <div className={styles.formPart}>
              <div className={styles.formControl}>
                <div className={styles.labelContainer}>
                  <label
                    htmlFor="phone"
                    className={styles.label}
                  >
                    Celular
                  </label>
                  <span
                    className={styles.labelHelper}
                  >
                    (Opcional)
                  </span>
                </div>
                <TextInput
                  id="phone"
                  type='text'
                  placeholder='(xx) x xxxx-xxxx'
                  {...register('phone')}
                />
              </div>

              <div className={styles.infoContainer}>
                <p className={styles.messageInfo}>
                  O seu número de celular não será exíbido de forma pública, apenas para o seu grupo de trabalhos, caso permita.
                </p>
              </div>
            </div>

            <div className={styles.checkboxGroup}>
              <Checkbox
                id="whatsapp"
                {...register('isWhatsapp')}
                label="Este celular é whatsapp."
              />

              <Checkbox
                id="phoneVisible"
                {...register('isPhoneVisible')}
                label="Quero que meu celular fique visível para o meu grupo de trabalho."
              />
            </div>

            <hr className={styles.divider} />

            <Checkbox
              id="acceptTerm"
              checked={acceptTerm}
              onChange={handleUserAcceptTerm}
              label="Estou ciente e permito que estes dados sejam armazenados e compartilhados com a minha instituição de ensino."
            />

            <hr className={styles.divider} />

            <Button
              disabled={!acceptTerm}
              onClick={handleRegisterStudentSubmit}
            >
              Completar o Cadastro
            </Button>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerText}>&copy; 2022 SGTG</p>
      </footer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<StudentPageProps>(async (ctx) => {
  const { email } = ctx.query as {
    email?: string;
  }

  if (!email) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const api = setupAPIClient(ctx);

  const response = await api.get('/teaching-units');

  const { teachingUnits } = response.data;

  return {
    props: {
      email,
      teachingUnits,
    }
  }
});