<script>

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data','height','title'],
  data() {
    return {
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        legend: { 
          display: false
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