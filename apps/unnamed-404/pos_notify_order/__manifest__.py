{
    "name": "POS Order Status Notifications",
    "version": "1.0",
    "summary": 'Send notifications to customers via LINE based on POS order status changes',
    "description": """
        This module enables automatic notifications to customers through LINE Official Account when their order status in POS changes. 
        The LINE ID of the customer should be stored in the Internal Note field of the contact record.
    """,
    "category": "Point of Sale",
    "author": "ming",
    "depends": ["point_of_sale"],  # Dependencies on POS and Contacts modules
    "data":['views/res_partner_view.xml',],
    "installable": True,
    "application": False,
    'license': 'LGPL-3',
}
