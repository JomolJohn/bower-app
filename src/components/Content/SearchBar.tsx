import { useState, useEffect } from 'react';

  
interface SearchBarProps {
    onSearch: (query: string) => void;
}
  
const SearchBar = (props: SearchBarProps) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState<string>('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 1000);
      
        // Cleanup the timeout
        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        if (debouncedQuery) {
            // only run when the user has stopped typing
            props.onSearch(searchQuery);
        }
    }, [debouncedQuery]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <input 
                type="text" 
                value={searchQuery} 
                onChange={handleInputChange} 
                placeholder="Search..."
            />
        </div>
    );
};
  
export default SearchBar;
