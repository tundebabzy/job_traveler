import frappe


def create_job_travelers(doc, *args):
    for item in doc.items:
        traveler = frappe.new_doc("Job Traveler")
        traveler.update({
            "sales_order": doc.name,
            "sales_order_item": item.name,
            "item": item.item_code,
            "project": doc.project,
            "customer_purchase_order": doc.po_no,
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