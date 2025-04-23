import React, { useState } from 'react';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import BoltIcon from '@mui/icons-material/Bolt';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import panelOptions from '../data/panels';

const LumsumCard = ({
    dailyEnergyReq,
    solarPanelSize,
    backupLoad,
    batteryAh,
    dailySaving,
}) => {
    const [recommendedPanels, setRecommendedPanels] = useState([]);
    const [showRecs, setShowRecs] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);
    dailySaving = dailySaving * 30

    const handleToggleRecommendations = () => {
        if (!hasGenerated) {
            const results = panelOptions.map(panel => {
                const quantity = Math.ceil(solarPanelSize / panel.wattage);
                const totalCost = quantity * panel.price_inr;
                const breakEvenMonths =
                    dailySaving > 0 ? Math.ceil(totalCost / dailySaving) : '∞';

                return {
                    ...panel,
                    quantity,
                    totalCost,
                    breakEvenMonths,
                };
            });

            const sorted = results.sort((a, b) => a.breakEvenMonths - b.breakEvenMonths);
            setRecommendedPanels(sorted.slice(0, 3));
            setHasGenerated(true);
        }

        setShowRecs(prev => !prev);
    };

    return (
        <div className="p-6 my-6 bg-white rounded-2xl">
            <h2 className="text-2xl sm:text-3xl text-green-700 mb-1 font-bold text-center">
                Your Suggested Solar Setup
            </h2>
            <p className="text-green-700 text-center text-sm mb-6">According to your input</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-white">
                <div className="bg-emerald-600 rounded-xl p-5 flex items-center space-x-4">
                    <BoltIcon fontSize="large" />
                    <div>
                        <p className="text-sm font-medium">Daily Energy Required</p>
                        <p className="text-xl font-bold">{dailyEnergyReq.toFixed(2)} Wh</p>
                    </div>
                </div>
                <div className="bg-emerald-600 rounded-xl p-5 flex items-center space-x-4">
                    <SolarPowerIcon fontSize="large" />
                    <div>
                        <p className="text-sm font-medium">Solar Panel Size for 1 hr</p>
                        <p className="text-xl font-bold">{solarPanelSize.toFixed(2)} W</p>
                    </div>
                </div>
                <div className="bg-emerald-600 rounded-xl p-5 flex items-center space-x-4">
                    <BatteryChargingFullIcon fontSize="large" />
                    <div>
                        <p className="text-sm font-medium">Backup Load</p>
                        <p className="text-xl font-bold">{backupLoad.toFixed(2)} Wh</p>
                    </div>
                </div>
                <div className="bg-emerald-600 rounded-xl p-5 flex items-center space-x-4">
                    <BatteryStdIcon fontSize="large" />
                    <div>
                        <p className="text-sm font-medium">Battery Size Required</p>
                        <p className="text-xl font-bold">{batteryAh.toFixed(2)} Ah</p>
                    </div>
                </div>
                <div className="bg-emerald-600 rounded-xl p-5 flex items-center space-x-4">
                    <CurrencyRupeeIcon fontSize="large" />
                    <div>
                        <p className="text-sm font-medium">Estimated Monthly Saving</p>
                        <p className="text-xl font-bold">₹{dailySaving.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center mt-10">
                <Button
                    variant="contained"
                    size="medium"
                    sx={{ bgcolor: "#009966" }}
                    endIcon={<ExpandCircleDownIcon />}
                    onClick={handleToggleRecommendations}
                >
                    {showRecs ? 'Hide Recommendations' : 'Show Recommendations'}
                </Button>
            </div>

            <div className="max-w-7xl mx-auto py-8 px-4">
                {showRecs && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">
                                <span className="inline-block mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                                        <circle cx="12" cy="12" r="5" />
                                        <line x1="12" y1="1" x2="12" y2="3" />
                                        <line x1="12" y1="21" x2="12" y2="23" />
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                        <line x1="1" y1="12" x2="3" y2="12" />
                                        <line x1="21" y1="12" x2="23" y2="12" />
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                    </svg>
                                </span>
                                Recommended Solar Panels
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedPanels.map((panel, index) => (
                                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                    <div className="relative h-48 bg-gray-50">
                                        <img
                                            src={panel.image_url}
                                            alt={panel.name}
                                            className="w-full h-full object-contain p-4"
                                        />
                                        <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            Top Pick
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1">
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">{panel.name}</h3>
                                        <div className="flex items-center mb-3">
                                            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded mr-2">
                                                {panel.type}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {panel.brand}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Quantity Needed</span>
                                                <span className="font-semibold text-gray-800">{panel.quantity} units</span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Total Cost</span>
                                                <span className="font-bold text-gray-800">₹{panel.totalCost.toLocaleString()}</span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Break-even</span>
                                                <span className="font-medium text-emerald-600">{panel.breakEvenMonths} months</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LumsumCard;
