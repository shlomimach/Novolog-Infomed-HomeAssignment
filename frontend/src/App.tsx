
import { useState } from 'react';
import type { Doctor } from './types/doctor';
import { useDoctors } from './hooks/useDoctors';
import { DoctorsList } from './components/DoctorsList';
import { FiltersBar } from './components/FiltersBar';
import { ContactModal } from './components/ContactModal';
import { ResultsSummary } from './components/ResultsSummary';
import { SiteHeader } from './components/SiteHeader';
import styles from './App.module.css';

export default function App() {
  const [activeOnly, setActiveOnly] = useState(false);
  const [payingOnly, setPayingOnly] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const { doctors, isLoading, error } = useDoctors({
    activeOnly,
    payingOnly,
  });

  return (
    <div dir="rtl">
      <SiteHeader />

      <main id="doctors-results" className={styles.page}>
        <header className={styles.header}>
          <h1>רופאים</h1>
          <p>תוצאות חיפוש רופאים באינדקס Infomed</p>
        </header>

        <FiltersBar
          activeOnly={activeOnly}
          payingOnly={payingOnly}
          onActiveOnlyChange={setActiveOnly}
          onPayingOnlyChange={setPayingOnly}
        />

        {!isLoading && !error && (
          <ResultsSummary
            count={doctors.length}
            activeOnly={activeOnly}
            payingOnly={payingOnly}
          />
        )}

        {isLoading ? (
          <p role="status">טוען רופאים...</p>
        ) : error ? (
          <p role="alert">
            שגיאה בטעינת הרופאים: {error}
          </p>
        ) : (
          <DoctorsList
            doctors={doctors}
            onContact={setSelectedDoctor}
          />
        )}
      </main>

      {selectedDoctor && (
        <ContactModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
