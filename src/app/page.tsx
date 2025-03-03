'use client';

import { useState, useEffect } from 'react';

import Clock from '@/components/Clock';
import Search_Form from '@/components/Search_form';
import Card from '@/components/Card';

import { getLocation } from '@/utils/getLocation';
import { getWeather, getLocationWeather } from '@/utils/getWeather';

export default function Home() {
    const [location, setLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchLocation() {
        const location = await getLocation();
       
        
        if (!location) {
            console.log('No location found');
            return;
        }        
        setLocation(location);
    }

    async function fetchWeather() {
        if (location) {
            const weather = await getLocationWeather(location);
            if (!weather) {
                console.log('No weather found');
                return;
            }
            setWeatherData(weather);
        }
    }



    useEffect(() => {
        fetchLocation();
    }, []);
    
  
    useEffect(() => {
        fetchWeather();
    }, [location]);

    return (
        <main className="h-screen flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center">
                <Clock />
                <Search_Form />
            </div>
                {weatherData && <Card weatherData={weatherData} />}
        </main>
    );
}
