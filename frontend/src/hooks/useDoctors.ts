
import { useEffect, useState } from 'react';
import type { Doctor } from '../types/doctor';

interface DoctorsFilters {
    activeOnly: boolean;
    payingOnly: boolean;
}

export function useDoctors({
    activeOnly,
    payingOnly,
}: DoctorsFilters) {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadDoctors() {
            setIsLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams({
                    activeOnly: String(activeOnly),
                    payingOnly: String(payingOnly),
                });

                const response = await fetch(
                    `/api/doctors?${params}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data: Doctor[] = await response.json();

                if (!controller.signal.aborted) {
                    setDoctors(data);
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setError(
                        err instanceof Error ? err.message : 'Unknown error'
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        void loadDoctors();

        return () => controller.abort();
    }, [activeOnly, payingOnly]);

    return { doctors, isLoading, error };
}
