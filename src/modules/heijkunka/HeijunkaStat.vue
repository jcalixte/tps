<script setup lang="ts">
import { useHeijunkaStore } from '@/modules/heijkunka/heijunka-store'
import { ProductType } from '@/modules/heijkunka/types/product-type'
import { onMounted, ref, VNodeRef, watch } from 'vue'
import chartXkcd from 'chart.xkcd'
import { storeToRefs } from 'pinia'

const svgElement = ref<VNodeRef | null>(null)
const products: ProductType[] = ['shirt', 'jeans', 'shoes', 'hat']

const heijunkaStore = useHeijunkaStore()
const { orders, inventory } = storeToRefs(heijunkaStore)

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
      labels: products.map((p) => [`${p} ordered`, `${p} made`]).flat(),
      datasets: [
        {
          data: products
            .map((product) => [
              orders.value.filter((o) => o.product === product).length,
              inventory.value[product]
            ])
            .flat()
        }
      ]
    },
    options: {
      showLegend: true,
      fontFamily: 'Noto Serif',
      dataColors: [
        '#55efc4',
        '#00b894',
        '#81ecec',
        '#00cec9',
        '#74b9ff',
        '#0984e3',
        '#a29bfe',
        '#6c5ce7'
      ],
      strokeColor: 'var(--primary-color)'
    }
  }
  new chartXkcd.Bar(svgElement.value, config)
}

onMounted(renderChart)
watch([orders, inventory], renderChart, { deep: true })
</script>

<template>
  <div class="heijunka-stat">
    <svg ref="svgElement"></svg>
  </div>
</template>

<style scoped lang="scss">
.heijunka-stat {
  width: 100%;
}
</style>
