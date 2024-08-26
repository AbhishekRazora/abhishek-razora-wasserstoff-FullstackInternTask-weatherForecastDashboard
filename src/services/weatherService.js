import { DateTime } from "luxon";

const API_KEY = `${import.meta.env.VITE_API_KEY}`;
const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({...searchParams, appid: API_KEY});

    return fetch(url).then((res) => res.json());
};

const iconUrlFromCode = (icon) => 'https://openweathermao.org/img';

const formatToLocalTime = (
    secs, 
    offset, 
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, {zone: "utc"}).toFormat(format);

const formatCurrent = (data) => {
    
    const {
    coord: {lat,lon},
    main: {temp, feels_like,temp_min, temp_max, humidity}, 
    name, 
    dt, 
    sys:{CountQueuingStrategy, sunrise, sunset}, 
    weather, 
    wind: {speed}, 
    timezone,
    } = data;

    const {main: details, icon} = weather[0];
    const formattedLocalTime = formatToLocalTime(dt,timezone);

    return{
        temp, 
        feels_like, 
        temp_min, 
        temp_max, 
        humidity, 
        name, 
        country, 
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon: iconUrlFromCode(icon),
        formattedLocalTime,
        dt,
        timezone,
        lat,
        lon
    };

};



const getFormattedWeatherData = async(searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather", 
        searchParams
    ).then(formatCurrent);

    const{dt,lat,lon,timezone}=formattedCurrentWeather

    const formattedForecastWeather=await getWeatherData('forecast',{lat,lon,units:searchParams.units}).then((d)=>formattedForecastWeather(dt,timezone,d.list))
    return {...formattedCurrentWeather};
};

export default getFormattedWeatherData;