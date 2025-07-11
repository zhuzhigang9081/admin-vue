import { type App } from "vue";
import { hasPermission } from "./permisson/hasPermission";
export default function directive(app: App<Element>) {
  app.directive("hasPermission", hasPermission);
}
