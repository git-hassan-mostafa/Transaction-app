import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
    componentName: string;
    renderTime: number;
    mountTime: number;
    updateCount: number;
}

export function usePerformanceMonitor(componentName: string) {
    const mountTimeRef = useRef<number>(Date.now());
    const renderCountRef = useRef<number>(0);
    const lastRenderTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        const startTime = Date.now();
        renderCountRef.current += 1;

        return () => {
            const renderTime = Date.now() - startTime;
            const totalMountTime = Date.now() - mountTimeRef.current;

            const metrics: PerformanceMetrics = {
                componentName,
                renderTime,
                mountTime: totalMountTime,
                updateCount: renderCountRef.current,
            };

            // Log performance metrics in development
            if (__DEV__) {
                console.log(`Performance [${componentName}]:`, {
                    renderTime: `${renderTime}ms`,
                    totalMountTime: `${totalMountTime}ms`,
                    updateCount: renderCountRef.current,
                });

                // Warn if render time is too high
                if (renderTime > 16) { // 60fps = 16ms per frame
                    console.warn(`Slow render detected in ${componentName}: ${renderTime}ms`);
                }
            }

            lastRenderTimeRef.current = Date.now();
        };
    });

    // Return performance data for external monitoring
    return {
        getMetrics: (): PerformanceMetrics => ({
            componentName,
            renderTime: Date.now() - lastRenderTimeRef.current,
            mountTime: Date.now() - mountTimeRef.current,
            updateCount: renderCountRef.current,
        }),
    };
} 