export type ReqInfo = {
    url: string;
    uuid: string;
    body: object | File | string;
    path: string;
    method: string;
    query: Record<string, string>;
    params: Record<string, string>;
    headers: Record<string, string>;
};
