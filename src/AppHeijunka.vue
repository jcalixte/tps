<script setup lang="ts">
import { ref } from 'vue'
import { useHeijunkaStore } from '@/modules/heijkunka/heijunka-store'
import {
  NUMBER_OF_DAYS,
  NUMBER_OF_HOURS_PER_DAY
} from '@/modules/heijkunka/heijunka-config'
import { ProductType } from '@/modules/heijkunka/types/product-type'
import { pickRandomElement } from './utils'
import HeijunkaStat from '@/modules/heijkunka/HeijunkaStat.vue'
import ShirtItem from '@/modules/heijkunka/assets/ShirtItem.vue'
import ShoeItem from '@/modules/heijkunka/assets/ShoeItem.vue'
import JeanItem from '@/modules/heijkunka/assets/JeanItem.vue'
import HatItem from '@/modules/heijkunka/assets/HatItem.vue'
import ReceivedStatus from '@/modules/heijkunka/assets/ReceivedStatus.vue'
import RequestedStatus from '@/modules/heijkunka/assets/RequestedStatus.vue'
import OrderItem from '@/modules/heijkunka/assets/OrderItem.vue'

const days = Array.from({ length: NUMBER_OF_DAYS }, (_, i) => i + 1)
const hours = Array.from({ length: NUMBER_OF_HOURS_PER_DAY }, (_, i) => i + 1)

const hoursCount = hours.length

const orders = ref(
  Array.from(
    { length: days.length * hours.length },
    (): ProductType => pickRandomElement(['shirt', 'jeans', 'shoes', 'hat'])
  )
)

const batchPlanning: ProductType[] = [
  'shirt',
  'shirt',
  'shirt',
  'shirt',
  'shirt',
  'jeans',
  'jeans',
  'jeans',
  'shoes',
  'shoes',
  'hat',
  'hat'
]

const levelingPlanning: ProductType[] = [
  'shirt',
  'shirt',
  'jeans',
  'shoes',
  'hat',
  'shirt',
  'shirt',
  'jeans',
  'shoes',
  'hat',
  'shirt',
  'jeans'
]

const orderIndex = (dayIndex: number, hourIndex: number) => {
  return dayIndex * hoursCount + hourIndex
}

const heijunkaStore = useHeijunkaStore()

const createdAt = new Date('2026-01-01').toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <article>
    <h1>Heijunka</h1>
    <h2 class="created-at numeric">
      {{ createdAt }}
    </h2>
    <div class="text">
      <p>
        You're selling shirts, jeans and shoes in a little town that is quite
        specific: every hour someone get to your shop and buys 1 item and they
        won't leave until they are satisfied!
      </p>
      <p>
        You know, from your years of experience, that in 3 days, you sell
        approximately
      </p>
      <ul>
        <li>5 shirts <ShirtItem v-for="_ in Array(5)" /></li>
        <li>3 jeans <JeanItem v-for="_ in Array(3)" /></li>
        <li>2 pairs of shoes <ShoeItem v-for="_ in Array(2)" /></li>
        <li>2 hats <HatItem v-for="_ in Array(2)" /></li>
      </ul>
      <section class="factory">
        <h2>Factory</h2>

        <table>
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Hour 1</th>
              <th scope="col">Hour 2</th>
              <th scope="col">Hour 3</th>
              <th scope="col">Hour 4</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(day, dayIndex) in days" :key="day">
              <th scope="row">Day {{ day }}</th>
              <td v-for="(hour, hourIndex) in hours">
                <select
                  v-model="orders[orderIndex(dayIndex, hourIndex)]"
                  :name="`day-${day}-hour-${hour}`"
                  :id="`day-${day}-hour-${hour}`"
                  :disabled="heijunkaStore.validatedPlanning"
                >
                  <option value="shirt">Shirt</option>
                  <option value="jeans">Jeans</option>
                  <option value="shoes">Shoes</option>
                  <option value="hat">Hat</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="commands">
        <button
          v-if="!heijunkaStore.validatedPlanning"
          class="button-outline"
          @click="heijunkaStore.validatePlanning(orders)"
        >
          validate planning
        </button>
        <button
          v-else-if="!heijunkaStore.gameEnded"
          class="button-outline"
          @click="heijunkaStore.newHour()"
          :disabled="!heijunkaStore.validatedPlanning"
        >
          next hour
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-player-play"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 4v16l13 -8z" />
          </svg> -->
        </button>
        <span v-if="heijunkaStore.meta.currentHour > 0">
          day: {{ heijunkaStore.currentDay }} | current hour:
          {{ heijunkaStore.meta.currentHour }} hours
        </span>
        <button class="button-outline" @click="heijunkaStore.reset()">
          reset
        </button>

        <button class="button-outline" @click="orders = [...levelingPlanning]">
          levelling
        </button>
        <button class="button-outline" @click="orders = [...batchPlanning]">
          batch
        </button>
        <div>
          <button class="button-outline" @click="heijunkaStore.simulateMonth()">
            Simulate a month
          </button>
        </div>
      </section>

      <section class="dashboard">
        Mean lead time: {{ heijunkaStore.meanLeadTime }}
        <hr />
        Orders made: {{ heijunkaStore.orders.length }}
      </section>

      <HeijunkaStat />

      <section class="shop">
        <div class="inventory">
          <h2>Inventory</h2>

          <section class="shop-shirt">
            <ShirtItem
              v-for="shirt in Array.from(
                { length: heijunkaStore.remainingInventory.shirt },
                (_, i) => i
              )"
              :key="shirt"
            />
          </section>
          <section class="shop-jeans">
            <JeanItem
              v-for="jeans in Array.from(
                { length: heijunkaStore.remainingInventory.jeans },
                (_, i) => i
              )"
              :key="jeans"
            />
          </section>
          <section class="shop-shoes">
            <ShoeItem
              v-for="shoes in Array.from(
                { length: heijunkaStore.remainingInventory.shoes },
                (_, i) => i
              )"
              :key="shoes"
            />
          </section>
          <section class="shop-hat">
            <HatItem
              v-for="hat in Array.from(
                { length: heijunkaStore.remainingInventory.hat },
                (_, i) => i
              )"
              :key="hat"
            />
          </section>
        </div>
        <div class="orders">
          <h2>Orders</h2>
          <ol>
            <li
              class="order"
              v-for="order in heijunkaStore.orders.toReversed()"
            >
              <RequestedStatus v-show="order.status === 'requested'" />
              <ReceivedStatus v-show="order.status === 'received'" />

              <OrderItem />

              <span class="numeric">
                {{ order.product }} | {{ order.leadTime }}
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section class="dashboard">
        Mean lead time: {{ heijunkaStore.meanLeadTime }}
        <hr />
        Orders made: {{ heijunkaStore.orders.length }}
      </section>

      <p>
        The longer the lead time is, the longer it takes to have return on
        investment. You already paid for the raw material, the workforce, the
        machines but until the client receives the product you won't get paid.
      </p>
      <p>
        The more stock there is, the more latent payments there are and the more
        paymeents are still waiting, the more you need to be good at planning
        batches.
      </p>
      <p>
        Producing a bit of everything with small batches is the way to go and
        that's the core of Heijunka
      </p>
      <h2>What heijunka needs: SMED</h2>
      <p>
        We didn't talk here about how we manage products that need different
        time to be produced.
      </p>
    </div>
  </article>
</template>

<style scoped lang="scss">
main {
  min-height: calc(100vh - 2 * 1rem);
}

.commands {
  display: flex;
  gap: 1rem;
}

li {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.shop {
  display: flex;
  border: 2px solid var(--primary-color);
  border-radius: 1rem;
  padding: 0 0.5rem;

  & > div {
    flex: 1;
  }
}
</style>
