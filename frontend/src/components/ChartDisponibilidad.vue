<template>
  <DoughnutChart :chartData="chartData" />
</template>

<script>
import { defineComponent, computed } from 'vue'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  name: 'ChartDisponibilidad',
  components: { DoughnutChart },
  props: {
    disponibilidades: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chartData = computed(() => {
      const disponibilidades = props.disponibilidades
      const disponibilidadesCount = disponibilidades.length
      const disponiblesCount = disponibilidades.filter(d => d.estado === 0).length
      const contratadosCount = disponibilidades.filter(d => d.estado === 1).length

      return {
        labels: ['Disponible', 'Contratado'],
        datasets: [
          {
            data: [disponiblesCount, contratadosCount],
            backgroundColor: ['#96242F', '#75E6B2']
          }
        ]
      }
    })

    return { chartData }
  }
})
</script>
