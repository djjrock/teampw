import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { Dashboard } from './components/dashboard/Dashboard';
import { PasswordList } from './components/passwords/PasswordList';
import { TeamManagement } from './components/teams/TeamManagement';
import { Settings } from './components/settings/Settings';
import { ProfileSettings } from './components/settings/ProfileSettings';
import { SecuritySettings } from './components/settings/SecuritySettings';
import { NotificationSettings } from './components/settings/NotificationSettings';
import { PasswordDetails } from './components/passwords/PasswordDetails';
import { TeamDetails } from './components/teams/TeamDetails';
import { BillingDetails } from './components/settings/BillingDetails';
import { KitchenSink } from './components/kitchen-sink/KitchenSink';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ThemeProvider } from './components/ThemeProvider';

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<PasswordList />} />
            <Route path="passwords" element={<PasswordList />} />
            <Route path="passwords/:id" element={<PasswordDetails />} />
            <Route path="teams" element={<TeamManagement />} />
            <Route path="teams/:id" element={<TeamDetails />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/profile" element={<ProfileSettings />} />
            <Route path="settings/security" element={<SecuritySettings />} />
            <Route path="settings/notifications" element={<NotificationSettings />} />
            <Route path="settings/billing" element={<BillingDetails />} />
            <Route path="settings/kitchen-sink" element={<KitchenSink />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}