import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogArticle1Page from './pages/BlogArticle1Page';
import BlogArticle2Page from './pages/BlogArticle2Page';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div dir="rtl" className="font-cairo">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:slug" element={<PropertyDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/how-to-buy-property-in-saudi-arabia" element={<BlogArticle1Page />} />
          <Route path="/blog/common-mistakes-first-time-buyers" element={<BlogArticle2Page />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={
            <div className="min-h-screen pt-20 flex items-center justify-center text-center">
              <div>
                <p className="text-6xl font-extrabold text-primary mb-4">404</p>
                <p className="text-xl text-gray-500 mb-6">الصفحة غير موجودة</p>
                <a href="/" className="btn-primary px-6 py-3 rounded-xl font-bold text-sm">
                  العودة للرئيسية
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}
