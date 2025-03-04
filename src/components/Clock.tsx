'use client';

import { useEffect, useState } from 'react';

export default function Clock() {
    const [time, setTime] = useState('');
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className='flex flex-col gap-4 justify-center items-center font-light'>
            <span className='clock--time text-6xl text-white '> {time} </span>
            <span className='clock--date text-lg text-white'> {date} </span>
        </main>
    );
}
