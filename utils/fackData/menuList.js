export const menuList = [
    {
        id: 12,
        name: "For Individual Donors",
        type: "heading" ,// custom field to render heading
        role: "Individual Donor", // 👈 Add role key
    },
    {
        id: 0,
        name: "dashboard",
        path: "#",
        icon: 'feather-airplay',
        role: "Individual Donor", // 👈 Add role key
        dropdownMenu: [
            {
                id: 1,
                name: "CRM",
                path: "/account/",
                subdropdownMenu: false
            }
            // {
            //     id: 2,
            //     name: "Analytics",
            //     path: "/account/general/dashboards/analytics/",
            //     subdropdownMenu: false
            // }
        ]
    },
    {
        id: 6,
        name: "Expiry Tracker",
        path: "#",
        icon: 'feather-alert-circle',
        role: "Individual Donor", // 👈 Add role key
        dropdownMenu: [
            {
                id: 1,
                name: "All Expiries",
                path: "/account/general/leads/list",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Leads View",
            //     path: "/account/general/leads/view",
            //     subdropdownMenu: false
            // },
            {
                id: 3,
                name: "Add Expiry",
                path: "/account/general/leads/create",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 7,
        name: "Donations",
        path: "#",
        icon: 'feather-briefcase',
        role: "Individual Donor", // 👈 Add role key
        dropdownMenu: [
            {
                id: 1,
                name: "All Donations",
                path: "/account/general/projects/list",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Donation View View",
            //     path: "/account/general/projects/view",
            //     subdropdownMenu: false
            // },
            {
                id: 3,
                name: "Make a Donation",
                path: "/account/general/projects/create",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 21,
        name: "Donate Products",
        path: "#",
        icon: 'feather-plus-square',
        role: "Individual Donor", // 👈 Add role key
        dropdownMenu: [
            {
                id: 1,
                name: "All Products",
                path: "/account/general/shop/list",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Donation View View",
            //     path: "/account/general/projects/view",
            //     subdropdownMenu: false
            // },
            {
                id: 3,
                name: "Add a Product",
                path: "/account/general/shop/create",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 13,
        name: "For Store Owners",
        type: "heading", // custom field to render heading
        role: "Store Owner",
    },
    {
        id: 14,
        name: "dashboard",
        path: "#",
        icon: 'feather-airplay',
        role: "Store Owner",
        dropdownMenu: [
            {
                id: 1,
                name: "CRM",
                path: "/account/",
                subdropdownMenu: false
            }
            // {
            //     id: 2,
            //     name: "Analytics",
            //     path: "/account/general/dashboards/analytics/",
            //     subdropdownMenu: false
            // }
        ]
    },
    {
        id: 15,
        name: "Expiry Tracker",
        path: "#",
        icon: 'feather-alert-circle',
        role: "Store Owner",
        dropdownMenu: [
            {
                id: 1,
                name: "All Expiries",
                path: "/account/general/leads/list",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Leads View",
            //     path: "/account/general/leads/view",
            //     subdropdownMenu: false
            // },
            {
                id: 3,
                name: "Add Expiry",
                path: "/account/general/leads/create",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 16,
        name: "Donations",
        path: "#",
        icon: 'feather-briefcase',
        role: "Store Owner",
        dropdownMenu: [
            {
                id: 1,
                name: "All Donations",
                path: "/account/general/projects/list",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Donation View View",
            //     path: "/account/general/projects/view",
            //     subdropdownMenu: false
            // },
            {
                id: 3,
                name: "Make a Donation",
                path: "/account/general/projects/create",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 22,
        name: "Donate Products",
        path: "#",
        icon: 'feather-plus-square',
        role: "Store Owner", // 👈 Add role key
        dropdownMenu: [
            {
                id: 1,
                name: "All Products",
                path: "/account/general/shop/list",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Donation View View",
            //     path: "/account/general/projects/view",
            //     subdropdownMenu: false
            // },
            {
                id: 3,
                name: "Add a Product",
                path: "/account/general/shop/create",
                subdropdownMenu: false
            }
        ]
    },
    // {
    //     id: 1,
    //     name: "reports",
    //     path: "#",
    //     icon: 'feather-cast',
    //     role: "Store Owner",
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Sales Report",
    //             path: "/account/general/reports/sales",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Leads Report",
    //             path: "/account/general/reports/leads",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Project Report",
    //             path: "/account/general/reports/project",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Timesheets Report",
    //             path: "/account/general/reports/timesheets",
    //             subdropdownMenu: false
    //         },

    //     ]
    // },
    {
        id: 13,
        name: "ngo/reciver",
        type: "heading", // custom field to render heading
        role: "NGO / Receiver"
    },
    {
        id: 19,
        name: "dashboard",
        path: "#",
        icon: 'feather-airplay',
        role: "NGO / Receiver",
        dropdownMenu: [
            {
                id: 1,
                name: "CRM",
                path: "/account/index2",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 17,
        name: "Availaible Donations",
        path: "#",
        icon: 'feather-alert-circle',
        role: "NGO / Receiver",
        dropdownMenu: [
            {
                id: 1,
                name: "All Donations",
                path: "/account/general/recDon/create",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Leads View",
            //     path: "/account/general/leads/view",
            //     subdropdownMenu: false
            // },
            {
                id: 3,
                name: "Collected Donations",
                path: "/account/general/recDon/list",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 13,
        name: "rider/volunteer",
        type: "heading", // custom field to render heading
         role: "Rider"
    },
    {
        id: 20,
        name: "dashboard",
        path: "#",
        icon: 'feather-airplay',
        role: "Rider",
        dropdownMenu: [
            {
                id: 1,
                name: "CRM",
                path: "/account/index3",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 18,
        name: "Availaible Pickups",
        path: "#",
        icon: 'feather-alert-circle',
        role: "Rider",
        dropdownMenu: [
            {
                id: 1,
                name: "All Pickups",
                path: "/account/general/volunteer/create",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Leads View",
            //     path: "/account/general/leads/view",
            //     subdropdownMenu: false
            // },
            {
                id: 3,
                name: "Accepted Pickups",
                path: "/account/general/volunteer/list",
                subdropdownMenu: false
            }
        ]
    },

    ]
    // {
    //     id: 2,
    //     name: "applications",
    //     path: '#',
    //     icon: 'feather-send',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Chat",
    //             path: "/account/applications/chat",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Email",
    //             path: "/applications/email",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Tasks",
    //             path: "/applications/tasks",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Notes",
    //             path: "/applications/notes",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 5,
    //             name: "Storage",
    //             path: "/applications/storage",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 6,
    //             name: "Calendar",
    //             path: "/applications/calendar",
    //             subdropdownMenu: false
    //         },
    //     ]
    // },
    // {
    //     id: 3,
    //     name: "proposal",
    //     path: "#",
    //     icon: 'feather-at-sign',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Proposal",
    //             path: "/proposal/list",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Proposal View",
    //             path: "/proposal/view",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Proposal Edit",
    //             path: "/proposal/edit",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Proposal Create",
    //             path: "/proposal/create",
    //             subdropdownMenu: false
    //         },

    //     ],
    // },
    // {
    //     id: 4,
    //     name: "payment",
    //     path: "#",
    //     icon: 'feather-dollar-sign',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Payment",
    //             path: "/payment/list",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Invoice View",
    //             path: "/payment/view",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Invoice Create",
    //             path: "/payment/create",
    //             subdropdownMenu: false
    //         }
    //     ]
    // },
    // {
    //     id: 5,
    //     name: "customers",
    //     path: "#",
    //     icon: 'feather-users',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Customers",
    //             path: "/customers/list",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Customers View",
    //             path: "/customers/view",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Customers Create",
    //             path: "/customers/create",
    //             subdropdownMenu: false
    //         }
    //     ]
    // },


    // {
    //     id: 8,
    //     name: "widgets",
    //     path: "#",
    //     icon: 'feather-layout',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Lists",
    //             path: "/widgets/lists",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Tables",
    //             path: "/widgets/tables",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Charts",
    //             path: "/widgets/charts",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Statistics",
    //             path: "/widgets/statistics",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 5,
    //             name: "Miscellaneous",
    //             path: "/widgets/miscellaneous",
    //             subdropdownMenu: false
    //         },
    //     ]
    // },
    // {
    //     id: 9,
    //     name: "settings",
    //     path: "#",
    //     icon: 'feather-settings',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Ganeral",
    //             path: "/settings/ganeral",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "SEO",
    //             path: "/settings/seo",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Tags",
    //             path: "/settings/tags",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Email",
    //             path: "/settings/email",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 5,
    //             name: "Tasks",
    //             path: "/settings/tasks",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 6,
    //             name: "Leads",
    //             path: "/settings/leads",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 7,
    //             name: "Support",
    //             path: "/settings/Support",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 8,
    //             name: "Finance",
    //             path: "/settings/finance",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 9,
    //             name: "Gateways",
    //             path: "/settings/gateways",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 10,
    //             name: "Customers",
    //             path: "/settings/customers",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 11,
    //             name: "Localization",
    //             path: "/settings/localization",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 12,
    //             name: "reCAPTCHA",
    //             path: "/settings/recaptcha",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 13,
    //             name: "Miscellaneous",
    //             path: "/settings/miscellaneous",
    //             subdropdownMenu: false
    //         },
    //     ]
    // },
    // {
    //     id: 10,
    //     name: "authentication",
    //     path: "#",
    //     icon: 'feather-power',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "login",
    //             path: "#",
    //             subdropdownMenu: [
    //                 {
    //                     id: 1,
    //                     name: "Cover",
    //                     path: "/authentication/login/cover",
    //                 },
    //                 {
    //                     id: 2,
    //                     name: "Minimal",
    //                     path: "/authentication/login/minimal",
    //                 },
    //                 {
    //                     id: 3,
    //                     name: "Creative",
    //                     path: "/authentication/login/creative",
    //                 },
    //             ]
    //         },
    //         {
    //             id: 2,
    //             name: "register",
    //             path: "#",
    //             subdropdownMenu: [
    //                 {
    //                     id: 1,
    //                     name: "Cover",
    //                     path: "/authentication/register/cover",
    //                 },
    //                 {
    //                     id: 2,
    //                     name: "Minimal",
    //                     path: "/authentication/register/minimal",
    //                 },
    //                 {
    //                     id: 3,
    //                     name: "Creative",
    //                     path: "/authentication/register/creative",
    //                 },
    //             ]
    //         },
    //         {
    //             id: 3,
    //             name: "Error 404",
    //             path: "#",
    //             subdropdownMenu: [
    //                 {
    //                     id: 1,
    //                     name: "Cover",
    //                     path: "/authentication/404/cover",
    //                 },
    //                 {
    //                     id: 2,
    //                     name: "Minimal",
    //                     path: "/authentication/404/minimal",
    //                 },
    //                 {
    //                     id: 3,
    //                     name: "Creative",
    //                     path: "/authentication/404/creative",
    //                 },
    //             ]
    //         },
    //         {
    //             id: 4,
    //             name: "Reset Pass",
    //             path: "#",
    //             subdropdownMenu: [
    //                 {
    //                     id: 1,
    //                     name: "Cover",
    //                     path: "/authentication/reset/cover",
    //                 },
    //                 {
    //                     id: 2,
    //                     name: "Minimal",
    //                     path: "/authentication/reset/minimal",
    //                 },
    //                 {
    //                     id: 3,
    //                     name: "Creative",
    //                     path: "/authentication/reset/creative",
    //                 },
    //             ]
    //         },
    //         {
    //             id: 5,
    //             name: "Verify OTP",
    //             path: "#",
    //             subdropdownMenu: [
    //                 {
    //                     id: 1,
    //                     name: "Cover",
    //                     path: "/authentication/verify/cover",
    //                 },
    //                 {
    //                     id: 2,
    //                     name: "Minimal",
    //                     path: "/authentication/verify/minimal",
    //                 },
    //                 {
    //                     id: 3,
    //                     name: "Creative",
    //                     path: "/authentication/verify/creative",
    //                 },
    //             ]
    //         },
    //         {
    //             id: 6,
    //             name: "Maintenance",
    //             path: "#",
    //             subdropdownMenu: [
    //                 {
    //                     id: 1,
    //                     name: "Cover",
    //                     path: "/authentication/maintenance/cover",
    //                 },
    //                 {
    //                     id: 2,
    //                     name: "Minimal",
    //                     path: "/authentication/maintenance/minimal",
    //                 },
    //                 {
    //                     id: 3,
    //                     name: "Creative",
    //                     path: "/authentication/maintenance/creative",
    //                 },
    //             ]
    //         },
    //     ]
    // },
    // {
    //     id: 11,
    //     name: "help center",
    //     path: "#",
    //     icon: 'feather-life-buoy',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Support",
    //             path: "https://wrapbootstrap.com/user/theme_ocean",
    //             target: "_blank",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "KnowledgeBase",
    //             path: "/help/knowledgebase",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Documentations",
    //             path: "https://duralux-next-doc.vercel.app/",
    //             target: "_blank",
    //             subdropdownMenu: false
    //         }
    //     ]
    // },


