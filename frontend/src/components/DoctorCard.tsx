
import type { Doctor } from '../types/doctor';
import styles from './DoctorCard.module.css';

interface DoctorCardProps {
    doctor: Doctor;
    onContact: (doctor: Doctor) => void;
}

export function DoctorCard({
    doctor,
    onContact,
}: DoctorCardProps) {
    const phone =
        doctor.phones?.find(p => p.number)?.number ??
        doctor.clinics
            ?.flatMap(clinic => clinic.phones ?? [])
            .find(p => p.number)?.number;

    const rating = Math.max(
        0,
        Math.min(5, doctor.reviews.averageRating)
    );

    return (
        <article className={styles.card}>
            <div className={styles.doctorInfo}>
                <h2 className={styles.name}>{doctor.fullName}</h2>

                <div className={styles.rating}>

                    <div
                        className={styles.stars}
                        role="img"
                        aria-label={`דירוג ${rating} מתוך 5`}
                    >
                        <span
                            className={styles.filledStars}
                            style={{ width: `${(rating / 5) * 100}%` }}
                        />
                    </div>
                    <span className={styles.reviewCount}>
                        {doctor.reviews.totalRatings} דירוגים
                    </span>
                    <span className={styles.ratingNumber}>
                        ({rating.toFixed(1)})
                    </span>
                </div>

                {doctor.clinics?.[0]?.address?.cityName && (
                    <p className={styles.city}>
                        {doctor.clinics[0].address.cityName}
                    </p>
                )}
            </div>

            <div className={styles.details}>
                <p>
                    <strong>נותן שירות בשפה:</strong>{' '}
                    <span>{doctor.languages?.join(', ') || 'לא צוין'}</span>
                </p>

                <p>
                    <strong>לרופא יש כתבה משויכת:</strong>{' '}
                    <span>{doctor.hasArticle ? 'כן' : 'לא'}</span>
                </p>
            </div>

            <div className={styles.actions}>
                {phone ? (
                    <a
                        className={styles.actionButton}
                        href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                    >
                        <span aria-hidden="true">☎</span>
                        <span dir="ltr">{phone}</span>
                    </a>
                ) : (
                    <span className={styles.unavailable}>
                        טלפון לא זמין
                    </span>
                )}

                <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => onContact(doctor)}
                >
                    <span aria-hidden="true">✎</span>
                    צור קשר
                </button>
            </div>
        </article>
    );
}
