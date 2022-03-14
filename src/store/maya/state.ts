export type ClientPosition = {
    id: Number
    Lon: Number
    Lat: Number
}
export type ClientDefaultWeather = {
    timezone: String
    dt: Date
    sunrise: Date
    sunset: Date
    uvi: Number
    feels_like: Number
    humidity: Number
    pressure: Number
    weather_id: Number
    weather_description: String,
    visibility: Number
    wind_deg: Number
    wind_gust: Number
    wind_speed: Number
    clouds: Number
}

export type ClientPollution = {
    aqi: Number
    pm10: Number
    pm2_5: Number
    o3: Number
    no2: Number
}


export type ClientTemperature = {
    min: Number
    max: Number
    clouds: Number
}

export type State = {
    loading: boolean
    position: ClientPosition
    default_weather: ClientDefaultWeather
    pollution: ClientPollution,
    // temperature: ClientTemperature
}

export const state: State = {
    loading:false,
    position: {
        id:0,
        Lon:0,
        Lat:0
    },
    default_weather: {
        timezone: '',
        dt: new Date(),
        sunrise: new Date(),
        sunset: new Date(),
        uvi: 0,
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        weather_id: 0,
        weather_description: '',
        visibility: 0,
        wind_deg: 0,
        wind_gust: 0,
        wind_speed: 0,
        clouds: 0
    },
    pollution : {
        aqi: 0,
        pm10: 0,
        pm2_5: 0,
        o3: 0,
        no2: 0
    }
}