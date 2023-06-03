import { useState } from "react";
import { clsx } from "clsx";

import { Navbar } from "@/components/Navbar";
import { Calendar } from "@/components/Calendar";

import styles from './styles.module.css';

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const isDateSelected = !!selectedDate;

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>
        <div className={clsx('relative max-w-full grid w-[540px]', {
          // [styles.open]: false,
          // [styles.close]: !isDateSelected,
        })}>
          <div className="bg-gray-200 rounded-sm">
            <Calendar
              selectedDate={selectedDate}
              onDateSelected={handleDateSelected}
            />

            {isDateSelected && null}
          </div>
        </div>
      </main>
    </div>
  );
}