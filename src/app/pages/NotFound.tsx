import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { Button } from '../components/Button';

export function NotFound() {
  return (
    <div className="bg-t3-off-white min-h-[70vh] flex items-center justify-center">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 text-center">
        <div className="text-8xl md:text-9xl font-heading font-bold text-t3-soft-divider mb-8">
          404
        </div>
        <h1 className="text-4xl md:text-5xl font-heading tracking-tight mb-6">
          Page not found
        </h1>
        <p className="text-xl text-t3-muted-gray mb-12 max-w-2xl mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button to="/" variant="primary">
          <Home size={18} className="mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
