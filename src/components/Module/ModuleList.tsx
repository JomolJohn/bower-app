import { Module } from '../types/type';
import ModuleItem from './ModuleItem';
import { LOADING_TEXT } from '../../constants/constants';

interface ModuleListProps {
  modules: Module[];
  sortOrder: 'asc' | 'desc';
  onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const ModuleList = (props: ModuleListProps) => {

  const { modules, sortOrder, onSort, searchQuery, loading, error } = props;

  const sortBy = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const sortKey = event.currentTarget.getAttribute('data-value') || '';
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(sortKey, newSortOrder);
  };

  console.log(sortOrder);

    return (
      <div className="table">
        <div className="row">
            <div className="cell head name">Name</div>
            <div className="cell head owner hidden-xs">Owner</div>
            <div className="cell head stars hidden-xs"><a href="/#" onClick={sortBy} data-value="stars">Stars</a></div>
        </div>
        {(loading || error) && (
          <div className="row">
            <div className="cell message">
              {loading && <div>{LOADING_TEXT}</div>}
              {error && <div>{error}</div>}
            </div>
          </div>
        )}
        {!loading && !error && (
          modules.map((module, index) => (
            <ModuleItem 
              key={index} 
              module={module} 
              searchQuery={searchQuery}
            />
          ))
        )}
     </div>
    );
};

export default ModuleList;
