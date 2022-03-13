<template>
  <div>
    
    <div class="py-5 px-2 gap-2 grid md:grid-cols-6 grid-cols-1 align-center max-w-5xl rounded-lg sm:rounded-none md:m-0 m-2  bg-mayaBlue shadow-mayaBlue-50 shadow-2xl">
      
      <Weather :ClientDefaultWeather="default_weather"/>
      <Pollution :ClientPollution="pollution"/>
    </div>
    
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { ActionTypes } from '@/store/maya/actions'
import Pollution from '@/components/utils/pollution.vue'
import Weather from '@/components/utils/weather.vue'
import type { open_weather_type, position_stack_type } from '@/types'
import { defineComponent , computed, watch, ref, onMounted} from 'vue'
import type { ClientDefaultWeather, ClientPollution } from '@/store/maya/state'

export default defineComponent({
    name:'loadClientPosition',
    components:{
      Pollution,
      Weather
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

        let position_stack: position_stack_type = {
            query: 'Dakar',
            access: '19565f2421a77b6ba75e6c7de8e58038'
        }

        // MOVE TO MAYA CHART
        const chartOptions = {
          chart: {
            height: 110,
            type: 'area',
            foreColor: "#ccc",
            toolbar: {
              autoSelected: "pan",
              show: false
            }
          },
          fill: {
            gradient: {
              enabled: true,
              opacityFrom: 0.75,
              opacityTo: 0
            }
          },
          colors: ["#ebe939"],
          stroke: {
            width: 1
          },
          grid: {
            borderColor: "#555",
            clipMarkers: false,
            yaxis: {
              show:false,
              lines: {
                show: false,
              }
            },
                xaxis: {
              show:false,
              lines: {
                show: false,
              }
            }
          },
          markers: {
            size: 5,
            colors: ["#183963"],
            strokeColor: "#ebe939",
            strokeWidth: 3
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          yaxis: {
            show:false
          },
          xaxis: {
            show:false,
            labels: {
              show: false
            },
            categories: [
              "01 Jan",
              "02 Jan",
              "03 Jan",
              "04 Jan",
              "05 Jan",
              "06 Jan",
              "07 Jan"
            ]
          }
        }

        const series = [
          {
            name: "Temperature",
            data: [45, 52, 38, 10, 19, 23, 2]
          }
        ]

        // ab9d340a1abc29ca632c94fb7daf158b
        store.dispatch(ActionTypes.GetSearchData,position_stack)

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
          chartOptions,
          series
      }

    },
})
</script>
<style scoped>
.apexcharts-canvas {
  position: relative;
  background: #000524;
  border: 1px solid #000;
  box-shadow: 0 22px 35px -16px rgba(0, 0, 0, 0.71);
  max-width: 850px;
  margin: 0 auto;
}

.vue-apexcharts {
  position: relative;
}

.link {
  position: absolute;
  bottom: 7px;
  right: 13px;
  z-index: 10;
  color: #ccc;
  font-size: 12px;
  text-decoration: none;
  font-family: Helvetica, Arial;
}
</style>
