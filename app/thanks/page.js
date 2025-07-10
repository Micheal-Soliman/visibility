'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
    const shownRef = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (!shownRef.current) {
            toast.success('Your registration was successful!', {
                duration: 10000,
            });
            shownRef.current = true;
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-white to-red-400 text-center text-white p-6 relative overflow-hidden">
            <Toaster position="top-center" reverseOrder={false} />

            {/* خلفية متحركة */}
            <motion.div
                className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl -z-10"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ top: '20%', left: '25%' }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-xl max-w-md w-full"
            >
                <h1 className="text-4xl font-bold text-black mb-4">🎉 Thank You!</h1>
                <p className="text-black/90 text-lg">
                    Your registration has been received successfully.
                </p>
                <p className="text-sm text-black/70 mt-4 mb-6">
                    We will contact you shortly. Stay tuned!
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md"
                >
                    Back to Home
                </motion.button>
            </motion.div>
        </div>
    );
}
