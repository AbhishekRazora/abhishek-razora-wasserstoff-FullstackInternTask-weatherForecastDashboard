import React from 'react'
import { BiSolidDropletHalf } from 'react-icons/bi'
import { FaThermometerEmpty } from 'react-icons/fa'
import { FiWind } from 'react-icons/fi'
import { GiSunrise, GiSunset } from 'react-icons/gi'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

const TempAndDetails = ({weather:{
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like
},
units
}) => {

    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Real Feel",
            value: `${feels_like.toFixed()}°`
        },
        {
            id: 1,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${humidity.toFixed()}%`
        },
        {
            id: 1,
            Icon: FiWind,
            title: "Wind",
            value: `${speed.toFixed()} ${units==='metric'?"Km/h":"m/s"}`
        },
    ]
    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "Sunrise",
            value: sunrise,
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "Sunset",
            value: sunset
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: `${temp_max.toFixed()}°`
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "Low",
            value: `${temp_min.toFixed()}°`
        },
    ]
    return (
        <div>
            <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
                <p>{details}</p>
            </div>
            <div className='flex flex-row items-center justify-between py-3'>
                <img src={icon} alt="" className='w-20' />
                <p className='text-5xl'>{`${temp.toFixed()}°${units==='metric'?"C":"F"}`}</p>

                <div className='flex flex-col space-y-3 items-start'>
                    {verticalDetails.map(detail => (
                        <div key={detail.title} className='flex font-light text-sm items-center justify-center'>
                            <detail.Icon key={detail.title} size={18} className='mr-1' />
                            {detail.title}: <span className='font-medium ml-1'>{detail.value}</span>
                        </div>
                    ))}

                </div>


            </div>

            <div className='flex flex-row items-center justify-center space-x-10 text-sm py-3'>
                {
                    horizontalDetails.map(detail=>(
                        <div key={detail.title} className='flex flex-row items-center'>
                             <detail.Icon key={detail.title} size={18} className='mr-1' />
                             <p className='font-light ml-1'>{detail.title}: <span className='font-medium ml-1'>{detail.value}</span></p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TempAndDetails
