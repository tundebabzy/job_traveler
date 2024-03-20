import frappe
from frappe.desk.reportview import get_match_cond
from erpnext.stock.doctype.item.item import get_item_details


@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def get_items_in_price_list(doctype, txt, searchfield, start, page_len, filters):
    sales_order = filters.get("sales_order")
    if sales_order:
        return frappe.db.sql(
            """
            select i.name as value, concat("Sales Order Line ", i.idx, ": ", i.item_code) as description from `tabSales Order Item` i where
            i.item_code like %(txt)s and i.parent=%(parent)s {mcond}
            order by i.item_code, i.idx limit %(page_len)s offset %(start)s
            """.format(**{"mcond": get_match_cond("Sales Order Item")}),
            {"txt": "%" + txt + "%", "page_len": page_len, "start": start, "parent": sales_order}
        )
    else:
        return []
    

@frappe.whitelist()
def get_customer_part_name(item, sales_order):
    current_customer =  frappe.get_value("Sales Order", sales_order, "customer_name")
    item_details = get_item_details(item)
    if item_details.customer_items:
        for customer_part_no in item_details.customer_items:
            if customer_part_no['customer_name'] == current_customer:
                return customer_part_no['ref_code']
            if customer_part_no['ref_code'] and not customer_part_no['customer_name']:
                return customer_part_no['ref_code']
    
    return ""