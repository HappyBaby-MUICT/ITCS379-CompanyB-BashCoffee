const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', async (req, res) => {
    const body = req.body;

    for (const event of body.events) {
        if (event.type === 'postback') {
            const userId = event.source.userId;
            const status = parseOrderStatus(event.postback.data);

            // Send confirmation to customer
            await sendLineMessage(userId, `Your order status has been updated to '${status.capitalize()}'`);
        }
    }
    return res.json({ status: 'ok' });
});

function parseOrderStatus(data) {
    // Extract status from the postback data
    const params = new URLSearchParams(data);
    return params.get('status');
}

async function sendLineMessage(userId, message) {
    const LINE_ACCESS_TOKEN = '4BPczGGcQC9LwklpFUHj160yd2Al8xOVVpzT0lB5Di6AYHt4NXYjWXgSPLdKM87IpNdqMQybBJWAScFeDTIRZh9QQ8S6zhiGtkyPTdLG7wdUXinNdr5ngiGeoJ/Hl4Sewoq+d0uJDnlp7JbKg02sFQdB04t89/1O/w1cDnyilFU=';
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
    };

    const data = {
        to: userId,
        messages: [
            {
                type: 'text',
                text: message,
            },
        ],
    };

    try {
        await axios.post('https://api.line.me/v2/bot/message/push', data, { headers });
    } catch (error) {
        console.error('Error sending message to LINE:', error);
    }
}

// Capitalize first letter of the string
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/* const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// LINE channel access token
const CHANNEL_ACCESS_TOKEN = '4BPczGGcQC9LwklpFUHj160yd2Al8xOVVpzT0lB5Di6AYHt4NXYjWXgSPLdKM87IpNdqMQybBJWAScFeDTIRZh9QQ8S6zhiGtkyPTdLG7wdUXinNdr5ngiGeoJ/Hl4Sewoq+d0uJDnlp7JbKg02sFQdB04t89/1O/w1cDnyilFU=';

// Function to send notification via LINE Messaging API
const sendLineNotification = async (lineId, message) => {
    const url = 'https://api.line.me/v2/bot/message/push';
    const headers = {
        'Authorization': Bearer ${CHANNEL_ACCESS_TOKEN},
        'Content-Type': 'application/json',
    };
    const payload = {
        to: lineId,
        messages: [{ type: 'text', text: message }],
    };

    try {
        const response = await axios.post(url, payload, { headers });
        console.log('Notification sent successfully!', response.data);
    } catch (error) {
        console.error('Failed to send notification:', error.response ? error.response.data : error.message);
    }
};

// Webhook endpoint to receive order status updates from Odoo
app.post('/webhook/order-status', async (req, res) => {
    const { orderId, newStatus, customerLineId } = req.body;

    // Log received data
    console.log('Received order status update:', req.body);

    // Prepare message based on order status
    const message = Your order (ID: ${orderId}) status is now: ${newStatus};

    // Send notification to the customer
    await sendLineNotification(customerLineId, message);

    // Send response back to Odoo
    res.status(200).send('Order status update processed.');
});

// Start the server
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
}); */