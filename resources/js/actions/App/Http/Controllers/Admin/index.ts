import AdminDashboardController from './AdminDashboardController'
import AdminProviderController from './AdminProviderController'
import AdminUserController from './AdminUserController'
const Admin = {
    AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
AdminProviderController: Object.assign(AdminProviderController, AdminProviderController),
AdminUserController: Object.assign(AdminUserController, AdminUserController),
}

export default Admin