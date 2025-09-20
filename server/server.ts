// server/server.ts
import express, { Request, Response } from 'express';
import { processUserMessage } from '../MillaCore';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Main API endpoint to process user messages
app.post('/api/message', (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).send('Message is required.');
        }

        const response = processUserMessage(message);
        res.json({ response });

    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});