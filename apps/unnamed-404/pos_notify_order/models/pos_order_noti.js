const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const LINE_ACCESS_TOKEN = '8aazj0E0D3DG4H6ulH1JNs80Qg8Z9bqoiNP6uM5H1+X+c2ryycfmlr9afCu7HwsdpNdqMQybBJWAScFeDTIRZh9QQ8S6zhiGtkyPTdLG7wcZ8LXpBmUj96oTWn0lDimtbOGWkMWMAVRpNTNYwzam0QdB04t89/1O/w1cDnyilFU='; 
const API_BASE_URL = 'http://your-odoo-backend.com/api';
const AUDIO_URL = 'https://your-audio-hosting.com/sound-notification.mp3'; 

// Line Webhook Endpoint
app.post('/line/webhook', async (req, res) => {
    const events = req.body.events || [];

    for (const event of events) {
        const { type, replyToken, message, source } = event;

        if (type === 'message' && source.userId) {
            const userMessage = message.text.toLowerCase().trim();

            if (userMessage === 'check order status') {
                const responseMessage = await getLatestOrderStatus(source.userId);
                await sendReply(replyToken, responseMessage);
            } else if (userMessage === 'play sound notification') {
                await sendAudioReply(replyToken, AUDIO_URL);
            } else {
                await sendReply(replyToken, "Send 'Check Order Status' to get your latest order update.");
            }
        }
    }

    res.status(200).send('OK');
});

// Function to fetch the latest order status
async function getLatestOrderStatus(lineUserId) {
    try {
        // Find the customer by LINE user ID
        const partnerResponse = await axios.get(`${API_BASE_URL}/partners`, {
            params: { line_user_id: lineUserId }
        });

        const partner = partnerResponse.data;

        if (partner && partner.id) {
            // Get the latest order for the customer
            const orderResponse = await axios.get(`${API_BASE_URL}/orders`, {
                params: { partner_id: partner.id, limit: 1, order: 'date_order desc' }
            });

            const latestOrder = orderResponse.data[0];

            if (latestOrder) {
                const statusMessages = {
                    paid: 'Order received',
                    invoiced: 'Order processed',
                    cancel: 'Order canceled',
                    done: 'Delivering',
                };
                return `Order ${latestOrder.name}: ${statusMessages[latestOrder.state] || 'Status updated'}`;
            } else {
                return 'No recent orders found.';
            }
        } else {
            return 'Customer not found. Please ensure your LINE ID is registered with our service.';
        }
    } catch (error) {
        console.error('Error fetching order status:', error);
        return 'Failed to retrieve order status. Please try again later.';
    }
}

// Function to send a text reply
async function sendReply(replyToken, message) {
    const url = 'https://api.line.me/v2/bot/message/reply';

    const payload = {
        replyToken,
        messages: [{
            type: 'text',
            text: message
        }]
    };

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
    };

    try {
        const response = await axios.post(url, payload, { headers });
        console.log('Reply sent:', response.data);
    } catch (error) {
        console.error('Error sending reply:', error);
    }
}

// Function to send an audio reply
async function sendAudioReply(replyToken, audioUrl) {
    const url = 'https://api.line.me/v2/bot/message/reply';

    const payload = {
        replyToken,
        messages: [{
            type: 'audio',
            originalContentUrl: audioUrl,
            duration: 60000 // Duration in milliseconds
        }]
    };

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
    };

    try {
        const response = await axios.post(url, payload, { headers });
        console.log('Audio reply sent:', response.data);
    } catch (error) {
        console.error('Error sending audio reply:', error);
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
