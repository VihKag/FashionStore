const Pagination = ({ totalPages, currentPage, onPageChange }) =>{
    const handlePageChange = (newPage) => {
        if (newPage !== currentPage) {
          onPageChange(newPage);
        }
      };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
        handlePageChange(currentPage);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
        handlePageChange(currentPage - 1);
        }
    };
    return(
        <>
            <nav aria-label="Page navigation" className="m-3">
                <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                        <button onClick={handlePrevPage} className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                            <span className="sr-only">Previous</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                            </svg>
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li>
                            <button key={index}  
                            onClick={() => handlePageChange(index)} 
                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:bg-blue-100 active:bg-blue-200 transition-all">{index+1}</button>
                        </li>
                    ))}                  
                    <li>
                        <button onClick={handleNextPage} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700">
                            <span className="sr-only">Next</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>        
        </>
    );
}
export default Pagination;