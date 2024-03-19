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
                    sales_order: frm.doc.sales_order
                }
            }))
        }
    },

    sales_order_item(frm) {
        if (frm.doc.sales_order_item) {
            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "Sales Order Item",
                    parent: "Sales Order",
                    fields: ["item_code", "delivery_date"],
                    filters: {
                        name: frm.doc.sales_order_item
                    },
                    limit_page_length: 1
                },
                callback(r) {
                    if (r && r.message) {
                        frm.set_value("item", r.message[0].item_code);
                        frm.set_value("customer_delivery_date", r.message[0].delivery_date);
                    }
                }
            })
        } else {
            frm.set_value("item", "");
        }
    }
});

frappe.ui.form.on("Job Traveler Item", "onload", function(frm){
    frm.set_query("task", function(){
        return {
            "filters": [
                ["Task", "project", "=", frm.doc.project],
            ]
        }
    });
});
