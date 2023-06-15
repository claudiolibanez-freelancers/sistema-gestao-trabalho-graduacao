import styles from './styles.module.css';

import { Card } from "@/components/common/Card";

type TeacherPanelProps = {
  groupsList: any[];
};

export function TeacherPanel({ groupsList }: TeacherPanelProps) {
  return (
    <Card>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Seus Grupos
          </h2>
          {!groupsList.length && (
            <span className={styles.subtitle}>
              Você ainda não está em um grupo
            </span>
          )}
        </div>
        {/* <div className="flex w-full justify-between items-center border rounded p-4">
          <div className="flex flex-col w-full">
            <h3 className="text-lg font-semibold">
              Sistema de Gestão de Trabalho de Graduação
            </h3>
            <span className="text-sm text-gray-700">
              Resumo
            </span>
          </div>
          <div className="flex gap-2">
            {acceptGroup && (
              <>
                <div>
                  <Button
                    variant='outlineVariant'
                  >
                    Ver
                  </Button>
                </div>
                <div>
                  <Button
                    variant='outlineVariant'
                    onClick={handleNavigateToSchedule}
                  >
                    Agendar
                  </Button>
                </div>
              </>
            )}
            {(!acceptGroup && schedule.length === 0) && (
              <>
                <div>
                  <Button
                    variant='outlineVariant'
                    onClick={handleAcceptGroup}
                  >
                    Aceitar
                  </Button>
                </div>
                <div>
                  <Button
                    variant='cancel'
                  >
                    Recusar
                  </Button>
                </div>
              </>
            )}
          </div>
        </div> */}

        {/* {schedule.length > 0 && (
          <div className='flex flex-1 flex-col justify-center items-center gap-2'>
            <h2 className='text-2xl text-gray-700 font-medium'>
              Seus agendamentos
            </h2>
          </div>
        )} */}

        {/* {schedule.length > 0 && (
          <div className="flex w-full justify-between items-center border rounded p-4">
            <div className="flex flex-col w-full">
              <h3 className="text-lg font-semibold">
                {schedule[0].grupo}
              </h3>
              <span className="text-sm text-gray-700">
                {schedule[0].data}
              </span>
            </div>
            <div className="flex gap-2">
              <div>
                <Button
                  variant='outlineVariant'
                >
                  Ver
                </Button>
              </div>
              <div>
                <Button
                  variant='cancel'
                >
                  Deletar
                </Button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </Card>
  );
}