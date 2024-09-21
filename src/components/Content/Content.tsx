import { useState, useEffect } from 'react';
import { searchModules } from '../../services/api';
import SearchBar  from './SearchBar';
import ModuleList  from './ModuleList';
import Pagination  from './Pagination';
import { PER_PAGE } from '../../constants/constants';
import { Module } from '../type';
import './Content.css';

const Content = () => {
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
                const totalCount = parseInt(results.headers['total'], 10);
                setTotalResults(totalCount);
            } catch (error) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchModules();
    }, [searchQuery, currentPage, sortOrder]);

    const totalPages = Math.ceil(totalResults / PER_PAGE);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
        setSortOrder(sortOrder);
        setSortKey(sortOrder === 'desc' ? sortBy : '');
    };

    return (
        <main className="content">
            <SearchBar onSearch={(q) => setSearchQuery(q)} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <ModuleList 
                        modules={modules} 
                        onSort={handleSort}
                        sortOrder={sortOrder}
                    />
                    <Pagination 
                        totalPages={totalPages} 
                        currentPage={currentPage} 
                        onPageChange={handlePageClick} 
                    />
                </>
            )}
        </main>
    );
};
  
export default Content;