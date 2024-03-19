import frappe
from erpnext.stock.doctype.item.item import get_item_details

@frappe.whitelist()
def cutomer_part_number(item, current_cutomer):
    item_details = get_item_details(item)
    if item_details.customer_items:
        for customer_part_no in item_details.customer_items:
            if customer_part_no['customer_name'] == current_cutomer:
                return customer_part_no['ref_code']
            if customer_part_no['ref_code'] and not customer_part_no['customer_name']:
                return customer_part_no['ref_code']
    
    return ""


def create_job_travelers(doc, *args):
    for item in doc.items:
        traveler = frappe.new_doc("Job Traveler")
        traveler.update({
            "sales_order": doc.name,
            "sales_order_item": item.name,
            "item": item.item_code,
            "project": doc.project,
            "customer_purchase_order": doc.po_no,
            "customer_delivery_date": item.delivery_date,
            "description": item.description,
            "customer_part_number": cutomer_part_number(item.item_code, doc.customer_name)
        })
        traveler.save(ignore_permissions=True)
    frappe.msgprint("Draft Job Travelers have also been created")

def cancel_job_travelers(doc, *args):
    travelers = frappe.get_all("Job Traveler", filters={"sales_order": doc.name, "docstatus": ["!=", 2]})
    for traveler in travelers:
        if traveler.docstatus == 1:
            frappe.get_doc("Job Traveler", traveler.name).cancel()
        else:
            frappe.get_doc("Job Traveler", traveler.name).delete()
    if travelers:
        frappe.msgprint("Linked Job Travelers have also been canceled and/or deleted")