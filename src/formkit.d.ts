declare module "@formkit/vue" {
  import { Plugin } from "vue";
  export const plugin: Plugin;
  export const defaultConfig: any;
}

declare module "@formkit/addons" {
  export function createAutoAnimatePlugin(): any;
}

declare module "@formkit/rules" {
  export const matches: any;
  export const required: any;
}
