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
    tempEmoji: string;
    weatherEmoji: string;
}

export default function Card({ weatherData, emojiFlag, tempEmoji, weatherEmoji }: WeatherProps) {
    if (!weatherData || !emojiFlag || !tempEmoji || !weatherEmoji) {
        return (
            <div className="flex flex-col gap-2 justify-center items-center text-center p-16 bg-slate-200/50 rounded-3xl">
                No weather data available
            </div>
        );
    }

    const temp = weatherData.list[0].main.temp;
    const city = weatherData.city.name;
    const country = weatherData.city.country;

    return (
        <div className="flex flex-col gap-4 justify-center items-center text-center p-16 bg-slate-200/50 rounded-3xl">
            <span className="font-bold text-5xl text-white">
                {city}, {country} {emojiFlag}
            </span>
            <span className="font-bold text-4xl text-white">
                {temp}° {tempEmoji}{' '}
            </span>
            <span className="font-bold text-6xl text-white">
                {weatherEmoji}
                {weatherEmoji}
            </span>
        </div>
    );
}
