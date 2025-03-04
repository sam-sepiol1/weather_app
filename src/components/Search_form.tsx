'use client';

import { useState} from 'react';

import Button from './Button';

interface SearchFormProps { 
    onSearch: (city: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
    const [city, setCity] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.currentTarget.querySelector('button[type="submit"]:focus') as HTMLButtonElement;

        if (!target) {
            console.log('No button found');
            return;
        }

        if (target.name === 'search') {
            onSearch(city);
        } else if (target.name === 'compare') {
            console.log('Compare city: ', city);
        }

        setCity('');
    };

    return (
        <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="City name"
                className="bg-slate-200 p-4 rounded-full"
                value={city}
                onChange={handleInputChange}
            />
            <div className="buttons flex gap-2 justify-center">
                <Button type="submit" name="search" text="Search" />
                <Button type="submit" name="compare" text="Compare" />
            </div>
        </form>
    );
}
