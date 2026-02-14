import { Link } from 'react-router';
const t3Logo = '/logo.png';

export function Footer() {
  return (
    <footer className="border-t border-t3-soft-divider bg-t3-off-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-7">
            <img 
              src={t3Logo} 
              alt="T3 The Think Tank - Humane Technology" 
              className="h-12 md:h-14 w-auto mb-6"
            />
            <p className="text-sm text-t3-muted-gray leading-relaxed max-w-md">
              At T3, we believe in a harmonious blend of tradition and innovation. 
              We use technology to enhance the human experience, creating progress 
              that is thoughtful and purposeful.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-5">
            <h4 className="text-sm uppercase tracking-widest mb-6 text-t3-near-black font-medium">
              Navigate
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/work" className="text-t3-muted-gray hover:text-t3-near-black transition-colors">
                  Workstories
                </Link>
              </li>
              <li>
                <Link to="/domains" className="text-t3-muted-gray hover:text-t3-near-black transition-colors">
                  Domains
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-t3-muted-gray hover:text-t3-near-black transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-t3-muted-gray hover:text-t3-near-black transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-t3-soft-divider flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-t3-muted-gray">
            © {new Date().getFullYear()} T3 Technologies. All rights reserved.
          </p>
          <a 
            href="https://www.t-3.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-t3-muted-gray hover:text-t3-near-black transition-colors"
          >
            www.t-3.in
          </a>
        </div>
      </div>
    </footer>
  );
}