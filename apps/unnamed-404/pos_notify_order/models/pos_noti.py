import requests
from odoo import http, models, api
from odoo.http import request

class LineWebhookController(http.Controller):
    @http.route('/line/webhook', type='json', auth='public', methods=['POST'], csrf=False)
    def line_webhook(self):
        # Parse incoming request data
        data = request.jsonrequest
        events = data.get('events', [])

        for event in events:
            if event.get('type') == 'message' and 'userId' in event['source']:
                reply_token = event['replyToken']
                user_id = event['source']['userId']
                user_message = event['message'].get('text', '').strip().lower()

                # Check if user requests order status
                if user_message == 'check order status':
                    response_message = self.get_latest_order_status(user_id)
                elif user_message == 'play sound notification':
                    self.send_audio_reply(reply_token, "sound-notification.mp3") #path/to/sound-notification.mp3
                else:
                    response_message = "Send 'Check Order Status' to get your latest order update."

                # Reply to the user
                self.send_reply(reply_token, response_message)

        return "OK"

    def get_latest_order_status(self, line_user_id):
        # Find the customer based on their LINE user ID
        partner = request.env['res.partner'].sudo().search([('line_user_id', '=', line_user_id)], limit=1)

        if partner:
            # Retrieve the latest order for the customer
            latest_order = request.env['pos.order'].sudo().search([('partner_id', '=', partner.id)], order='date_order desc', limit=1)
            if latest_order:
                status_messages = {
                    'paid': 'Order received',
                    'invoiced': 'Order processed',
                    'cancel': 'Order canceled',
                    'done': 'Delivering',
                }
                order_status = status_messages.get(latest_order.state, 'Status updated')
                return f"Order {latest_order.name}: {order_status}"
            else:
                return "No recent orders found."
        else:
            return "Customer not found. Please ensure your LINE ID is registered with our service."

    def send_reply(self, reply_token, message):
        # LINE API Reply endpoint
        url = "https://api.line.me/v2/bot/message/reply"
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer 8aazj0E0D3DG4H6ulH1JNs80Qg8Z9bqoiNP6uM5H1+X+c2ryycfmlr9afCu7HwsdpNdqMQybBJWAScFeDTIRZh9QQ8S6zhiGtkyPTdLG7wcZ8LXpBmUj96oTWn0lDimtbOGWkMWMAVRpNTNYwzam0QdB04t89/1O/w1cDnyilFU=",  # Replace with your actual access token
        }

        # Define the reply payload
        payload = {
            "replyToken": reply_token,
            "messages": [
                {
                    "type": "text",
                    "text": message
                }
            ]
        }

        # Send the reply to LINE
        response = requests.post(url, headers=headers, json=payload)
        print("Reply sent. Status code:", response.status_code, "Response:", response.text)

    def send_audio_reply(self, reply_token, audio_url):
        # LINE API Reply endpoint
        url = "https://api.line.me/v2/bot/message/reply"  # Replace with the LINE API endpoint
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer 8aazj0E0D3DG4H6ulH1JNs80Qg8Z9bqoiNP6uM5H1+X+c2ryycfmlr9afCu7HwsdpNdqMQybBJWAScFeDTIRZh9QQ8S6zhiGtkyPTdLG7wcZ8LXpBmUj96oTWn0lDimtbOGWkMWMAVRpNTNYwzam0QdB04t89/1O/w1cDnyilFU="  # Replace with your LINE Channel Access Token
        }

        # Define the reply payload for audio message
        payload = {
            "replyToken": reply_token,
            "messages": [
                {
                    "type": "audio",
                    "originalContentUrl": audio_url,  # URL to the audio file
                    "duration": 60000  # Duration of the audio in milliseconds
                }
            ]
        }

        # Send the audio reply to LINE
        response = requests.post(url, headers=headers, json=payload)
        print("Audio reply sent. Status code:", response.status_code, "Response:", response.text)
