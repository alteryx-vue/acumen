<script>

import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['data','options','height'],
  mounted () {
    this.renderChart(this.data, this.options)
  },
  watch: {
    data: function () {
      // rerender with new data
      this.$data._chart.destroy()
      this.renderChart(this.data, this.options)
    }
  }
}

</script>