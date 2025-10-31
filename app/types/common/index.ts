export type ResBodyDTO<T> = {
    statusCode: number;
    message: string;
    error?: string;
    data?: T;
}

export type PaginatedResBodyDTO<T> = {
    statusCode: number;
    message: string;
    error?: string;
    data: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
