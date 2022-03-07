<template>
<div>
    <div class="space-x-3 w-48 items-center justify-between flex ">
        <span>{{posLon}}</span>
        <span class="border-l-2 border-mayaBlue-500">{{posLat}}</span>
    </div>
    <div class="text-white bg-mayaBlue-50 flex flex-col w-48 items-center justify-center mx-auto rounded">
        <span>{{default_weather.main}}</span>
        <span>{{default_weather.description}}</span>
        <img :src="'http://openweathermap.org/img/wn/'+default_weather.icon+'@2x.png'" class="h-full w-full" :alt="default_weather.id">
    </div>
</div>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { ActionTypes } from '@/store/maya/actions'
import { defineComponent , computed, watch, } from 'vue'

export default defineComponent({
    name:'loadClientPosition',
    setup() {
        const store = useStore()

        const posLat = computed(() => store.getters.getPositionLat)
        const posLon = computed(() => store.getters.getPositionLon)
        const default_weather = computed(() => store.getters.getDefaultWeather)

        let open_weather_one_call = {
            lat: Number,
            lon: Number,
            lan:String,
            access: 'ab9d340a1abc29ca632c94fb7daf158b'
        }
        // ab9d340a1abc29ca632c94fb7daf158b
        watch(
            () => posLat.value,
            (newValue, oldValue) => {
                open_weather_one_call = {
                    lat: posLat.value,
                    lon: posLon.value,
                    lan: 'fr',
                    access: 'ab9d340a1abc29ca632c94fb7daf158b'
                }
                store.dispatch(ActionTypes.GetOneCallData,open_weather_one_call)
            },
            { deep: true }
        )
        // watch([posLat, posLon], async ([newposLat, oldposLat],[newposLon, oldposLon]) => {
        //     if((newposLat != oldposLat) && (newposLon != oldposLon) ){
        //         console.log(newposLat,newposLon)
        //         open_weather_one_call = {
        //             lat: newposLat,
        //             lon: newposLon,
        //             access: 'ab9d340a1abc29ca632c94fb7daf158b'
        //         }
        //         store.dispatch(ActionTypes.GetOneCallData,open_weather_one_call)
        //     }
        //     { deep: true }
        // })

        return {posLat,posLon,default_weather}
    },
})
</script>
