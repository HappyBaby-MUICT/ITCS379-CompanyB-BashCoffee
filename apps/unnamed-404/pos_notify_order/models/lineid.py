# my_custom_module/models/res_partner.py
from odoo import models, fields

class ResPartner(models.Model):
    _inherit = 'res.partner'

    line_user_id = fields.Char("LINE User ID", help="Store the customer's LINE User ID for notifications.")
