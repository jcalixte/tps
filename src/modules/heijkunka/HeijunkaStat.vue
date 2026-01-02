<script setup lang="ts">
import { useHeijunkaStore } from '@/modules/heijkunka/heijunka-store'
import { ProductType } from '@/modules/heijkunka/types/product-type'
import { onMounted, ref, VNodeRef, watch } from 'vue'
import chartXkcd from 'chart.xkcd'
import { storeToRefs } from 'pinia'

const svgElement = ref<VNodeRef | null>(null)
const products: ProductType[] = ['shirt', 'jeans', 'shoes', 'hat']

const heijunkaStore = useHeijunkaStore()
const { orders } = storeToRefs(heijunkaStore)

const renderChart = () => {
  if (orders.value.length === 0) {
    return
  }

  if (svgElement.value) {
    svgElement.value.innerHTML = ''
  }

  const config = {
    title: `Orders made`,
    xLabel: 'Products',
    yLabel: '# of orders',
    data: {
      labels: products,
      datasets: [
        {
          data: products.map(
            (product) =>
              orders.value.filter((o) => o.product === product).length
          )
        }
      ]
    },
    options: {
      showLegend: true,
      fontFamily: 'Noto Serif'
    }
  }
  new chartXkcd.Bar(svgElement.value, config)
}

onMounted(renderChart)
watch(orders, renderChart, { deep: true })
</script>

<template>
  <div class="heijunka-stat">
    <svg ref="svgElement"></svg>
  </div>
</template>

<!-- 
<style scoped lang="scss">
.heijunka-stat {
}
</style>
-->
