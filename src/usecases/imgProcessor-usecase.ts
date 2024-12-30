import { unlink } from 'node:fs/promises';
import { ReqInfo } from '../model/req-model';
import { TesseractService } from '../service/tesseract-service';
import { logger } from '../app/winston';
import { ResModel, toResponseModel } from '../model/res-model';
import { ContentfulStatusCode } from 'hono/utils/http-status';

export class ImgProcessorUseCase {
    static async processImage(
        reqInfo: ReqInfo,
        image: File | string
    ): Promise<[ResModel, ContentfulStatusCode]> {
        let status: ContentfulStatusCode = 400;

        let result: ResModel = {};

        if (image instanceof File) {
            const fileName = './img/' + reqInfo.uuid + '-' + image.name;
            logger.info('Write image...');
            Bun.write(fileName, image);
            logger.info('Processing image...');
            const data = await TesseractService.convertImage(fileName);
            logger.info('Clean Up image...');
            await unlink(fileName);
            result = toResponseModel(data);
            result.filename = image.name;
            status = 200;
        } else {
            result.error = true;
            result.message = 'fail to process image';
        }
        result.uuid = reqInfo.uuid;

        return [result, status];
    }
}
