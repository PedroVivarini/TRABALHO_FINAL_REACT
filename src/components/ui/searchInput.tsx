import React, { useState, useEffect } from 'react';

interface SearchInputProps {
    onSearch: (searchTerm: string) => void;
    debounceTime?: number;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
    onSearch, 
    debounceTime = 500, 
    placeholder = 'Buscar por nome...' 
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            onSearch(searchTerm);
        }, debounceTime);

        return () => {
            clearTimeout(timerId);
        };
        
    }, [searchTerm, debounceTime, onSearch]); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleChange}
            style={{ 
                padding: '10px', 
                fontSize: '16px', 
                borderRadius: '4px', 
                border: '1px solid #ccc',
                width: '100%',
                boxSizing: 'border-box'
            }}
        />
    );
};

export default SearchInput;