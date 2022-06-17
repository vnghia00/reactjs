import { path } from "../../utils";
export const adminMenu = [
	{
		name: "menu.system.Staff",
		menus: [
			{
				name: "menu.system.system-administrator.user-redux",
				link: path.SYSTEM + "/user-redux",
			},
			{
				name: "menu.system.role",
				link: path.SYSTEM + "/chuc-vu",
			},
		],
	},
	{
		name: "menu.system.material",
		menus: [
			{
				name: "menu.system.material-management",
				link: path.SYSTEM + "/nguyen-lieu",
			},
			{
				name: "menu.system.warehouse-material",
				link: path.SYSTEM + "/kho-nguyen-lieu",
			},
			// {
			// 	name: "menu.system.import-material",
			// 	link: path.SYSTEM + "/nhap-nguyen-lieu",
			// },
		],
	},
	{
		name: "menu.system.dish",
		menus: [
			{
				name: "menu.system.food-management",
				link: path.SYSTEM + "/mon-an",
			},
			{
				name: "menu.system.category-management",
				link: path.SYSTEM + "/danh-muc-mon-an",
			},
		],
	},
	{
		name: "menu.system.dinner-table",
		menus: [
			{
				name: "menu.system.manage-the-dining-table",
				link: path.SYSTEM + "/ban-an",
			},
		],
	},
	{
		name: "menu.system.invoice",
		menus: [
			{
				name: "menu.system.manage-order",
				link: path.SYSTEM + "/hoa-don",
			},
		],
	},
	{
		name: "menu.system.statistic",
		menus: [
			{
				name: "menu.system.statistic-revenue",
				link: path.SYSTEM + "/thong-ke",
			},
			{
				name: "menu.system.statistic-revenue-table",
				link: path.SYSTEM + "/thong-ke-ban",
			},
		],
	},
];

export const thuNganMenu = [
	{
		name: "menu.system.material",
		menus: [
			{
				name: "menu.system.material-management",
				link: path.SYSTEM + "/nguyen-lieu",
			},
			{
				name: "menu.system.warehouse-material",
				link: path.SYSTEM + "/kho-nguyen-lieu",
			},
		],
	},
	{
		name: "menu.system.dish",
		menus: [
			{
				name: "menu.system.food-management",
				link: path.SYSTEM + "/mon-an",
			},
			{
				name: "menu.system.category-management",
				link: path.SYSTEM + "/danh-muc-mon-an",
			},
		],
	},
	{
		name: "menu.system.dinner-table",
		menus: [
			{
				name: "menu.system.manage-the-dining-table",
				link: path.SYSTEM + "/ban-an",
			},
		],
	},
	{
		name: "menu.system.invoice",
		menus: [
			{
				name: "menu.system.manage-order",
				link: path.SYSTEM + "/hoa-don",
			},
		],
	},
	
];

export const thuKhoMenu = [
	{
		name: "menu.system.material",
		menus: [
			{
				name: "menu.system.material-management",
				link: path.SYSTEM + "/nguyen-lieu",
			},
			{
				name: "menu.system.warehouse-material",
				link: path.SYSTEM + "/kho-nguyen-lieu",
			},
		],
	},
	{
		name: "menu.system.dish",
		menus: [
			{
				name: "menu.system.food-management",
				link: path.SYSTEM + "/mon-an",
			},
			{
				name: "menu.system.category-management",
				link: path.SYSTEM + "/danh-muc-mon-an",
			},
		],
	},
	{
		name: "menu.system.dinner-table",
		menus: [
			{
				name: "menu.system.manage-the-dining-table",
				link: path.SYSTEM + "/ban-an",
			},
		],
	},
	
];
