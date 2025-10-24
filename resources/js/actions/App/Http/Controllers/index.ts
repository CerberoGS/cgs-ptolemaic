import JournalEntryController from './JournalEntryController'
import AchievementController from './AchievementController'
import AnalyticsDashboardController from './AnalyticsDashboardController'
import FeedbackController from './FeedbackController'
import PricingController from './PricingController'
import Settings from './Settings'
import Auth from './Auth'
import Admin from './Admin'
import InvitationRedemptionController from './InvitationRedemptionController'
const Controllers = {
    JournalEntryController: Object.assign(JournalEntryController, JournalEntryController),
AchievementController: Object.assign(AchievementController, AchievementController),
AnalyticsDashboardController: Object.assign(AnalyticsDashboardController, AnalyticsDashboardController),
FeedbackController: Object.assign(FeedbackController, FeedbackController),
PricingController: Object.assign(PricingController, PricingController),
Settings: Object.assign(Settings, Settings),
Auth: Object.assign(Auth, Auth),
Admin: Object.assign(Admin, Admin),
InvitationRedemptionController: Object.assign(InvitationRedemptionController, InvitationRedemptionController),
}

export default Controllers