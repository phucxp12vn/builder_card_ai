import React from 'react';

import { RouteClass } from '@/constant/index';

export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  type RouteClassification = (typeof RouteClass)[keyof typeof RouteClass];

  interface RoutesType {
    name: string;
    classification: RouteClassification;
    component: () => React.JSX.Element;
    icon: React.JSX.Element | string;
    path: string;
    secondary?: boolean;
  }
}
