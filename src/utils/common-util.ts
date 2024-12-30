import { HonoRequest } from 'hono';
import { v7 as uuid } from 'uuid';
import { ReqInfo } from '../model/req-model';

export class CommonUtil {
    public static setRequestInfo(
        req: HonoRequest,
        body: object,
        reqId?: string
    ): ReqInfo {
        const reqInfo: ReqInfo = {
            uuid: reqId ?? uuid(),
            body: body,
            method: req.method,
            url: req.url,
            headers: req.header(),
            query: req.query(),
            params: req.param(),
            path: req.path,
        };

        return reqInfo;
    }
}
