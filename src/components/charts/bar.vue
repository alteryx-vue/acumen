<script>

import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
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
        },
        scales: {
            xAxes: [{
              gridLines: { display: false },
              barPercentage: 0.25
            }],
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}

</script>