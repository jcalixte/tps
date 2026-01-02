import {
  NUMBER_OF_DAYS,
  NUMBER_OF_HOURS_PER_DAY
} from '@/modules/heijkunka/heijunka-config'
import { ProductType } from '@/modules/heijkunka/types/product-type'
import { getMean, pickRandomElement } from '@/utils'
import { defineStore } from 'pinia'

type Order = {
  status: 'requested' | 'received'
  leadTime: number
  product: ProductType
}

type Inventory = {
  shirt: number
  jeans: number
  shoes: number
  hat: number
}

type HeijunkaState = {
  money: number
  inventory: Inventory
  orders: Order[]
  planning: ProductType[]
  validatedPlanning: boolean
  meta: {
    currentHour: number
  }
}

const getInventoryByProduct = (
  product: ProductType,
  planning: ProductType[],
  currentDay: number
): number => {
  const inventory = planning.filter(
    (p, index) =>
      index >= (currentDay % NUMBER_OF_DAYS) * NUMBER_OF_HOURS_PER_DAY &&
      index < ((currentDay % NUMBER_OF_DAYS) + 1) * NUMBER_OF_HOURS_PER_DAY &&
      p === product
  ).length

  return inventory
}

const initialInventory: Inventory = {
  shirt: 0,
  jeans: 0,
  shoes: 0,
  hat: 0
}

export const useHeijunkaStore = defineStore('heijunka', {
  state: (): HeijunkaState => ({
    money: 100,
    inventory: { ...initialInventory },
    orders: [],
    planning: [],
    validatedPlanning: false,
    meta: {
      currentHour: 0
    }
  }),
  actions: {
    newHour() {
      // End of the production
      if (this.gameEnded) {
        return
      }

      this.meta.currentHour++

      // Add to inventory every day
      if (this.meta.currentHour % NUMBER_OF_HOURS_PER_DAY === 0) {
        this.inventory = {
          shirt:
            this.inventory.shirt +
            getInventoryByProduct('shirt', this.planning, this.currentDay),
          jeans:
            this.inventory.jeans +
            getInventoryByProduct('jeans', this.planning, this.currentDay),
          shoes:
            this.inventory.shoes +
            getInventoryByProduct('shoes', this.planning, this.currentDay),
          hat:
            this.inventory.hat +
            getInventoryByProduct('hat', this.planning, this.currentDay)
        }
      }

      // Each non received demand gains one hour of lead time
      this.orders = this.orders.map((order): Order => {
        return {
          ...order,
          leadTime:
            order.status === 'received' ? order.leadTime : order.leadTime + 1
        }
      })

      // New demand
      const newDemand: Order = {
        status: 'requested',
        leadTime: 0,
        product: pickRandomElement(
          [
            Array.from({ length: 5 }, (): ProductType => 'shirt'),
            Array.from({ length: 3 }, (): ProductType => 'jeans'),
            Array.from({ length: 2 }, (): ProductType => 'shoes'),
            Array.from({ length: 2 }, (): ProductType => 'hat')
          ].flat()
        )
      }

      this.orders.push(newDemand)

      // Use the inventory to deliver orders
      this.orders = this.orders.map((order, index): Order => {
        const productInventory = this.inventory[order.product]

        if (productInventory === 0) {
          return order
        }

        const offset = this.orders.filter(
          (o, i) => i < index && o.product !== order.product
        ).length

        const newStatus =
          index - offset < productInventory ? 'received' : 'requested'

        return {
          ...order,
          status: newStatus
        }
      })
    },
    validatePlanning(planning: ProductType[]) {
      this.validatedPlanning = true
      this.planning = planning
    },
    reset() {
      this.validatedPlanning = false
      this.meta.currentHour = 0
      this.planning = []
      this.orders = []
      this.inventory = { ...initialInventory }
    },
    simulateMonth() {
      for (let index = 0; index < 80; index++) {
        this.newHour()
      }
    }
  },
  getters: {
    currentDay: (state) =>
      Math.ceil(state.meta.currentHour / NUMBER_OF_HOURS_PER_DAY),
    remainingInventory: (state): Inventory => ({
      shirt: Math.max(
        state.inventory.shirt -
          state.orders.filter((o) => o.product === 'shirt').length,
        0
      ),
      jeans: Math.max(
        state.inventory.jeans -
          state.orders.filter((o) => o.product === 'jeans').length,
        0
      ),
      shoes: Math.max(
        state.inventory.shoes -
          state.orders.filter((o) => o.product === 'shoes').length,
        0
      ),
      hat: Math.max(
        state.inventory.hat -
          state.orders.filter((o) => o.product === 'hat').length,
        0
      )
    }),
    gameEnded: () => false,
    // state.meta.currentHour >= NUMBER_OF_DAYS * NUMBER_OF_HOURS_PER_DAY,
    meanLeadTime: (state) => getMean(state.orders.map((o) => o.leadTime))
  }
})
