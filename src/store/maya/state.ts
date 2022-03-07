export type ClientPosition = {
    id: Number
    Lon: Number
    Lat: Number
}
export type ClientDefaultWeather = {
    id: Number,
    main: String,
    description: String,
    icon: String
}

export type State = {
    loading: boolean
    position: ClientPosition
    default_weather: ClientDefaultWeather
}

export const state: State = {
    loading:false,
    position: {
        id:0,
        Lon:0,
        Lat:0
    },
    default_weather: {
        id: 0,
        main: '',
        description: '',
        icon: ''
    }
}