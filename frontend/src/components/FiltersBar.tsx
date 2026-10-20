
import styles from './FiltersBar.module.css';

interface FiltersBarProps {
    activeOnly: boolean;
    payingOnly: boolean;
    onActiveOnlyChange: (checked: boolean) => void;
    onPayingOnlyChange: (checked: boolean) => void;
}

export function FiltersBar({
    activeOnly,
    payingOnly,
    onActiveOnlyChange,
    onPayingOnlyChange,
}: FiltersBarProps) {
    return (
        <fieldset className={styles.filters}>
            <legend>סינון רופאים</legend>

            <label className={styles.option}>
                <input
                    type="checkbox"
                    checked={activeOnly}
                    onChange={e => onActiveOnlyChange(e.target.checked)}
                />
                הצג רק רופאים פעילים
            </label>

            <label className={styles.option}>
                <input
                    type="checkbox"
                    checked={payingOnly}
                    onChange={e => onPayingOnlyChange(e.target.checked)}
                />
                הצג רק רופאים משלמים
            </label>
        </fieldset>
    );
}
