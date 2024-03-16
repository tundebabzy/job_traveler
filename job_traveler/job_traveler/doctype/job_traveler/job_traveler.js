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
    }
});
