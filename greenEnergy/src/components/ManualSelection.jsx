import React from 'react'
import { Button, MenuItem, Modal, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import SunnyIcon from '@mui/icons-material/Sunny';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import ContactlessIcon from '@mui/icons-material/Contactless';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ManualSelection = ({ calculateReq, setManualReq, ManualReq }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [Backuphrs, setBackuphrs] = useState(null);
  const [SunlightAvliable, setSunlightAvliable] = useState(null);
  const [ElectricityUnitRate, setElectricityUnitRate] = useState(null)
  const handleOpen = () => setModalOpen(true);

  const handleClose = () => {
    setModalOpen(false);
  };

  const [Appliances, setAppliances] = useState([])

  const [CurrentAppliance, setCurrentAppliance] = useState({
    name: "",
    power: null,
    qty: null,
    usagePerDay: null,
  })

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  const appliances = [
    {
      "name": "Ceiling Fan",
    },
    {
      "name": "LED Bulb (9W/12W)",
    },
    {
      "name": "Tube Light (LED/CFL)",
    },
    {
      "name": "TV (LED/LCD)",
    },
    {
      "name": "Refrigerator",
    },
    {
      "name": "Air Conditioner (AC)",
    },
    {
      "name": "Washing Machine",
    },
    {
      "name": "Mixer/Grinder",
    },
    {
      "name": "Water Pump",
    },
    {
      "name": "Electric Iron",
    },
    {
      "name": "Geyser",
    },
    {
      "name": "Laptop/PC",
    },
    {
      "name": "Mobile Charger",
    },
    {
      "name": "WiFi Router",
    },
    {
      "name": "Microwave Oven",
    },

  ]

  const handelName = (name) => {
    setCurrentAppliance({
      ...CurrentAppliance,
      name: name
    })
  }


  const handelPower = (power) => {
    setCurrentAppliance({
      ...CurrentAppliance,
      power: power
    })
  }

  const handelQty = (qty) => {
    setCurrentAppliance({
      ...CurrentAppliance,
      qty: qty
    })
  }

  const handelUsagePerDay = (usage) => {
    setCurrentAppliance({
      ...CurrentAppliance,
      usagePerDay: usage
    })
  }

  function addAppliance() {
    setAppliances([...Appliances, {
      ...CurrentAppliance,
    }])

    setCurrentAppliance({
      name: "",
      power: null,
      qty: null,
      usagePerDay: null
    })
    handleClose()
  }

  const removeAppliance = (index) => {
    const newAppliances = Appliances.filter((_, i) => i !== index);
    setAppliances(newAppliances);
  };

  const calculateRequirements = () => {
    const totalPower = Appliances.reduce((acc, app) => {
      return acc + (app.qty * app.power * app.usagePerDay);
    }, 0);

    setManualReq({
      ...ManualReq,
      totalWatt: totalPower,
      backUp: Backuphrs,
      sunlightAvailable: SunlightAvliable,
      electricityRate: ElectricityUnitRate
    });
    calculateReq()
  };

  console.log(Appliances);

  return (
    <div className='p-2 md:p-4'>
      <p className='text-xl md:text-2xl font-bold text-green-800 mb-2 md:mb-3'>
        Add appliances to energy requirement
      </p>
      <p className='text-base md:text-lg text-green-700 font-semibold flex items-center'>
        Add appliance  <ContactlessIcon className="ml-1" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
      </p>
      <p className='text-xs md:text-sm mb-1 md:mb-2 text-green-700'>Add appliance in your home</p>
      {Appliances.map((appliance, index) => (
        <div key={index} className="grid grid-cols-5 gap-1 mb-2 p-2 shadow bg-green-50">
          {/* Name */}
          <div className="col-span-1 text-green-600 font-medium flex justify-center items-center">
            <p>{appliance.name}</p>
          </div>

          {/* Power */}
          <div className="col-span-1">
            <TextField
              size="small"
              type="number"
              label="Power (W)"
              color="success"
              value={appliance.power}
              onChange={(e) => {
                const newAppliances = [...Appliances];
                newAppliances[index].power = e.target.value;
                setAppliances(newAppliances);
              }}
              fullWidth
              required
              autoComplete='off'
              sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
            />
          </div>

          {/* Quantity */}
          <div className="col-span-1">
            <TextField
              size="small"
              type="number"
              label="Qty"
              color="success"
              value={appliance.qty}
              onChange={(e) => {
                const newAppliances = [...Appliances];
                newAppliances[index].qty = e.target.value;
                setAppliances(newAppliances);
              }}
              fullWidth
              required
              autoComplete='off'
              sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
            />
          </div>

          {/* Usage Per Day */}
          <div className="col-span-1">
            <TextField
              variant="outlined"
              size="small"
              type="number"
              label="Hrs/day"
              color="success"
              value={appliance.usagePerDay}
              onChange={(e) => {
                const newAppliances = [...Appliances];
                newAppliances[index].usagePerDay = e.target.value;
                setAppliances(newAppliances);
              }}
              fullWidth
              required
              autoComplete='off'
              sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
            />
          </div>

          {/* Delete Button */}
          <div className="col-span-1 flex justify-center items-center">
            <DeleteIcon
              onClick={() => removeAppliance(index)}
              className="text-gray-500 hover:text-red-900 cursor-pointer ml-2"
            />
          </div>
        </div>
      ))}


      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 p-1 md:p-2'>
        <Button color='success' endIcon={<AddIcon />} sx={{ width: 250 }} onClick={handleOpen}>Add appliances</Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-1 md:p-2'>
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
            fullWidth
            size="small"
            required
            autoComplete='off'
            sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
            value={CurrentAppliance.backupHrsNeeded}
            onChange={(e) => (setBackuphrs(e.target.value))}
          />
        </div>
        <div className="col-span-1">
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
            autoComplete='off'
            fullWidth
            size="small"
            sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
            value={CurrentAppliance.sunlightAvliablity}
            onChange={(e) => (setSunlightAvliable(e.target.value))}
          />
        </div>
        <div className="col-span-1">
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
            autoComplete='off'
            fullWidth
            size="small"
            sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.875rem', md: '1rem' } } }}
            value={CurrentAppliance.electricityUnitRate}
            onChange={(e) => (setElectricityUnitRate(e.target.value))}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center my-5 p-2">
          <Button
            fullWidth
            variant="outlined"
            size='medium'
            color='success'
            onClick={calculateRequirements}
            endIcon={<SendIcon />}
            sx={{
              fontWeight: "semibold",
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              padding: { xs: '6px 12px', md: '8px 16px' }
            }}
          >
            Calculate
          </Button>
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleClose}>
        <div style={modalStyle}>
          <div className='bg-white p-4 rounded w-128 space-y-3'>

            <p className='text-base md:text-lg text-green-700 font-semibold flex items-center'>
              Add Appliance
            </p>
            <Stack spacing={2}>
              <TextField
                select
                label="Select Appliance"
                variant="outlined"
                color="success"
                required
                fullWidth
                size="small"
                value={CurrentAppliance.name}
                onChange={(e) => (handelName(e.target.value))}
              >
                {
                  appliances.map((appliance) => (
                    <MenuItem key={appliance.name} value={appliance.name}>
                      {appliance.name}
                    </MenuItem>
                  ))
                }
              </TextField>

              <TextField
                label="Power (Watts)"
                type="number"
                variant="outlined"
                color="success"
                required
                fullWidth
                size="small"
                value={CurrentAppliance.power}
                onChange={(e) => (handelPower(e.target.value))}
              />

              <TextField
                label="Quantity"
                type="number"
                variant="outlined"
                color="success"
                required
                fullWidth
                size="small"
                value={CurrentAppliance.qty}
                onChange={(e) => (handelQty(e.target.value))}
              />

              {/* Usage per Day */}
              <TextField
                label="Usage per Day (Hours)"
                type="number"
                variant="outlined"
                color="success"
                required
                fullWidth
                size="small"
                value={CurrentAppliance.usagePerDay}
                onChange={(e) => (handelUsagePerDay(e.target.value))}
              />

              {/* Add Button */}
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={addAppliance}
              >
                Add Appliance
              </Button>
            </Stack>
          </div>
        </div>
      </Modal>
    </div >
  )
}

export default ManualSelection