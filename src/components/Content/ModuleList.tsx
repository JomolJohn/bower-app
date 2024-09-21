import { useState } from 'react';
import { Module } from '../type';

interface ModuleListProps {
  modules: Module[];
  sortOrder: 'asc' | 'desc';
  onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

const ModuleList = (props: ModuleListProps) => {

  const sortBy = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // read sort key from the clicked element
    const sortKey = event.currentTarget.getAttribute('data-value') || '';
    const newSortOrder = props.sortOrder === 'asc' ? 'desc' : 'asc';
    props.onSort(sortKey, newSortOrder);
  };

    return (
      <div className="table-container">
        <table className="module-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner</th>
              <th><a href="#" onClick={sortBy} data-value="stars">Stars</a></th>
            </tr>
          </thead>
          <tbody>
            {props.modules.map((mod, index) => {
              const owner = mod.repository_url.split('/').slice(-2, -1)[0];
              return (
                  <tr key={index}>
                    <td>
                      <div className="name">{mod.name}</div>
                      <div className="description"><p>{mod.description}</p></div>
                    </td>
                    <td><div className="owner">{owner}</div></td>
                    <td><div className="stars">{mod.stars}</div></td>
                  </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
};

export default ModuleList;
