export type ResBodyDTO<T> = {
    statusCode: number;
    message: string;
    error?: string;
    data?: T;
}
