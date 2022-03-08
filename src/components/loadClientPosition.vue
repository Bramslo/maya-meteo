<template>
<div>
  
  <card class="grid grid-cols-6 align-center max-w-5xl h-48 rounded-lg sm:rounded-none md:m-0 m-2  bg-mayaBlue shadow shadow-2xl">
    
    <div class="col-span-5 ml-5">
      
      <h2 class="font-bold text-3xl text-white mt-8"> 
        {{default_weather.description}}
      </h2>
      
      <p class="font-light text-white text-sm mt-5">
        Temperature
      </p>
      
    </div>
    
    <div class="col-span-1 order-first  relative">
      <img :src="'http://openweathermap.org/img/wn/'+default_weather.icon+'@2x.png'"  class="absolute"/>
    </div>
    
  </card>
  
</div>
<!-- <div class="my-5 text-white bg-mayaBlue flex flex-col max-w-xs items-center justify-center mx-auto rounded shadow-3xl shadow-mayaBlue-50">
        <div class="pt-2 relative mx-auto text-gray-600">
            <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search" name="search" placeholder="Type a city name">
            <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
            <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                width="512px" height="512px">
                <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
            </button>
        </div>

        <span>{{default_weather.main}}</span>
        <span>{{default_weather.description}}</span>
        <img :src="'http://openweathermap.org/img/wn/'+default_weather.icon+'@2x.png'" class="h-full w-full" :alt="default_weather.id">
</div> -->
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
