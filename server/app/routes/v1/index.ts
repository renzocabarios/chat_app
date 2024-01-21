import usersRoute from "./users/route";
import authRoute from "./auth/route";
import todosRoute from "./todos/route";
import groupsRoute from "./groups/route";
import messagesRoute from "./messages/route";
import { IRoutes, IRoute } from "../../types";

const routes: IRoutes = [
  {
    url: "messages",
    route: messagesRoute,
  },
  {
    url: "groups",
    route: groupsRoute,
  },
  {
    url: "users",
    route: usersRoute,
  },
  {
    url: "auth",
    route: authRoute,
  },
  {
    url: "todos",
    route: todosRoute,
  },
];

export default routes.map((e: IRoute) => {
  e.url = `v1/${e.url}`;
  return e;
});
