
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './application/contexts/AuthContext'
import { StudyPlanProvider } from './application/contexts/StudyPlanContext'
import PublicLayout from './interfaces/layout/PublicLayout'
import AppLayout from './interfaces/layout/AppLayout'
import LandingPage from './interfaces/pages/public/LandingPage'
import LoginPage from './interfaces/pages/auth/LoginPage'
import RegisterPage from './interfaces/pages/auth/RegisterPage'
import OnboardingPage from './interfaces/pages/onboarding/OnboardingPage'
import DashboardPage from './interfaces/pages/app/DashboardPage'
import StudyPlanListPage from './interfaces/pages/app/StudyPlanListPage'
import StudyPlanDetailPage from './interfaces/pages/app/StudyPlanDetailPage'
import ModuleDetailPage from './interfaces/pages/app/ModuleDetailPage'
import ProgressPage from './interfaces/pages/app/ProgressPage'
import ProfilePage from './interfaces/pages/app/ProfilePage'
import SettingsPage from './interfaces/pages/app/SettingsPage'
import PricingPage from './interfaces/pages/public/PricingPage'
import PrivateRoute from './interfaces/layout/PrivateRoute'

export default function App() {
  return (
    <AuthProvider>
      <StudyPlanProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoute><AppLayout/></PrivateRoute>}>
          <Route path="/onboarding" element={<OnboardingPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/plans" element={<StudyPlanListPage/>} />
          <Route path="/plans/:planId" element={<StudyPlanDetailPage/>} />
          <Route path="/plans/:planId/modules/:moduleId" element={<ModuleDetailPage/>} />
          <Route path="/progress/:planId" element={<ProgressPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </StudyPlanProvider>
    </AuthProvider>
  )
}
