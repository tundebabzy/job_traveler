import frappe
from frappe.desk.reportview import get_match_cond

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