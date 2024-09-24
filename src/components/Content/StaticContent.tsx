import { StaticContentProps } from '../type';

const StaticContent = ({ paragraphs }: StaticContentProps) => {
    return (
        <>
            {paragraphs.map((text, index) => (
                <p key={index}>{text}</p>
            ))}
        </>
    );
};

export default StaticContent;