import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import ContactList from "@/views/ContactList.vue";
import ContactEditor from "@/views/ContactEditor.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  { path: "/venue-people", name: "ContactList", component: ContactList },
  {
    path: "/contacts/edit/:id?",
    name: "ContactEditor",
    component: ContactEditor,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
