import React from 'react'
import 'swiper/css';
import ParallaxCarousel from './ParallaxCarousel';
import { useState } from 'react';
import ManualSelection from './ManualSelection';
import LumsumSelection from './LumsumSelection';
import LumsumCard from './LumsumCard';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import ManualCard from './ManualCard';

const Home = () => {
  const [mode, setMode] = useState(2);
  const [loading, setLoading] = useState('idle');
  const [recommendedPanels, setRecommendedPanels] = useState([])

  const [LumsumReq, setLumsumReq] = useState({
    totalWatt: "",
    usagePerDay: "",
    backUp: "",
    sunlightAvailable: "",
    electricityRate: ""
  })

  const [ManualReq, setManualReq] = useState({
    totalWatt: "",
    backUp: "",
    sunlightAvailable: "",
    electricityRate: ""
  })

  function handleSelectionManual() {
    setMode(0);
  }

  function handleSelectionLumsum() {
    setMode(1);
  }

  const dailyEnergyReq = LumsumReq.totalWatt * LumsumReq.usagePerDay
  const solarPanelSize = dailyEnergyReq / LumsumReq.sunlightAvailable
  const backupLoad = LumsumReq.totalWatt * LumsumReq.backUp
  const batteryAh = backupLoad / 12
  const dailySaving = (dailyEnergyReq / 1000) * LumsumReq.electricityRate

  const calculateReqLumsum = () => {
    const isAnyFieldEmpty = Object.values(LumsumReq).some(
      (value) => value.trim() === ""
    );
    if (isAnyFieldEmpty) {
      toast.warn("Enter values")
    } else {
      setLoading('loading');
      setTimeout(() => {
        setLoading('loaded');
      }, 2000);
    }
  };
  const dailyEnergyReqManual = Number(ManualReq.totalWatt);
  const solarPanelSizeManual = dailyEnergyReqManual / Number(ManualReq.sunlightAvailable);
  const backupLoadManual = dailyEnergyReqManual * Number(ManualReq.backUp);
  const batteryAhManual = backupLoadManual / 12;
  const dailySavingManual = (dailyEnergyReqManual / 1000) * Number(ManualReq.electricityRate);


  const calculateReqManual = () => {
    const isAnyFieldEmpty = Object.values(ManualReq).some(
      (value) => value === "" || value === null || value === undefined || value === NaN
    );
    if (isAnyFieldEmpty) {
      toast.warn("Enter values")
    } else {
      setLoading('loading');
      setTimeout(() => {
        setLoading('loaded');
      }, 2000);
    }
  }

  function reset() {
    setMode(2)
    setLoading('idle')
  }

  return (
      <>
        <div className='my-3 rounded-2xl bg-green-100 p-4'>
          <ParallaxCarousel />
        </div>
        <div className='my-3 rounded-2xl bg-green-100 p-4'>
          <p className='text-2xl font-bold text-green-800 mb-5'>Lets find perfect Solution for you</p>

          <div className='rounded-2xl bg-white p-4 flex flex-col lg:flex-row gap-4 w-full transition-all duration-500'>

            <div
              className={`
              border border-green-700 rounded-2xl
              transition-all duration-500 ease-in-out overflow-hidden
              ${mode === 0 ? 'w-full' : mode === 1 ? 'w-0 h-0 opacity-0 border-0 m-0 p-0' : 'w-full lg:w-1/2 h-48'}
            `}
            >
              {mode === 0 ? (
                <ManualSelection calculateReq={calculateReqManual} setManualReq={setManualReq} ManualReq={ManualReq} />
              ) : (
                <div className="flex justify-center items-center h-48">
                  <button
                    className='border-dashed border-2 text-green-700 font-semibold cursor-pointer p-2 rounded hover:scale-105 duration-200'
                    onClick={handleSelectionManual}
                  >
                    Add appliances manually
                  </button>
                </div>
              )}
              {
                loading === 'idle' ? (
                  <div></div>
                )
                  : loading === 'loading' ? (
                    <div className='my-5 p-4'>
                      <Skeleton variant="text" height={40} animation="wave" />
                    </div>
                  ) : (
                    <ManualCard dailyEnergyReqManual={dailyEnergyReqManual} solarPanelSizeManual={solarPanelSizeManual} backupLoadManual={backupLoadManual} batteryAhManual={batteryAhManual} dailySavingManual={dailySavingManual} />
                  )
              }
            </div>

            <div
              className={`
              border border-green-700 rounded-2xl
              transition-all duration-500 ease-in-out overflow-hidden
              ${mode === 1 ? 'w-full' : mode === 0 ? 'w-0 h-0 opacity-0 border-0 m-0 p-0' : 'w-full lg:w-1/2 h-48'}
            `}
            >
              {mode === 1 ? (
                <LumsumSelection setLumsumReq={setLumsumReq} LumsumReq={LumsumReq} calculateReq={calculateReqLumsum} />
              ) : (
                <div className="flex justify-center items-center h-48">
                  <button
                    className='border-dashed border-2 text-green-700 font-semibold cursor-pointer p-2 rounded hover:scale-105 duration-200'
                    onClick={handleSelectionLumsum}
                    disabled={mode === 1}
                  >
                    Lumsum requirement
                  </button>
                </div>
              )}
              {
                loading === 'idle' ? (
                  <div></div>
                )
                  : loading === 'loading' ? (
                    <div className='my-5 p-4'>
                      <Skeleton variant="text" height={40} animation="wave" />
                    </div>
                  ) : (
                    <LumsumCard dailyEnergyReq={dailyEnergyReq} solarPanelSize={solarPanelSize} backupLoad={backupLoad} batteryAh={batteryAh} dailySaving={dailySaving} />
                  )
              }
            </div>
          </div>

          {mode !== 2 && (
            <div className="mt-4 text-center">
              <button
                className="text-green-700 font-semibold cursor-pointer p-2 rounded"
                onClick={reset}
              >
                Back to options
              </button>
            </div>
          )}
        </div>
        
      </>
  )
}

export default Home