'use client';

import { motion, Variants } from 'framer-motion';
import React from 'react';

interface FadeInOnScrollProps {
    children: React.ReactNode;
    direction?: 'left' | 'right' | 'up' | 'down';
    delay?: number;
    duration?: number;
    className?: string;
}

export default function FadeInOnScroll({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
}: FadeInOnScrollProps) {
    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
            y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration, delay }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
