import { Module } from '../type';
import ModuleItem from './ModuleItem';

interface ModuleListProps {
  modules: Module[];
  sortOrder: 'asc' | 'desc';
  onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  searchQuery: string;
}

const ModuleList = (props: ModuleListProps) => {

  const sortBy = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const sortKey = event.currentTarget.getAttribute('data-value') || '';
    const newSortOrder = props.sortOrder === 'asc' ? 'desc' : 'asc';
    props.onSort(sortKey, newSortOrder);
  };

    return (
      <div className="table">
        <div className="row">
            <div className="cell head name">Name</div>
            <div className="cell head owner hidden-xs">Owner</div>
            <div className="cell head stars hidden-xs"><a href="/#" onClick={sortBy} data-value="stars">Stars</a></div>
        </div>
        {props.modules.map((module, index) => {
              return (
                <ModuleItem 
                  key={index} 
                  module={module} 
                  searchQuery={props.searchQuery}
                />
              )
          })}
     </div>
    );
};

export default ModuleList;
