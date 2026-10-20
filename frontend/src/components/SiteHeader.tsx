
import styles from './SiteHeader.module.css';

const disabledItems = [
    'מילון רפואי',
    'תרופות',
    'מחלות',
    'ניתוחים וטיפולים',
    'תוכן',
    'פורומים',
    'מחשבונים',
];

export function SiteHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.navigation} aria-label="ניווט ראשי">
                <div className={styles.logoArea}>
                    <img
                        className={styles.logo}
                        src="/infomed-logo.png"
                        alt="Infomed by Novolog"
                    />
                </div>

                <a
                    href="#doctors-results"
                    className={styles.activeLink}
                    aria-current="page"
                >
                    חיפוש רופאים
                </a>

                {disabledItems.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={styles.navButton}
                        disabled
                    >
                        {item}
                    </button>
                ))}
            </nav>

            <div className={styles.utilities}>
                <button type="button" disabled aria-label="חיפוש באתר">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.7" aria-hidden="true">
                        <circle cx="10.5" cy="10.5" r="7" />
                        <path d="m16 16 5 5" />
                    </svg>
                </button>

                <button type="button" disabled aria-label="שיתוף">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.6" aria-hidden="true">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <path d="m9 11 6-4 M9 13l6 4" />
                    </svg>
                </button>

                <button
                    type="button"
                    disabled
                    className={styles.accessibility}
                    aria-label="אפשרויות נגישות"
                >
                    <svg viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" aria-hidden="true">
                        <circle cx="12" cy="4.5" r="1.5" fill="currentColor" />
                        <path d="M4 8h16M12 8v5m0 0-4 7m4-7 4 7m-4-7-4-3" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
