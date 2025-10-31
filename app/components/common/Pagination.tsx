import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, limit, total, hasNextPage, hasPrevPage, onPageChange }: PaginationProps) {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    disabled={!hasPrevPage || currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    disabled={!hasNextPage || currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{currentPage * limit -1}</span> to <span className="font-medium">{Math.min(currentPage * limit)}</span> of 
                        <span className="font-medium"> {total}</span> results
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                        <button
                            disabled={!hasPrevPage || currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon aria-hidden="true" className="size-5" />
                        </button>
                        {
                            [currentPage-3, currentPage-2, currentPage-1].filter(page=> page < currentPage && page > 0).map(page=> (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    aria-current="page"
                                    className="elative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 focus:outline-offset-0"
                                >
                                    {page}
                                </button>
                            ))
                        }

                        <button
                            disabled
                            aria-current="page"
                            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {currentPage}
                        </button>
                        
                        {
                            [totalPages-2, totalPages-1, totalPages].every(page=> page > currentPage) && (
                                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 focus:outline-offset-0">
                                    ...
                                </span>
                            )
                        }
                        
                        {
                            [totalPages-3, totalPages-2, totalPages-1, totalPages].filter(page=> page > currentPage).map(page=> (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    aria-current="page"
                                    className="elative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 focus:outline-offset-0"
                                >
                                    {page}
                                </button>
                            ))
                        }
                        
                        <button
                            disabled={!hasNextPage || currentPage === totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon aria-hidden="true" className="size-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
