import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavourite } from '../features/favrouiteSlice';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Favrouite = () => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite.items);

  if (favourites.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6"
          style={{ background: '#f0fdf4', border: '1px solid rgba(5,150,105,0.2)' }}
        >
          ♡
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#064e3b' }}>
          No favourites yet
        </h2>
        <p className="text-sm max-w-sm" style={{ color: '#6b7280' }}>
          Run a solar calculation, then click{' '}
          <span style={{ color: '#059669', fontWeight: 600 }}>♡ Add to Favourites</span>{' '}
          on any recommended panel to save it here.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '48px 24px 80px' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: '#059669' }}
          >
            Saved Panels
          </p>
          <h1 className="text-3xl font-bold" style={{ color: '#064e3b' }}>
            Your Favourites
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
            {favourites.length} panel{favourites.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        {/* Panel grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((panel, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden flex flex-col"
              style={{
                border: '1px solid rgba(5,150,105,0.15)',
                boxShadow: '0 2px 12px rgba(5,150,105,0.07)',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseOver={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(5,150,105,0.14)')}
              onMouseOut={e  => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(5,150,105,0.07)')}
            >
              {/* Image */}
              <div className="relative h-48" style={{ background: '#f9fafb' }}>
                <img
                  src={panel.image_url}
                  alt={panel.name}
                  className="w-full h-full object-contain p-4"
                />
                <div
                  className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background: '#f0fdf4', color: '#059669', border: '1px solid rgba(5,150,105,0.25)' }}
                >
                  {panel.type}
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex-1">
                <h3 className="text-base font-bold mb-1" style={{ color: '#111827' }}>
                  {panel.name}
                </h3>
                <p className="text-xs mb-3" style={{ color: '#9ca3af' }}>{panel.brand}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm" style={{ color: '#6b7280' }}>
                      <SolarPowerIcon sx={{ fontSize: 16, color: '#059669' }} />
                      Wattage
                    </span>
                    <span className="font-semibold text-sm" style={{ color: '#111827' }}>
                      {panel.wattage}W
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm" style={{ color: '#6b7280' }}>
                      <CurrencyRupeeIcon sx={{ fontSize: 16, color: '#059669' }} />
                      Price
                    </span>
                    <span className="font-semibold text-sm" style={{ color: '#111827' }}>
                      ₹{panel.price_inr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#6b7280' }}>Efficiency</span>
                    <span className="font-semibold text-sm" style={{ color: '#059669' }}>
                      {panel.efficiency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#6b7280' }}>Lifespan</span>
                    <span className="font-semibold text-sm" style={{ color: '#111827' }}>
                      {panel.lifespan_years} years
                    </span>
                  </div>
                </div>

                <p className="text-xs mt-3 leading-relaxed" style={{ color: '#9ca3af' }}>
                  {panel.ideal_use}
                </p>
              </div>

              {/* Actions */}
              <div
                className="p-4 flex flex-col gap-2"
                style={{ borderTop: '1px solid rgba(5,150,105,0.1)' }}
              >
                <a href={panel.buyLink} target="_blank" rel="noreferrer">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition duration-150">
                    Buy Now
                  </button>
                </a>
                <button
                  onClick={() => dispatch(removeFavourite(panel.name))}
                  className="w-full flex items-center justify-center gap-1 hover:bg-red-50 font-medium py-2 rounded-lg transition duration-150"
                  style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favrouite;
