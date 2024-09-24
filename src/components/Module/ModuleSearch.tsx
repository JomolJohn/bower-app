import { useState, useEffect } from 'react';
import { searchModules } from '../../services/api';
import SearchBar  from '../Search/SearchBar';
import ModuleList  from '../Module/ModuleList';
import Pagination  from '../Pagination/Pagination';
import { PER_PAGE, TOTAL_COUNT, LOADING_TEXT, ERROR_TEXT } from '../../constants/constants';
import { Module } from '../type';
import './Module.css';

const ModuleSearch = () => {
    const [modules, setModules] = useState<Module[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortKey, setSortKey] = useState<string>('');

    useEffect(() => {
        const fetchModules = async () => {
            setLoading(true);
            setError(null);
            try {
                const results = await searchModules(searchQuery, currentPage, PER_PAGE, sortKey);
                setModules(results.data);
                // api is not working as expected with the page and per_page value with the last page, 
                // so giving a total count 1500 statically to work 5 per page with the pagination.
                // const totalCount = parseInt(results.headers['total'], 10);
                const totalCount = TOTAL_COUNT;
                setTotalResults(totalCount);
            } catch (error) {
                setError(ERROR_TEXT);
            } finally {
                setLoading(false);
            }
        };
        fetchModules();
    }, [searchQuery, currentPage, sortKey]);

    const totalPages = Math.ceil(totalResults / PER_PAGE);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
        setSortOrder(sortOrder);
        setSortKey(sortOrder === 'desc' ? sortBy : '');
    };

    return (
        <>
            <SearchBar onSearch={(q) => setSearchQuery(q)} />
            {loading && <div className="loading">{LOADING_TEXT}</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
                <>
                    <ModuleList 
                        modules={modules} 
                        onSort={handleSort}
                        sortOrder={sortOrder}
                        searchQuery={searchQuery}
                    />
                    <Pagination 
                        totalPages={totalPages} 
                        currentPage={currentPage} 
                        onPageChange={handlePageClick} 
                    />
                </>
            )}
        </>
    );
};
  
export default ModuleSearch;