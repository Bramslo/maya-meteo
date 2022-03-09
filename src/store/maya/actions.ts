import type { ActionContext, ActionTree } from "vuex"
import { MutationType, type Mutations } from "./mutations"
import type { State } from "./state"

export enum ActionTypes {
    GetClientPosition = 'GET_CLIENT_POSITION',
    GetOneCallData = 'GET_ONE_CALL_DATA',
    GetPollutionData = 'GET_POLLUTION_DATA'
}

type ActionAugments = Omit<
ActionContext<State, State>,
'commit'> & {
  commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.GetClientPosition](context: ActionAugments):void
    [ActionTypes.GetOneCallData](context: ActionAugments):void
    [ActionTypes.GetPollutionData](context: ActionAugments):void
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.GetClientPosition]({commit}){
        commit(MutationType.SetLoading, true)
        // await sleep(1000)
        fetch("https://freegeoip.app/json/")
        .then(async response => {
            const data = await response.json();
            // console.log(data);
            commit(MutationType.SetLoading, false)
            commit(MutationType.SetPosition, { id: Math.floor(Math.random() * 10), Lon: data.longitude, Lat: data.latitude })
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
    async [ActionTypes.GetOneCallData]({commit},collectedData): Promise<void>{
        commit(MutationType.SetLoading, true)
        // await sleep(1000)
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+collectedData.lat+'&lon='+collectedData.lon+'&lang='+collectedData.lan+'&units=metric&appid='+collectedData.access)
        .then(async response => {
            const data = await response.json();
            const current = data.current
            // console.log(weather);
            commit(MutationType.SetLoading, false)
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
                }   
            )
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            commit(MutationType.SetLoading, false)
            console.error("Maya is sorry but we cannot proceed to your request !", error);
        })
    },
    async [ActionTypes.GetPollutionData]({commit},collectedData): Promise<void>{
        commit(MutationType.SetLoading, true)
        // await sleep(1000)
        fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat='+collectedData.lat+'&lon='+collectedData.lon+'&units=metric&appid='+collectedData.access)
        .then(async response => {
            const data = await response.json();
            const list = data.list[0]
            console.log(data)
            commit(MutationType.SetLoading, false)
            commit(MutationType.SetPollution, 
            {
                aqi: list.main.aqi,
                pm10: list.components.pm10,
                pm2_5: list.components.pm2_5,
                o3: list.components.o3,
                no2: list.components.no2
            } 
            )
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