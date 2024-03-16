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
    },

    project(frm) {
        if (frm.doc.project) {
            frm.set_query("task", "tasks", () => ({
                filters: {
                    project: frm.doc.project
                }
            }))
        }
    }
});

// const item_dialog = new frappe.ui.Dialog({
//     title: __("Select Sales Order Item"),
//     fields: [
//         {
//             label: "Item Name",
//             fieldname: "item_name",
//             fieldtype
//         }
//     ]
// })

