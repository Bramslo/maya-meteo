<template>
    <div class="md:col-span-2 backdrop-blur-sm bg-gradient-to-t from-white/50 to-transparent w-full order-3 object-cover  rounded">
        <p class="font-bold  border-b border-mayaYellow  rounded text-mayaBlue text-sm  py-2">
            Weekly Temperature 
        </p>
        <!-- IMPORT PARTIALS -->
        <MayaChart :chartOptions='chartOptions' :type='type' :height='height' :series='ChartSeries'/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import MayaChart from '@/components/utils/partials/maya-chart.vue'
import type { ChartLegend, ChartSerie} from '@/types'

export default defineComponent({
  props: {
    ChartSeries:{
      type: Object as PropType<ChartSerie[]>,
      required: true
    },
  },
  components:{
    MayaChart
  },
  setup(){
    const height: number = 190
    const type:string = 'bar'
    const chartOptions: ChartLegend = {
      chart: {
        foreColor: "#183963",
        toolbar: {
          autoSelected: "pan",
          show: false
        }
      },
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.75,
          opacityTo: 0.1
        }
      },
      colors: ["#183963","orange"],
      stroke: {
        width: 1.5
      },
      grid: {
        borderColor: "#183963",
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
        size: 1,
        colors: ["#183963","orange"],
        strokeColor: "#183963",
        strokeWidth: 1
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
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ]
      }
    }
    return {
      height,
      type,
      chartOptions
    }
  },
  mounted() {
    this.ChartSeries
  }
})
</script>