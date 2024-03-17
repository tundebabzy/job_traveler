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

        if (frm.doc.project) {
            frm.set_query("task", "tasks", () => ({
                filters: {
                    project: frm.doc.project
                }
            }))
        }

        if (frm.doc.sales_order) {
            frm.set_query("sales_order_item", () => ({
                query: "job_traveler.queries.job_traveler.get_items_in_price_list",
                filters: {
                    sales_order: frm.doc.sales_order
                }
            }))
        }
    },

    project(frm) {
        if (frm.doc.project) {
            frm.set_query("task", "tasks", () => ({
                filters: {
                    project: frm.doc.project
                }
            }))
        }
    },

    sales_order(frm) {
        if (frm.doc.sales_order) {
            frm.set_query("sales_order_item", () => ({
                query: "job_traveler.queries.job_traveler.get_items_in_price_list",
                filters: {
                    so: frm.doc.sales_order
                }
            }))
        }
    }
});
