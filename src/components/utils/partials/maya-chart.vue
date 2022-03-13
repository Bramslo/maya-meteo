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
        type: Object as PropType<ChartSerie>,
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