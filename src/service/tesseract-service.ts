import { createWorker } from 'tesseract.js';
import { logger } from '../app/winston';

export class TesseractService {
    static async convertImage(
        imagePath: string,
        lang?: string
    ): Promise<string> {
        const language = lang ?? 'ind'; // Default language is Indonesian
        // List of available languages
        //github.com/naptha/tesseract.js/blob/master/docs/tesseract_lang_list.md
        const worker = await createWorker(language);
        const ret = await worker.recognize(imagePath);
        await worker.terminate();
        const result = ret.data.text
            .replace(/(\r\n|\n|\r)/gm, ' ')
            .replace(/ +(?= )/g, '')
            .trim();
        logger.info(result);

        return result;
    }
}
