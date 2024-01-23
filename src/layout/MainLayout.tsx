import { Outlet } from "react-router-dom";

import styles from "./mainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Outlet />
    </div>
  );
};

export default MainLayout;
