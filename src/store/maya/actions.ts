import type { ActionContext, ActionTree } from "vuex"
import { MutationType, type Mutations } from "./mutations"
import type { State } from "./state"

export enum ActionTypes {
    GetClientPosition = 'GET_CLIENT_POSITION',
    GetOneCallData = 'GET_ONE_CALL_DATA'
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
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+collectedData.lat+'&lon='+collectedData.lon+'&lang='+collectedData.lan+'&appid='+collectedData.access)
        .then(async response => {
            const data = await response.json();
            const weather = data.current.weather[0]
            // console.log(weather);
            commit(MutationType.SetLoading, false)
            commit(MutationType.SetDefaultWeather, { id: weather.id, main: weather.main, description: weather.description, icon: weather.icon })
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