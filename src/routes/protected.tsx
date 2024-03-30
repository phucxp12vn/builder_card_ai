import { Icon } from '@chakra-ui/react';
import { AiFillCustomerService } from 'react-icons/ai';
import { MdHome } from 'react-icons/md';
import { RouteObject } from 'react-router-dom';

import { RouteClass } from '@/constant/index';
import MainLayout from '@/layout/MainLayout';
import LearnBox from '@/view/sanbox/LearnBox';
// import BuildCard from '@/view/tool/BuildCard';

export const menuRoutes: RoutesType[] = [
  {
    name: 'Main Dashboard',
    classification: RouteClass.PRIVATE,
    path: '/',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: () => <></>,
  },
  {
    name: 'Sanbox Learning',
    classification: RouteClass.PRIVATE,
    path: '/learn-box',
    icon: <Icon as={AiFillCustomerService} width="20px" height="20px" color="inherit" />,
    component: LearnBox,
  },
];

export const mappedRoutes: RouteObject[] = menuRoutes
  .filter((route) => route.classification === RouteClass.PRIVATE)
  .map((route) => ({ path: route.path, element: <route.component /> }));

export const protectedRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [...mappedRoutes],
  },
];
