import React from 'react'
import TextField from '@mui/material/TextField';
import BoltIcon from '@mui/icons-material/Bolt';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import HistoryIcon from '@mui/icons-material/History';
import SunnyIcon from '@mui/icons-material/Sunny';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const LumsumSelection = ({ LumsumReq, setLumsumReq, calculateReq }) => {
    const handelWatt = (newWatt) => {
        setLumsumReq({
            ...LumsumReq,
            totalWatt: newWatt
        })
    }
    const handelUsage = (newUsage) => {
        setLumsumReq({
            ...LumsumReq,
            usagePerDay: newUsage
        })
    }
    const handelBackup = (newBackup) => {
        setLumsumReq({
            ...LumsumReq,
            backUp: newBackup
        })
    }
    const handelSunlight = (newSunlight) => {
        setLumsumReq({
            ...LumsumReq,
            sunlightAvailable: newSunlight
        })
    }
    const handelRate = (newRate) => {
        setLumsumReq({
            ...LumsumReq,
            electricityRate: newRate
        })
    }

    return (
        <>
            <div className='p-2 md:p-4'>
                <p className='text-xl md:text-2xl font-bold text-green-800 mb-2 md:mb-3'>
                    Add the lumsum amount of energy requirement
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-1 md:p-2">
                    <div className="col-span-1">
                        <p className='text-base md:text-lg text-green-700 font-semibold flex items-center'>
                            Total Wattage Load <BoltIcon className="ml-1" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                        </p>
                        <p className='text-xs md:text-sm mb-1 md:mb-2 text-green-700'>Total power used by all appliances together</p>
                        <TextField
                            label="in W"
                            variant="outlined"
                            color="success"
                            type='number'
                            required
                            autoComplete='off'
                            value={LumsumReq.totalWatt}
                            onChange={(e) => handelWatt(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
                        />
                    </div>
                    <div className="col-span-1">
                        <p className='text-base md:text-lg text-green-700 font-semibold flex items-center'>
                            Usage Hours per Day <DataUsageIcon className="ml-1" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                        </p>
                        <p className='text-xs md:text-sm mb-1 md:mb-2 text-green-700'>For how long user runs all this load</p>
                        <TextField
                            label="in hrs"
                            variant="outlined"
                            color="success"
                            type='number'
                            required
                            autoComplete='off'
                            value={LumsumReq.usagePerDay}
                            onChange={(e) => handelUsage(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
                        />
                    </div>
                    <div className="col-span-1">
                        <p className='text-base md:text-lg text-green-700 font-semibold flex items-center'>
                            Backup Hours Needed <HistoryIcon className="ml-1" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                        </p>
                        <p className='text-xs md:text-sm mb-1 md:mb-2 text-green-700'>How long backup should last</p>
                        <TextField
                            label="in hrs"
                            variant="outlined"
                            color="success"
                            type='number'
                            required
                            value={LumsumReq.backUp}
                            autoComplete='off'
                            onChange={(e) => handelBackup(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
                        />
                    </div>
                    <div className="col-span-1 mt-2">
                        <p className='text-base md:text-lg text-green-700 font-semibold flex items-center'>
                            Sunlight Hours Available <SunnyIcon className="ml-1" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                        </p>
                        <p className='text-xs md:text-sm mb-1 md:mb-2 text-green-700'>Avg. effective sun hours in user's location</p>
                        <TextField
                            label="in hrs"
                            variant="outlined"
                            color="success"
                            type='number'
                            required
                            value={LumsumReq.sunlightAvailable}
                            autoComplete='off'
                            onChange={(e) => handelSunlight(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
                        />
                    </div>
                    <div className="col-span-1 mt-2">
                        <p className='text-base md:text-lg text-green-700 font-semibold flex items-center'>
                            Electricity Unit Rate <CurrencyRupeeIcon className="ml-1" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                        </p>
                        <p className='text-xs md:text-sm mb-1 md:mb-2 text-green-700'>To calculate savings</p>
                        <TextField
                            label="in ₹"
                            variant="outlined"
                            color="success"
                            type='number'
                            required
                            value={LumsumReq.electricityRate}
                            autoComplete='off'
                            onChange={(e) => handelRate(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
                        />
                    </div>
                    <div className="col-span-1 mt-2 flex justify-start items-end">
                        <Button
                            fullWidth
                            variant="outlined"
                            size='medium'
                            color='success'
                            endIcon={<SendIcon />}
                            sx={{
                                fontWeight: "semibold",
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                                padding: { xs: '6px 12px', md: '8px 16px' }
                            }}
                            onClick={calculateReq}
                        >
                            Calculate
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LumsumSelection