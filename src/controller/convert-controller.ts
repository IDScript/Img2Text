import { Hono } from 'hono';
import { ResModel } from '../model/res-model';
import { CommonUtil } from '../utils/common-util';
import { ReqInfo } from '../model/req-model';
import { ImgProcessorUseCase } from '../usecases/imgProcessor-usecase';
import { ContentfulStatusCode } from 'hono/utils/http-status';

export const convertController = new Hono();

convertController.post('/api/convert', async (c) => {
    const body = await c.req.parseBody();
    const data = body['file'];
    const reqId: string | undefined = c.req.header('X-Request-ID');

    const reqInfo: ReqInfo = CommonUtil.setRequestInfo(c.req, body, reqId);

    const [resInfo, status]: [ResModel, ContentfulStatusCode] =
        await ImgProcessorUseCase.processImage(reqInfo, data);

    return c.json(resInfo, status);
});
