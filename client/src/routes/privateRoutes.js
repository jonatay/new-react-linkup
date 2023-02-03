import React from "react";

// const AdminUsersPage = React.lazy(() =>
//   import("../views/pages/admin/admin-users-page")
// );
// const AdminRightsPage = React.lazy(() =>
//   import("../views/pages/admin/admin-rights-page")
// );
const DriversPage = React.lazy(() =>
  import("../views/pages/fleet/drivers-page")
);
const FleetVehiclesPage = React.lazy(() =>
  import("../views/pages/fleet/fleet-vehicles-page")
);
const FleetTransactionsPage = React.lazy(() =>
  import("../views/pages/fleet/fleet-transactions-page")
);
const FleetSettingsPage = React.lazy(() =>
  import("../views/pages/fleet/fleet-settings-page")
);
// const UserProfilePage = React.lazy(() =>
//   import("../views/pages/common/user-profile-page")
// );
const RootPage = React.lazy(() => import("../views/pages/common/root-page"));

// // sage PAY
// const BankAccountsPage = React.lazy(() =>
//   import("../views/pages/sage-pay/bank-accounts-page")
// );

// const BanksAndBranchesPage = React.lazy(() =>
//   import("../views/pages/sage-pay/banks-and-branches-page")
// );

// const SalaryBatchesPage = React.lazy(() =>
//   import("../views/pages/sage-pay/salary-batches-page")
// );

// // sage ONE
// const SOBankAccountsPage = React.lazy(() =>
//   import("../views/pages/sage-one/so-bank-accounts-page")
// );

// // Attend
// const AttendPage = React.lazy(() =>
//   import("../views/pages/attend/attend-page")
// );

const HomePage = React.lazy(() => import("../views/pages/common/user-home"));

// const Emp501Page = React.lazy(() => import("../views/pages/hr/emp501"));

// const EmployeesPage = React.lazy(() =>
//   import("../views/pages/hr/employee")
// );

export const privateRoutes = [
  // { path: "/admin/users", component: AdminUsersPage },
  // { path: "/admin/rights", component: AdminRightsPage },
  { path: "/fleet/drivers", component: DriversPage },
  { path: "/fleet/vehicles", component: FleetVehiclesPage },
  { path: "/fleet/transactions", component: FleetTransactionsPage },
  { path: "/fleet/settings", component: FleetSettingsPage },

  // { path: "/sage-pay/bank-accounts", component: BankAccountsPage },
  // { path: "/sage-pay/banks-and-branches", component: BanksAndBranchesPage },
  // { path: "/sage-pay/salary-batches", component: SalaryBatchesPage },

  // { path: "/sage-one/bank-accounts", component: SOBankAccountsPage },

  // { path: "/attend/attend", component: AttendPage },

  // { path: "/hr/attendance", component: AttendPage },
  // { path: "/user-profile", component: UserProfilePage },

  // { path: "/hr/emp501", component: Emp501Page },
  // { path: "/hr/employees", component: EmployeesPage },

  { path: "/home", component: HomePage },
  { path: "/", component: RootPage },
];
