import { type MenuList, type Breadcrumb } from "@/store/types/index";
export const filterBreadcrumb = (path: string, menuList: MenuList[]) => {
    //eg :/system/menu
  let paths = path.split("/");
  //eg: ['', 'system', 'menu']
  //去除空
  paths = paths.filter((item) => item);
  const breadcrumbs: Breadcrumb[] = [];
  paths.forEach((item) => {
    breadcrumbs.push({
      name: getMenuTitle(item, menuList),
    });
  });
  return breadcrumbs;
};

const getMenuTitle = (path: string, menuList: MenuList[]): string => {
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].path === path) {
      return menuList[i].meta?.title || "";
    }
    if (menuList[i].menu_type === 1) {
      return getMenuTitle(path, menuList[i].children as MenuList[]) || "";
    }
  }
  return "";
};
