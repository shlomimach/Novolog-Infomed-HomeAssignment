
import type { Doctor } from '../types/doctor';
import { DoctorCard } from './DoctorCard';
import styles from './DoctorsList.module.css';

interface DoctorsListProps {
    doctors: Doctor[];
    onContact: (doctor: Doctor) => void;
}

export function DoctorsList({
    doctors,
    onContact,
}: DoctorsListProps) {
    if (doctors.length === 0) {
        return <p>לא נמצאו רופאים.</p>;
    }

    return (
        <section className={styles.list} aria-label="תוצאות חיפוש רופאים">
            {doctors.map(doctor => (
                <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onContact={onContact}
                />
            ))}
        </section>
    );
}
