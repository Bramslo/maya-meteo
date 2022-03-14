<template>
    <apexchart
    class="flex items-center justify-center"
        :height="height"
        :type="type"
        :options="chartOptions"
        :series="series"
    ></apexchart>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { ChartLegend, ChartSerie} from '@/types'

export default defineComponent({
  props: {
    chartOptions:{
        type: Object as PropType<ChartLegend>,
        required: true
    },
    series:{
        type: Object as PropType<ChartSerie[]>,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    height:{
        type: Number,
        required: true
    }
  },
  mounted() {
    this.chartOptions,
    this.series,
    this.type,
    this.height
  }
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
  margin-top: -25px;
  margin-bottom: -25px;
  position: relative;
}
.link {
  position: absolute;
  bottom: 7px;
  right: 13px;
  z-index: 10;
  color: rgb(51, 3, 0);
  font-size: 12px;
  text-decoration: none;
  font-family: Helvetica, Arial;
}
</style>