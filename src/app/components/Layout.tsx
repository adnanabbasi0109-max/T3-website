import { Outlet, useLocation } from 'react-router';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { ScrollProgress } from './ScrollProgress';
import { CustomCursor } from './CustomCursor';
import { PageTransition } from './PageTransition';

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      <main className="flex-1">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
