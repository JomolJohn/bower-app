import { useState, useEffect } from 'react';
import { searchModules } from '../../services/api';
import SearchBar  from '../Search/SearchBar';
import ModuleList  from '../Module/ModuleList';
import Pagination  from '../Pagination/Pagination';
import { PER_PAGE, ERROR_TEXT } from '../../constants/constants';
import { Module } from '../../types/type';
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
                // with q='', per_page=5 and page=300 only returns data from api.
                const totalCount = parseInt(results.headers['total'], 10);
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
            <>
                <ModuleList 
                    modules={modules} 
                    onSort={handleSort}
                    sortOrder={sortOrder}
                    searchQuery={searchQuery}
                    loading={loading}
                    error={error}
                />
                {!loading && !error && (
                    <Pagination 
                        totalPages={totalPages} 
                        currentPage={currentPage} 
                        onPageChange={handlePageClick} 
                    />
                )}
            </>
        </>
    );
};
  
export default ModuleSearch;
