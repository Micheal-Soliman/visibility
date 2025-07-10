'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function VisionaryCoursePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      education: '',
      field: '',
      special: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().required('Phone is required'),
      education: Yup.string().required('Education level is required'),
      field: Yup.string().required('Field is required'),
      special: Yup.string().required('Job title is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const res = await response.json();

        if (res.success) {
          resetForm();
          router.push('/thanks');
        } else {
          alert('Submission failed: ' + res.error);
        }
      } catch (err) {
        alert('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(270deg,_#0070f3,_#ff3c3c,_#0070f3)] bg-[length:600%_600%] animate-gradient z-0" />

      <div
        className="pointer-events-none fixed w-32 h-32 bg-blue-400/20 rounded-full blur-3xl z-0"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          transition: 'transform 0.1s ease',
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <Image
            src="/favicon.png"
            width={200}
            height={200}
            alt="Picture of the author"
            className='rounded-2xl'
          />
          <h2 className="text-3xl font-extrabold text-white mb-4">Visionary Leadership Course</h2>
          <p className="mb-6 text-lg text-white/80 leading-relaxed">
            This course is designed to help you unlock your potential and become a visionary leader in your industry.
          </p>
          <h3 className="font-semibold text-red-400 mb-3">What You'll Learn:</h3>
          <ul className="mb-6 space-y-3 text-white/70 list-disc pl-5">
            <li>How to Write a Killer Copy</li>
            <li>How to Write a Killer Video Script</li>
            <li>A New Strategies for all industries</li>
            <li>How to Create a real and Killer Funnel for your industry</li>
          </ul>
          <div className="flex items-center space-x-4 mt-6">
            <Image
              src="/user.png"
              width={50}
              height={50}
              alt="Picture of the author"
              className='rounded-2xl'
            />
            <div>
              <p className="font-semibold text-white">Dr. Mohamed-Elsawaf</p>
              <p className="text-sm text-blue-200">Business Consultant</p>
              <p className="text-sm text-white/70 mt-1">Bachelor's degree in accounting faculty of commerce mansoura university</p>
              <p className="text-sm text-white/70 mt-1">15 y of experience main sector ( real estate development ) other , retail</p>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={formik.handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 shadow-lg p-8 rounded-xl space-y-4 backdrop-blur"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Enroll Now</h3>

          {['fullName', 'email', 'phone', 'field', 'special'].map((field) => (
            <div key={field}>
              <input
                name={field}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field]}
                placeholder={
                  field === 'fullName'
                    ? 'Full Name'
                    : field === 'email'
                      ? 'Email'
                      : field === 'phone'
                        ? 'Phone'
                        : field === 'field'
                          ? 'Field of Study'
                          : 'Job Title'
                }
                className="autofill-fix w-full p-3 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched[field] && formik.errors[field] && (
                <p className="text-sm text-red-300 mt-1">{formik.errors[field]}</p>
              )}
            </div>
          ))}

          <div>
            <select
              name="education"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.education}
              className="w-full p-3 bg-white/10 text-white border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 custom-select"
            >
              <option value="" className="option-placeholder">Select Education Level</option>
              <option className="text-black">High School</option>
              <option className="text-black">Bachelor's</option>
              <option className="text-black">Master's</option>
              <option className="text-black">PhD</option>
            </select>

            {formik.touched.education && formik.errors.education && (
              <p className="text-sm text-red-300 mt-1">{formik.errors.education}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded font-semibold transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {isLoading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isLoading ? 'Submitting...' : 'Submit Enrollment'}
          </button>

          <p className="text-xs text-center text-white/60">
            We respect your privacy. Your information is safe with us.
          </p>
        </motion.form>
      </div>
    </div>
  );
}
