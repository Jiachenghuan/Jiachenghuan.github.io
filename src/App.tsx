import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {Layout} from './components/Layout';
import {getLegacyLifeTarget} from './content/lifeSections';
import {useLocalizedSiteContent} from './content/siteContent';
import {LocaleProvider} from './i18n/LocaleContext';
import {HomePage} from './pages/HomePage';
import {LearningArticlePage} from './pages/LearningArticlePage';
import {LearningPage} from './pages/LearningPage';
import {LiteratureArtArticlePage} from './pages/LiteratureArtArticlePage';
import {LiteratureArtPage} from './pages/LiteratureArtPage';
import {PhotographyPage} from './pages/PhotographyPage';
import {ResearchPage} from './pages/ResearchPage';

function LegacyLifeRedirect() {
  const location = useLocation();
  return <Navigate to={getLegacyLifeTarget(location.hash)} replace />;
}

function AppRoutes() {
  const siteContent = useLocalizedSiteContent();

  return (
    <Routes>
      <Route element={<Layout home={siteContent.home} />}>
        <Route index element={<HomePage siteContent={siteContent} />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/learning/:slug" element={<LearningArticlePage />} />
        <Route path="/photography" element={<PhotographyPage home={siteContent.home} />} />
        <Route path="/literature-art" element={<LiteratureArtPage />} />
        <Route path="/literature-art/:slug" element={<LiteratureArtArticlePage />} />
        <Route path="/life" element={<LegacyLifeRedirect />} />
        <Route
          path="/research"
          element={<ResearchPage content={siteContent.researchProjects} home={siteContent.home} />}
        />
        <Route path="/contact" element={<Navigate to={{pathname: '/', hash: '#contact'}} replace />} />
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
