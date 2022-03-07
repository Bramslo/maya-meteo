import type { GetterTree } from "vuex"
import type { State } from "./state"

export type Getters = {
    getPositionLat(state: State): object
    getPositionLon(state: State): object
    getDefaultWeather(state: State): object
}

export const getters: GetterTree<State, State> & Getters = {
    getPositionLat(state){
        return state.position.Lat
    },
    getPositionLon(state){
        return state.position.Lon
    },
    getDefaultWeather(state){
        return state.default_weather
    }
}