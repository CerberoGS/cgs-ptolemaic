import AdminDashboardController from './AdminDashboardController'
import AdminProviderController from './AdminProviderController'
import AdminUserController from './AdminUserController'
import UserPlanController from './UserPlanController'
import AdminRoleController from './AdminRoleController'
import FeedbackController from './FeedbackController'
import InvitationController from './InvitationController'
const Admin = {
    AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
AdminProviderController: Object.assign(AdminProviderController, AdminProviderController),
AdminUserController: Object.assign(AdminUserController, AdminUserController),
UserPlanController: Object.assign(UserPlanController, UserPlanController),
AdminRoleController: Object.assign(AdminRoleController, AdminRoleController),
FeedbackController: Object.assign(FeedbackController, FeedbackController),
InvitationController: Object.assign(InvitationController, InvitationController),
}

export default Admin