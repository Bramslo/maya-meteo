import { createStore, Store as VuexStore, type CommitOptions, type DispatchOptions } from "vuex"
import { actions, type Actions } from "./maya/actions"
import { getters, type Getters } from "./maya/getters"
import { mutations, type Mutations } from "./maya/mutations"
import { state, type State } from "./maya/state"


export const store = createStore<State>({
  state,
  mutations,
  actions,
  getters
})

export function useStore(){
  return store as Store
}

export type Store = Omit< VuexStore <State>,
'getters' | 'commit' | 'dispatch' > & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions >(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters : {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}