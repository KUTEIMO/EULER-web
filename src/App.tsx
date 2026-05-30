import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { fetchUserProfile } from './services/authService';
import { useAuthStore } from './store/authStore';
import { useProgressStore } from './store/progressStore';
import { useThemeStore } from './store/themeStore';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Onboarding from './pages/Onboarding';
import About from './pages/About';
import Slides from './pages/Slides';
import Guion from './pages/Guion';
import StudentHome from './pages/student/StudentHome';
import StudentPath from './pages/student/StudentPath';
import StudentLesson from './pages/student/StudentLesson';
import StudentRanking from './pages/student/StudentRanking';
import StudentGroups from './pages/student/StudentGroups';
import StudentGroupDetail from './pages/student/StudentGroupDetail';
import StudentSettings from './pages/student/StudentSettings';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherGroups from './pages/teacher/TeacherGroups';
import TeacherCreateGroup from './pages/teacher/TeacherCreateGroup';
import TeacherGroupDetail from './pages/teacher/TeacherGroupDetail';

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const { setCurrentUser, setUserData, setLoading } = useAuthStore();
  const hydrate = useProgressStore((s) => s.hydrate);

  useEffect(() => {
    useThemeStore.getState().apply();
    hydrate();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const profile = await fetchUserProfile(user.uid, user.email ?? '');
        setUserData(profile);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsub;
  }, [setCurrentUser, setUserData, setLoading, hydrate]);

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthBootstrap>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/slides" element={<Slides />} />
          <Route path="/guion" element={<Guion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/s/home"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/s/path"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentPath />
                </ProtectedRoute>
              }
            />
            <Route
              path="/s/lesson/:lessonId"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentLesson />
                </ProtectedRoute>
              }
            />
            <Route
              path="/s/ranking"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentRanking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/s/groups"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentGroups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/s/groups/:groupId"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentGroupDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/s/settings" element={<StudentSettings />} />
            <Route
              path="/t/dashboard"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/t/groups"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherGroups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/t/groups/new"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherCreateGroup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/t/groups/:groupId"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherGroupDetail />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthBootstrap>
    </BrowserRouter>
  );
}
