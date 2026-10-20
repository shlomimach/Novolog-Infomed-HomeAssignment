
import { useState, type FormEvent } from 'react';
import type { Doctor } from '../types/doctor';
import styles from './ContactModal.module.css';

interface ContactModalProps {
    doctor: Doctor;
    onClose: () => void;
}

export function ContactModal({
    doctor,
    onClose,
}: ContactModalProps) {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/contact-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctorId: doctor.id,
                    fullName,
                    phone,
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error(
                    response.status === 400
                        ? 'פרטי הפנייה אינם תקינים. יש לבדוק ולנסות שוב.'
                        : 'אירעה שגיאה בשמירת הפנייה. נסו שוב.'
                );
            }

            setIsSuccess(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'אירעה שגיאה בלתי צפויה.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.backdrop}>
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-title"
                dir="rtl"
            >
                <button
                    type="button"
                    className={styles.close}
                    onClick={onClose}
                    aria-label="סגירת חלון"
                >
                    ×
                </button>

                <h2 id="contact-title">
                    יצירת קשר עם {doctor.fullName}
                </h2>

                {isSuccess ? (
                    <div role="status">
                        <p>הפנייה נשמרה בהצלחה!</p>
                        <button type="button" onClick={onClose}>
                            סגור
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label>
                            שם מלא
                            <input
                                required
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                            />
                        </label>

                        <label>
                            טלפון
                            <input
                                required
                                type="tel"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </label>

                        <label>
                            אימייל
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </label>

                        {error && <p role="alert" className={styles.error}>{error}</p>}

                        <button
                            type="submit"
                            className={styles.submit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'שולח...' : 'שלח פנייה'}
                        </button>
                    </form>
                )}
            </section>
        </div>
    );
}
