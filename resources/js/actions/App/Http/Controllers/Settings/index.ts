import ProfileController from './ProfileController'
import PasswordController from './PasswordController'
import TwoFactorAuthenticationController from './TwoFactorAuthenticationController'
import PlanController from './PlanController'
import TrialController from './TrialController'
import TrialCardController from './TrialCardController'
import IntegrationsController from './IntegrationsController'
import AffiliateController from './AffiliateController'
import WaitlistController from './WaitlistController'
const Settings = {
    ProfileController: Object.assign(ProfileController, ProfileController),
PasswordController: Object.assign(PasswordController, PasswordController),
TwoFactorAuthenticationController: Object.assign(TwoFactorAuthenticationController, TwoFactorAuthenticationController),
PlanController: Object.assign(PlanController, PlanController),
TrialController: Object.assign(TrialController, TrialController),
TrialCardController: Object.assign(TrialCardController, TrialCardController),
IntegrationsController: Object.assign(IntegrationsController, IntegrationsController),
AffiliateController: Object.assign(AffiliateController, AffiliateController),
WaitlistController: Object.assign(WaitlistController, WaitlistController),
}

export default Settings