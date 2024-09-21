interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
  
const Pagination = (props: PaginationProps) => {

    const renderPageNumbers = () => {
        const { totalPages, currentPage } = props;
        const pages = [];
        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 5) {
                pages.push('...');
            }
            const start = Math.max(2, currentPage - 2);
            const end = Math.min(totalPages - 1, currentPage + 2);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 4) {
                pages.push('...');
            }
            pages.push(totalPages);
        }
        return pages.map((page, index) => (
            <button
                key={index}
                onClick={() => {
                    if (typeof page === 'number') {
                        props.onPageChange(page);
                    }
                }}
                className={page === currentPage ? 'active' : ''}
                style={{ margin: '0 5px', padding: '5px 10px' }}
                disabled={typeof page === 'string'}
            >
                {page}
            </button>
        ));
        
    };

    return (
        <div className="pagination">
            <button
                onClick={() => props.onPageChange(props.currentPage - 1)}
                disabled={props.currentPage === 1}
                style={{ padding: '5px 10px' }}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => props.onPageChange(props.currentPage + 1)}
                disabled={props.currentPage === props.totalPages}
                style={{ padding: '5px 10px' }}
            >
                Next
            </button>
        </div>
    );
};
  
export default Pagination;
