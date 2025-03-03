// 'use client';

interface WeatherProps {
    weatherData: {
        list: Array<{
            dt: number;
            main: {
                temp: number;
                feels_like: number;
                temp_min: number;
                temp_max: number;
                pressure: number;
                humidity: number;
            };
            weather: Array<{
                main: string;
                description: string;
                icon: string;
            }>;
            clouds: {
                all: number;
            };
            wind: {
                speed: number;
                deg: number;
                gust: number;
            };
            visibility: number;
            pop: number;
            sys: {
                pod: string;
            };
            dt_txt: string;
        }>;
        city: {
            name: string;
            country: string;
        };
    };    
    emojiFlag: string;
}

export default function Card({ weatherData, emojiFlag }: WeatherProps) {
    if (!weatherData) {
        return <div className="flex flex-col gap-2 justify-center items-center text-center p-16 bg-slate-200/50 rounded-3xl">No weather data available</div>;
    }

    const { city, list: [{ weather, main }] } = weatherData;


    return (
        <div className="flex flex-col gap-2 justify-center items-center text-center p-16 bg-slate-200/50 rounded-3xl">
            <span className="font-bold text-2xl text-white">{city.name}, {city.country} {emojiFlag} </span>
            <span className="font-bold text-5xl text-white">{Math.round(main.temp - 273.15)}°C </span>
            <span className="font-bold text-xl text-white">{weather[0].description}</span>

        </div>
    );
}