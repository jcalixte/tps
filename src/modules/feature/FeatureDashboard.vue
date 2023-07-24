<script setup lang="ts">
import { useDashboardStore } from '@/modules/dashboard/dashboard-store'

const dashboardStore = useDashboardStore()
</script>

<template>
  <div class="feature-dashboard">
    Dashboard
    <ul>
      <li v-for="dashboard in dashboardStore.dashboards" :key="dashboard.uuid">
        {{ dashboard.analysis.mainStrategy }}: mean lead time
        {{ dashboard.analysis.meanLeadTime }} | worst feature for quality
        {{ dashboard.analysis.worstFeature.qualityIssue }} [{{
          dashboard.analysis.worstFeature.complexity
        }}]
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.feature-dashboard {
  color: var(--background-color);
}
</style>
