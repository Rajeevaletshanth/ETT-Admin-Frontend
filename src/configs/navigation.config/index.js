import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from "constants/navigation.constant";
import {SUPERADMIN, ADMIN, USER, SALES} from 'constants/roles.constant'

const navigationConfig = [
  {
    key: "apps",
    path: "",
    title: "Apps",
    translateKey: "nav.apps",
    icon: "apps",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [],
    subMenu: [
      {
        key: "home",
        path: "/home",
        title: "Home",
        translateKey: "nav.home",
        icon: "home",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: "profile",
        path: "",
        title: "Profile",
        translateKey: "nav.profile",
        icon: "account",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: "account.settings",
            path: "/app/account/settings/profile",
            title: "Settings",
            translateKey: "nav.settings",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
        ],
      },
      {
        key: "product",
        path: "",
        title: "Products",
        translateKey: "nav.products.products",
        icon: "products",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
          {
            key: "product.fixed_departure",
            path: "/product/fixed_departure",
            title: "Fixed Departure",
            translateKey: "nav.products.fixed_departure",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: "product.van_tours",
            path: "/product/van_tours",
            title: "Van Tours",
            translateKey: "nav.products.van_tours",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: "product.vip",
            path: "/product/vip",
            title: "VIP",
            translateKey: "nav.products.vip",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: "product.fit",
            path: "/product/fit",
            title: "FIT",
            translateKey: "nav.products.fit",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: "product.mice",
            path: "/product/mice",
            title: "MICE",
            translateKey: "nav.products.mice",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: "product.tour_packages",
            path: "/product/tour_packages",
            title: "Tour Packages",
            translateKey: "nav.products.tour_packages",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: "product.hotel",
            path: "/product/hotel",
            title: "Hotel",
            translateKey: "nav.products.hotel",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: "product.apartments",
            path: "/product/apartments",
            title: "Apartments",
            translateKey: "nav.products.apartments",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
          {
            key: "product.transport",
            path: "/product/transport",
            title: "Transport",
            translateKey: "nav.products.transport",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: [],
          },
        ],
      },
      {
        key: "quotation",
        path: "/quotation",
        title: "Quotation",
        translateKey: "nav.quotation",
        icon: "quotation",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: "agents",
        path: "/agents",
        title: "Agents",
        translateKey: "nav.agents",
        icon: "agents",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: "supplier",
        path: "/supplier",
        title: "Supplier",
        translateKey: "nav.supplier",
        icon: "supplier",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: "client",
        path: "/client",
        title: "B2C Client",
        translateKey: "nav.client",
        icon: "client",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: "additional_info",
        path: "/additional_info",
        title: "Additional Info",
        translateKey: "nav.additional_info",
        icon: "info",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: "my_bookings",
        path: "/my_bookings",
        title: "My Bookings",
        translateKey: "nav.my_bookings",
        icon: "booking",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: "offers",
        path: "/offers",
        title: "Offers",
        translateKey: "nav.offers",
        icon: "offers",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: "contact_us",
        path: "/contact_us",
        title: "Contact Us",
        translateKey: "nav.contact_us",
        icon: "contact",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
    ],
  },
  {
    key: "leads",
    path: "",
    title: "Leads",
    translateKey: "nav.leads",
    icon: "",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [SUPERADMIN, ADMIN],
    subMenu: [
      {
        key: "leads.create",
        path: "/leads/create_lead",
        title: "Create Lead",
        translateKey: "nav.create_lead",
        icon: "add_user",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPERADMIN, ADMIN],
        subMenu: [],
      },
      {
        key: "leads.manage",
        path: "/leads/manage_lead",
        title: "Manage Leads",
        translateKey: "nav.manage_lead",
        icon: "users",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPERADMIN, ADMIN],
        subMenu: [],
      },
    ],
  },
  {
    key: "verifications",
    path: "",
    title: "Verifications",
    translateKey: "nav.verification",
    icon: "",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [SUPERADMIN, ADMIN],
    subMenu: [
      {
        key: "verifications.list",
        path: "/verification/user",
        title: "User Requests",
        translateKey: "nav.user_requests",
        icon: "verify",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPERADMIN, ADMIN],
        subMenu: [],
      },
    ],
  },
];

export default navigationConfig;
