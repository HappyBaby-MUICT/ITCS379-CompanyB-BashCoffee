const express = require('express');
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
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
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
    const message = `Your order (ID: ${orderId}) status is now: ${newStatus}`;

    // Send notification to the customer
    await sendLineNotification(customerLineId, message);

    // Send response back to Odoo
    res.status(200).send('Order status update processed.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
