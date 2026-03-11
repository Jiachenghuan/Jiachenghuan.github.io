import { Navigate, Route, Routes } from 'react-router-dom';
import { useLocalizedSiteContent } from './content/siteContent';
import { Layout } from './components/Layout';
import { LocaleProvider } from './i18n/LocaleContext';
import { HomePage } from './pages/HomePage';
import { LifePage } from './pages/LifePage';
import { ResearchPage } from './pages/ResearchPage';

function AppRoutes() {
  const siteContent = useLocalizedSiteContent();

  return (
    <Routes>
      <Route element={<Layout home={siteContent.home} />}>
        <Route index element={<HomePage siteContent={siteContent} />} />
        <Route path="/life" element={<LifePage content={siteContent.lifeCards} home={siteContent.home} />} />
        <Route
          path="/research"
          element={<ResearchPage content={siteContent.researchProjects} home={siteContent.home} />}
        />
        <Route path="/contact" element={<Navigate to={{ pathname: '/', hash: '#contact' }} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <AppRoutes />
    </LocaleProvider>
  );
}
