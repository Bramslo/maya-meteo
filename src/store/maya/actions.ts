import type { ActionContext, ActionTree } from "vuex"
import { MutationType, type Mutations } from "./mutations"
import type { State } from "./state"
import type { open_weather_type, position_stack_type } from "@/types"

// ACTION TYPES
export enum ActionTypes {
    GetClientPosition = 'GET_CLIENT_POSITION',
    GetOneCallData = 'GET_ONE_CALL_DATA',
    GetPollutionData = 'GET_POLLUTION_DATA',
    GetSearchData = 'GET_SEARCH_DATA'
}

//LOCAL CONTAINERS
const FREE_GEO_IP_API_URL = "https://freegeoip.app/json/"
const OPEN_WEATHER_ONE_CALL_API_URL = "https://api.openweathermap.org/data/2.5/onecall"
const OPEN_WEATHER_AIR_POLLUTION_API_URL = "http://api.openweathermap.org/data/2.5/air_pollution"
const POSITION_STACK_API_URL = "http://api.positionstack.com/v1/forward"

const OPEN_WEATHER_API_KEY = '..'
const POSITION_STACK_API_KEY = ".."

type ActionAugments = Omit<
ActionContext<State, State>,
'commit'> & {
  commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.GetClientPosition](context: ActionAugments):void
    [ActionTypes.GetOneCallData](context: ActionAugments,collectedData:open_weather_type):void
    [ActionTypes.GetPollutionData](context: ActionAugments,collectedData:open_weather_type):void
    [ActionTypes.GetSearchData](context: ActionAugments,collectedData:position_stack_type):void
}

export const actions: ActionTree<State, State> & Actions = {

    // FETCHING CLIENT CURRENT LOCATION BASED ON IP 
    async [ActionTypes.GetClientPosition]({commit}){
        commit(MutationType.SetLoading, true)
        fetch(FREE_GEO_IP_API_URL)
        .then(async response => {
            const data = await response.json();
            commit(MutationType.SetLoading, false)
            commit(MutationType.SetPosition, 
            { 
                id: Math.floor(Math.random() * 10),
                Lon: data.longitude, Lat: data.latitude 
            })
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            commit(MutationType.SetLoading, false)
            console.error("Maya is sorry for being unable to find your location !", error);
        })
    },

    // FETCHING WEATHER DATA TO OPEN WEATHER FOR THE COLLECTED DATA FROM THE CLIENT
    async [ActionTypes.GetOneCallData]({commit},collectedData){
        commit(MutationType.SetLoading, true)

        fetch(OPEN_WEATHER_ONE_CALL_API_URL 
            + '?lat=' + collectedData.lat 
            + '&lon=' +collectedData.lon
            +'&units=metric&appid=' +collectedData.access
        ).then(async response => {
            const data = await response.json();
            const current = data.current
            commit(MutationType.SetLoading, false)

            // COMMITING THE CURRENT FORECAST DATA FROM THE RESPONSE  
            commit(MutationType.SetDefaultWeather, 
            {
                timezone: data.timezone,
                dt: current.dt,
                sunrise: current.sunrise,
                sunset: current.sunset,
                uvi: current.uvi,
                feels_like: current.feels_like,
                humidity: current.humidity,
                pressure: current.pressure,
                weather_id: current.weather[0].id,
                weather_description: current.weather[0].description,
                visibility: current.visibility,
                wind_deg: current.wind_deg,
                wind_gust: current.wind_gust,
                wind_speed: current.wind_speed,
                clouds: current.clouds 
            })
            // COMMITING THE DAILY 7 DAYS FORECAST DATA FROM THE RESPONSE
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            commit(MutationType.SetLoading, false)
            console.error("Maya is sorry but we cannot find the weather !", error);
        })
    },

     // FETCHING AIR POLLUTION DATA TO OPEN WEATHER FOR THE COLLECTED DATA FROM THE CLIENT
    async [ActionTypes.GetPollutionData]({commit},collectedData){
        commit(MutationType.SetLoading, true)
        fetch(OPEN_WEATHER_AIR_POLLUTION_API_URL
            + '?lat=' + collectedData.lat 
            + '&lon=' +collectedData.lon
            +'&units=metric&appid=' +collectedData.access
        ).then(async response => {
            const data = await response.json();
            const list = data.list[0]
            commit(MutationType.SetLoading, false)
            commit(MutationType.SetPollution, 
            {
                aqi: list.main.aqi,
                pm10: list.components.pm10,
                pm2_5: list.components.pm2_5,
                o3: list.components.o3,
                no2: list.components.no2
            })
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            commit(MutationType.SetLoading, false)
            console.error("Maya is sorry but we cannot find the air pollution !", error);
        })
    },

     // FETCHING A PLACE INFORMATION FRON POSITION STACK FOR THE COLLECTED DATA FROM THE CLIENT
    async [ActionTypes.GetSearchData]({commit},collectedData){
        commit(MutationType.SetLoading, true)

        fetch(POSITION_STACK_API_URL 
            + '?access_key=' + collectedData.access
            +'&query='+ collectedData.query
        ).then(async response => {
            const data = await response.json();
            // const list = data.list[0]
            console.log(data.data[0])
            // commit(MutationType.SetLoading, false)
            // commit(MutationType.SetPollution, 
            // {
            //     continent: list.main.aqi,
            //     country: list.components.pm10,
            //     latitute: list.components.pm2_5,
            //     longitude: list.components.o3,
            //     name: list.components.no2,
            // type
            // } 
            // )
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            commit(MutationType.SetLoading, false)
            console.error("Maya is sorry but we cannot proceed to your request !", error);
        })
    }
}