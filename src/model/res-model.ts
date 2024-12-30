export type ResponseModel = {
    error: boolean;
    message: string | null;
    text: string | null;
    filename: string | null;
};

export type ResModel = {
    uuid?: string;
    error?: boolean;
    message?: string | null;
    filename?: string | null;
    text?: string | null;
};

export function toResponseModel(data: string): ResModel {
    const result: ResModel = {
        message: 'success',
        text: data,
    };

    return result;
}
