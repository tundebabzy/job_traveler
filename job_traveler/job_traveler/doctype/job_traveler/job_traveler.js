// Copyright (c) 2024, tundebabzy@gmail.com and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Job Traveler", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on("Job Traveler", {
    setup(frm) {
        frm.set_query("sales_order", () => ({
            filters: {
                docstatus: 1 
            }
        }));
    },

    refresh(frm) {
        if (frm.doc.docstatus === 0 && frm.doc.sales_order) {
            frm.add_custom_button(__("Add Sales Order Item"), () => {

            });
        }
    },

    sales_order(frm) {
        if (frm.doc.sales_order) {
            frm.add_custom_button(__("Add Sales Order Item"), () => {

            });
        }
    }
});
