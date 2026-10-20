
import styles from './ResultsSummary.module.css';

interface ResultsSummaryProps {
    count: number;
    activeOnly: boolean;
    payingOnly: boolean;
}

export function ResultsSummary({
    count,
    activeOnly,
    payingOnly,
}: ResultsSummaryProps) {
    const filterDescription =
        activeOnly && payingOnly
            ? 'רופאים פעילים ומשלמים בלבד'
            : activeOnly
                ? 'רופאים פעילים בלבד'
                : payingOnly
                    ? 'רופאים משלמים בלבד'
                    : 'כל הרופאים';

    return (
        <section className={styles.summary}>
            <div className={styles.filterInfo}>
                <strong className={styles.count}>
                    נמצאו {count} רופאים
                </strong>

                <span className={styles.filterText}>
                    סינון נוכחי:
                    <strong> {filterDescription}</strong>
                </span>
            </div>

            <p className={styles.sortInfo}>
                <strong>סדר הצגת התוצאות: </strong>
                קודם לפי הדירוג הגבוה ביותר.
                במקרה של דירוג זהה, לפי כמות הדירוגים.
                אם גם הכמות זהה, לפי רמת הקידום הנמוכה ביותר.
            </p>
        </section>
    );
}
