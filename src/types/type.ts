export interface Module {
    name: string;
    description	: string;
    repository_url: string;
    homepage: string;
    stars: number;
};

export interface StaticContentProps {
    paragraphs: string[];
};
