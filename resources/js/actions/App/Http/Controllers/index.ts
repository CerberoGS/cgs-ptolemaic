import JournalEntryController from './JournalEntryController'
import AchievementController from './AchievementController'
import AnalyticsDashboardController from './AnalyticsDashboardController'
import FeedbackController from './FeedbackController'
import Admin from './Admin'
import Settings from './Settings'
import Auth from './Auth'
const Controllers = {
    JournalEntryController: Object.assign(JournalEntryController, JournalEntryController),
AchievementController: Object.assign(AchievementController, AchievementController),
AnalyticsDashboardController: Object.assign(AnalyticsDashboardController, AnalyticsDashboardController),
FeedbackController: Object.assign(FeedbackController, FeedbackController),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
Auth: Object.assign(Auth, Auth),
}

export default Controllers