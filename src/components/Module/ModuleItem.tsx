import { FaHome } from "react-icons/fa";
import { Module } from '../../types/type';

interface ModuleItemProps {
    module: Module;
    searchQuery: string;
}

const ModuleItem = (props: ModuleItemProps) => {

    const { module, searchQuery } = props;

    const highlightText = (text: string | null | undefined, query: string) => {
        if (!text) return '';
        if (!query) return text;
        
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
        );
    };

    const owner = module?.repository_url ? module.repository_url.split('/').slice(-2, -1)[0] : '';

    return (
        <div className="row">
            <div className="cell name">
                <h4 className="title"><a href={module.repository_url}>{highlightText(module.name, searchQuery) || ''}</a></h4>
                <small className="url"><FaHome /> <a href={module.homepage}>{module.homepage || ''}</a></small>
                <p className="description">{highlightText(module.description, searchQuery) || ''}</p>
                </div>
            <div className="cell owner hidden-xs">{highlightText(owner, searchQuery)}</div>
            <div className="cell stars hidden-xs">{module.stars || 0}</div>
            <div className="cell visible-xs">
                <span className="label">Owner: <span>{highlightText(owner, searchQuery)}</span></span>
                <span className="label">Stars: <span>{module.stars || 0}</span></span>
            </div>
        </div>
    );

};

export default ModuleItem;
