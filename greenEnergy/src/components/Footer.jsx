const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    Product:   ['Solar Calculator', 'Panel Finder', 'Savings Report', 'Favourites'],
    Resources: ['How It Works', 'Panel Guide', 'FAQ'],
    Legal:     ['Privacy Policy', 'Terms of Use'],
  };

  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid rgba(5, 150, 105, 0.15)',
        boxShadow: '0 -1px 12px rgba(5, 150, 105, 0.06)',
        marginTop: 'auto',
      }}
    >
      {/* ── Top section ── */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.25)' }}
              >
                ☀️
              </div>
              <span className="text-base font-bold" style={{ color: '#059669' }}>Green Energy</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}>
              India's smart solar planning tool. Calculate requirements, compare panels, and estimate your monthly savings — all in one place.
            </p>
            <div className="flex gap-3">
              {['🐦', '💼', '📸'].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid rgba(5,150,105,0.2)',
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4"
                 style={{ color: '#059669' }}>
                {section}
              </p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      className="text-sm text-left transition-colors duration-150 hover:text-green-600"
                      style={{ color: '#6b7280' }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        className="max-w-7xl mx-auto px-6 py-5"
        style={{ borderTop: '1px solid rgba(5,150,105,0.1)' }}
      >
        <div className="flex flex-wrap justify-center gap-10">
          {[
            { label: 'Panels in Database', value: '50+'     },
            { label: 'Calculation Time',   value: '< 1 min' },
            { label: 'Commission',         value: '₹0'      },
            { label: 'Accuracy',           value: '95%+'    },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-xl font-bold" style={{ color: '#059669' }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="px-6 py-3 text-center"
        style={{ borderTop: '1px solid rgba(5,150,105,0.08)', background: '#f9fffe' }}
      >
        <p className="text-xs" style={{ color: '#9ca3af' }}>
          © {year} Green Energy. Built to accelerate India's solar adoption. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
