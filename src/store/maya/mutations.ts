import type { MutationTree } from 'vuex'
import type { ClientDefaultWeather, ClientPollution, ClientPosition, State } from './state'

export enum MutationType {
    SetPosition = 'SET_POSITION',
    SetLoading = 'SET_LOADING',
    SetDefaultWeather = 'SET_DEFAULT_WEATHER',
    SetPollution = 'SET_POLLUTION',
}

export type Mutations = {
    [MutationType.SetPosition](state: State,position: ClientPosition):void
    [MutationType.SetLoading](state: State,value: boolean):void
    [MutationType.SetDefaultWeather](state: State,position: ClientDefaultWeather):void
    [MutationType.SetPollution](state: State,position: ClientPollution):void
}
export const mutations: MutationTree<State> & Mutations = {
    [MutationType.SetPosition](state, position){
        state.position = position
    },
    [MutationType.SetDefaultWeather](state, default_weather){
        state.default_weather = default_weather
    },
    [MutationType.SetPollution](state, pollution){
        state.pollution = pollution
    },
    [MutationType.SetLoading](state, value){
        state.loading = value
    }
}