import {
  NUMBER_OF_DAYS,
  NUMBER_OF_HOURS_PER_DAY
} from '@/modules/heijkunka/heijunka-config'
import { ProductType } from '@/modules/heijkunka/types/product-type'
import { pickRandomElement } from '@/utils'
import { defineStore } from 'pinia'

type Order = {
  status: 'requested' | 'received'
  leadTime: number
  product: ProductType
}

type Stock = {
  shirt: number
  jeans: number
  shoes: number
  hat: number
}

type HeijunkaState = {
  money: number
  inventory: Stock
  orders: Order[]
  planning: ProductType[]
  validatedPlanning: boolean
  meta: {
    currentHour: number
  }
}

const getStockByProduct = (
  product: ProductType,
  planning: ProductType[],
  currentDay: number
): number => {
  const stock = planning.filter(
    (p, index) =>
      index >= (currentDay - 1) * NUMBER_OF_HOURS_PER_DAY &&
      index < currentDay * NUMBER_OF_HOURS_PER_DAY &&
      p === product
  ).length

  return stock
}

const initialInventory: Stock = {
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

      // Add to stock every day
      if (this.meta.currentHour % NUMBER_OF_HOURS_PER_DAY === 0) {
        this.inventory = {
          shirt:
            this.inventory.shirt +
            getStockByProduct('shirt', this.planning, this.currentDay),
          jeans:
            this.inventory.jeans +
            getStockByProduct('jeans', this.planning, this.currentDay),
          shoes:
            this.inventory.shoes +
            getStockByProduct('shoes', this.planning, this.currentDay),
          hat:
            this.inventory.hat +
            getStockByProduct('hat', this.planning, this.currentDay)
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
        const stock = this.inventory[order.product]

        if (stock === 0) {
          return order
        }

        const offset = this.orders.filter(
          (o, i) => i < index && o.product !== order.product
        ).length

        const newStatus = index - offset < stock ? 'received' : 'requested'

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
    }
  },
  getters: {
    currentDay: (state) =>
      Math.ceil(state.meta.currentHour / NUMBER_OF_HOURS_PER_DAY),
    gameEnded: (state) =>
      state.meta.currentHour >= NUMBER_OF_DAYS * NUMBER_OF_HOURS_PER_DAY
  }
})
