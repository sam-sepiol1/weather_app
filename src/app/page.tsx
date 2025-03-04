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
    const [emojiFlag, setEmojiFlag] = useState('');
    const [tempEmoji, setTempEmoji] = useState('');
    const [weatherEmoji, setWeatherEmoji] = useState('');

    async function fetchLocation() {
        const location = await getLocation();

        if (!location) {
            console.log('No location found');
            return;
        }
        setLocation(location);
    }

    async function fetchLocationWeather() {
        if (location) {
            const weather = await getLocationWeather(location);
            if (!weather) {
                console.log('No weather found');
                return;
            }

            setWeatherData(weather.weather);
            setEmojiFlag(weather.flag);
            setTempEmoji(weather.tempEmoji);
            setWeatherEmoji(weather.weatherEmoji);
        }
    }

    useEffect(() => {
        fetchLocation();
    }, []);

    useEffect(() => {
        fetchLocationWeather();
    }, [location]);

    return (
        <main className="h-screen flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center">
                <Clock />
                <Search_Form />
            </div>
            {weatherData ? (
                <Card
                    weatherData={weatherData}
                    emojiFlag={emojiFlag}
                    tempEmoji={tempEmoji}
                    weatherEmoji={weatherEmoji}
                />
            ) : null}
        </main>
    );
}
