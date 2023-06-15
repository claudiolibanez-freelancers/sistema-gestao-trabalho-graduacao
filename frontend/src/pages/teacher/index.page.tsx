import { useRouter } from "next/router";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod';
import nookies, { parseCookies } from "nookies";

import { Navbar } from "@/components/common/Navbar";
import { TextInput } from "@/components/common/TextInput";

import styles from './styles.module.css';
import { Button } from "@/components/common/Button";

const registerTeacherFormSchema = z.object({
  fullName: z.string()
    .nonempty({ message: 'Nome completo obrigatório' }),
  email: z.string()
    .nonempty({ message: 'E-mail obrigatório' })
    .email({ message: 'E-mail inválido' })
});

type RegisterTeacherFormData = z.infer<typeof registerTeacherFormSchema>;

type TeacherPageProps = {}

export default function TeacherPage(props: TeacherPageProps) {
  const { pathname, back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterTeacherFormData>({
    resolver: zodResolver(registerTeacherFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterTeacherFormData> = async ({
    fullName,
    email,
  }) => {
    let teacher = {
      fullName,
      email,
      isActive: true,
    } as {
      id?: number;
      fullName: string;
      email: string;
      isActive: boolean;
    }

    const cookies = parseCookies();
    const teachers = cookies["teachers"];

    const updateTeachers = teachers ? JSON.parse(teachers) : [];

    teacher.id = updateTeachers.length + 1;

    updateTeachers.push(teacher);

    nookies.set(undefined, 'teachers', JSON.stringify(updateTeachers));

    back();
  }

  const handleCreateTeacherSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    await handleSubmit(onSubmit)();
  }

  return (
    <>
      <Navbar pageTitle={pathname} />
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>
                Cadastrar Professor
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
                  htmlFor="email"
                  className={styles.label}
                >
                  E-mail
                </label>
                <TextInput
                  id="email"
                  type='email'
                  {...register('email')}
                />
                {errors.email && (
                  <small className={styles.messageError}>
                    {errors.email?.message}
                  </small>
                )}
              </div>

              <hr className={styles.divider} />

              <Button
                onClick={handleCreateTeacherSubmit}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}