import { DirectiveBinding } from "vue";
import useAppStore from "@/store/index";


export function hasPermission(el: Element, binding: DirectiveBinding) {
  const appStore = useAppStore();
  const { value } = binding;
  const hasPermission = value;
  if (!hasPermission) throw new Error("请传入权限标识");
  if (typeof hasPermission == "string") {
    if (!appStore.permissions.includes(hasPermission)) {
      el.parentNode?.removeChild(el);
    }
    return;
  }
  if (Array.isArray(hasPermission)) {
    if (!hasPermission.some((item) => appStore.permissions.includes(item))) {
      el.parentNode?.removeChild(el);
    }
    return;
  }
  throw new Error("权限标识格式不正确!");
}