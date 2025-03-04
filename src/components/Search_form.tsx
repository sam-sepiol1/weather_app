'use client';

import { useState} from 'react';
import { getCities } from '@/utils/getCities';

import Button from './Button';

interface SearchFormProps { 
    onSearch: (city: string) => void;
}

type City = {
    id: number;
    name: string;
    countryName: string;
    state: string;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
    const [city, setCity] = useState('');
    const [cities, setCities] = useState<City[]>([]);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 1) {
            setCity('');
            setCities([]);

            return;
        }

        setCity(event.target.value);

        const fetchedCities = await getCities(event.target.value);
        console.log(fetchedCities.geonames);
        setCities(fetchedCities.geonames);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement> & { key?: string }) => {
        event.preventDefault();
        const target = event.currentTarget.querySelector('button[type="submit"]:focus') as HTMLButtonElement;
        

        if (!target) {
            console.log('No button found');
            return;
        }

        if ( target.name === 'search') {
            onSearch(city);
        } else if (target.name === 'compare') {
            console.log('Compare city: ', city);
        } 

        setCity('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSearch(city);
        }
    };

    return (
        <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="City name"
                className="bg-slate-200 p-4 rounded-full"
                value={city}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                list="city-options"
                />
                <datalist id="city-options">
                    {cities.map((city) => (
                        <option key={city.id} value={city.name + ', ' + city.countryName} />
                    ))}
                </datalist>
            <div className="buttons flex gap-2 justify-center">
                <Button type="submit" name="search" text="Search" />
                <Button type="submit" name="compare" text="Compare" />
            </div>
        </form>
    );
}