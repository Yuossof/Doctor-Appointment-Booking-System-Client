'use client'
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import GoogleCallback from '@/components/GoogleCallback/GoogleCallback';

export default function Page() {

    return (
        <Suspense fallback={<Loading/>}>
            <GoogleCallback />
        </Suspense>
    );
} 