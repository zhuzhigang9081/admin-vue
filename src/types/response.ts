export interface ResponseData {
    code: number,
    message: string,
    data: any,
}

export type ResponsePromise = Promise<ResponseData>;