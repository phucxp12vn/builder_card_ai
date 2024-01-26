import { Icon } from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import { RouteObject } from "react-router-dom";

import MainLayout from "./layout/MainLayout.tsx";
import BuildCard from "./view/tool/BuildCard.tsx";
import { RouteClass } from "src/constant";

const routes: RoutesType[] = [
  {
    name: "Main Dashboard",
    classification: RouteClass.PRIVATE,
    path: "/",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: BuildCard,
  },
];

const privateRoutes: RouteObject[] = routes
  .filter((route) => route.classification === RouteClass.PRIVATE)
  .map((route) => ({ path: route.path, element: <route.component /> }));

export const renderRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [...privateRoutes],
  },
];

export default routes;
