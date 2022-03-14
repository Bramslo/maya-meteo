<template>
  <div class="py-6 mx-6 p-4 gap-2 grid md:grid-cols-6 grid-cols-1 items-center max-w-5xl mx-auto rounded md:m-0">
    <Weather :ClientDefaultWeather="default_weather"/>
    <Pollution :ClientPollution="pollution"/>
    <Temperature :ChartSeries="temperature"/>
    <!-- Import global analitic chart  -->
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { ActionTypes } from '@/store/maya/actions'
import Pollution from '@/components/utils/pollution.vue'
import Temperature from '@/components/utils/temperature.vue'
import Weather from '@/components/utils/weather.vue'
import type { open_weather_type, geocoding_type } from '@/types'
import type { ChartSerie } from '@/types'
import { defineComponent , computed, watch} from 'vue'
import type { ClientDefaultWeather, ClientPollution } from '@/store/maya/state'

export default defineComponent({
    name:'loadClientPosition',
    components:{
      Weather,
      Pollution,
      Temperature
    },
    setup() {
        const store = useStore()
        const posLat = computed(() => store.getters.getPositionLat)
        const posLon = computed(() => store.getters.getPositionLon)
        const pollution = computed(() => (store.getters.getPollution as ClientPollution) )
        const default_weather = computed(() => (store.getters.getDefaultWeather as ClientDefaultWeather))

        let open_weather_one_call: open_weather_type = {
            lat: 0,
            lon: 0,
            access: ''
        }

        let geocoding_data: geocoding_type = {
            query: 'Dakar',
            access: '19565f2421a77b6ba75e6c7de8e58038'
        }

        const temperature: ChartSerie[] = [
        {
          name: "Min Temp",
          data: [15, 40, 38, -10, 29, -5, 12]
        },
        {
          name: "Max Temp",
          data: [45, 52, 39, -13, 21, -3, 2]
        }]

        watch(
            () => posLat.value,
            (newValue, oldValue) => {
                open_weather_one_call = {
                    lat: posLat.value,
                    lon: posLon.value,
                    access: 'ab9d340a1abc29ca632c94fb7daf158b'
                }
                store.dispatch(ActionTypes.GetOneCallData,open_weather_one_call)
                store.dispatch(ActionTypes.GetPollutionData,open_weather_one_call)
            },
            { deep: true }
        )

        return {
          posLat,
          posLon,
          default_weather,
          pollution,
          temperature
        }

    },
})
</script>