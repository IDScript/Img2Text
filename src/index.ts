import { Hono } from 'hono';
import { ZodError } from 'zod';
import figlet = require('figlet');
import { HTTPException } from 'hono/http-exception';

const app = new Hono();

app.get('/', (c) => {
    return c.text(figlet.textSync('Img2Text!'));
});

app.onError(async (err, c) => {
    if (err instanceof HTTPException) {
        c.status(err.status);
        return c.json({ errors: err.message });
    } else if (err instanceof ZodError) {
        c.status(400);
        return c.json({ errors: err.message });
    } else {
        c.status(500);
        return c.json({ errors: err.message });
    }
});

export default app;
