'use client';

import { useEffect } from 'react';

import Clock from '@/components/Clock';
import Search_Form from '@/components/Search_form';

import { getLocation } from '@/utils/getLocation';

export default function Home() {
    useEffect(() => {
        getLocation();
    }, []);

    return (
        <main className="h-screen flex flex-col justify-center">
            <div className="flex flex-col gap-4 justify-center items-center">
                <Clock />
                <Search_Form />
            </div>
        </main>
    );
}
