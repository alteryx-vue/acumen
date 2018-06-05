<script>

import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['data','height','title'],
  data() {
    return {
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        legend: { 
          position: 'left'
        },
        title: {
          display: true,
          text: this.title
        },
        animation: {
          animateScale: true
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}

</script>