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

const planning = ref(
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

const planningIndex = (dayIndex: number, hourIndex: number) => {
  return dayIndex * hours.length + hourIndex
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
    <p>
      You're selling shirts, jeans and shoes in a little town that is quite
      specific: every hour someone get to your shop and buys 1 item and they
      won't leave until they are satisfied!
    </p>
    <p>
      You know, from your years of experience, that in 3 days, you sell
      approximately
    </p>
    <div class="columns">
      <ul>
        <li>5 shirts</li>
        <li>3 jeans</li>
        <li>2 pairs of shoes</li>
        <li>2 hats</li>
      </ul>
      <ul>
        <li><ShirtItem v-for="_ in Array(5)" /></li>
        <li><JeanItem v-for="_ in Array(3)" /></li>
        <li><ShoeItem v-for="_ in Array(2)" /></li>
        <li><HatItem v-for="_ in Array(2)" /></li>
      </ul>
    </div>
    <p>
      As there are 4 hours of production per day, you must produce 4 products
      per day to meet the 12 orders every 3 days. At the end, you produce 1
      product every hour.
    </p>
    <p>
      The mere reality is that we don't really know the exact orders we'll have.
      This is presisely the whole point of plannification, it is a bet into the
      future. The play is to know how to bet.
    </p>
    <section class="factory">
      <h2>Factory</h2>

      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">8:00</th>
            <th scope="col">9:00</th>
            <th scope="col">10:00</th>
            <th scope="col">11:00</th>
            <th>dock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(day, dayIndex) in days" :key="day">
            <th scope="row">day {{ day }}</th>
            <td v-for="(hour, hourIndex) in hours">
              <select
                v-model="planning[planningIndex(dayIndex, hourIndex)]"
                :name="`day-${day}-hour-${hour}`"
                :id="`day-${day}-hour-${hour}`"
              >
                <option value="shirt">Shirt</option>
                <option value="jeans">Jeans</option>
                <option value="shoes">Shoes</option>
                <option value="hat">Hat</option>
              </select>
            </td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-truck"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path
                  d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="commands">
      <button class="button-outline" @click="heijunkaStore.newHour(planning)">
        next hour
        <!--
        <svg
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
        </svg>
        -->
      </button>
      <button class="button-outline" @click="heijunkaStore.reset()">
        reset
      </button>

      <button class="button-outline" @click="planning = [...levelingPlanning]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-chart-histogram"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3v18h18" />
          <path d="M20 18v3" />
          <path d="M16 16v5" />
          <path d="M12 13v8" />
          <path d="M8 16v5" />
          <path d="M3 11c6 0 5 -5 9 -5s3 5 9 5" />
        </svg>
        levelling
      </button>
      <button class="button-outline" @click="planning = [...batchPlanning]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="icon icon-tabler icons-tabler-filled icon-tabler-stack-3"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M20.894 17.553a1 1 0 0 1 -.447 1.341l-8 4a1 1 0 0 1 -.894 0l-8 -4a1 1 0 0 1 .894 -1.788l7.553 3.774l7.554 -3.775a1 1 0 0 1 1.341 .447m0 -4a1 1 0 0 1 -.447 1.341l-8 4a1 1 0 0 1 -.894 0l-8 -4a1 1 0 0 1 .894 -1.788l7.552 3.775l7.554 -3.775a1 1 0 0 1 1.341 .447m0 -4a1 1 0 0 1 -.447 1.341l-8 4a1 1 0 0 1 -.894 0l-8 -4a1 1 0 0 1 .894 -1.788l7.552 3.775l7.554 -3.775a1 1 0 0 1 1.341 .447m-8.887 -8.552q .056 0 .111 .007l.111 .02l.086 .024l.012 .006l.012 .002l.029 .014l.05 .019l.016 .009l.012 .005l8 4a1 1 0 0 1 0 1.788l-8 4a1 1 0 0 1 -.894 0l-8 -4a1 1 0 0 1 0 -1.788l8 -4l.011 -.005l.018 -.01l.078 -.032l.011 -.002l.013 -.006l.086 -.024l.11 -.02l.056 -.005z"
          />
        </svg>
        batch
      </button>
      <button
        class="button-outline"
        @click="heijunkaStore.simulateMonth(planning)"
      >
        simulate a month
      </button>
    </section>
    <div>
      <span v-if="heijunkaStore.meta.currentHour > 0">
        day: {{ heijunkaStore.currentDay }} | current hour:
        {{ heijunkaStore.meta.currentHour }} hours | cash flow:
        {{ heijunkaStore.cashFlow }}
      </span>
    </div>

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
          <li class="order" v-for="order in heijunkaStore.orders.toReversed()">
            <RequestedStatus v-show="order.status === 'requested'" />
            <ReceivedStatus v-show="order.status === 'received'" />

            <OrderItem />

            <span class="numeric">
              {{ order.product }} {{ order.leadTime }}
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
    <h2>Batching is more convenient</h2>
    <p>
      As the raw materials are not the same, you must plan . Making big batches
      makes the production easier: you add stock so you.
    </p>
    <p>
      But here comes the bullwhip effect: if you plan with margin, your
      suppliers do it too, with margin. These margins add up and even a slight
      change in priority demands a high change in the supply network.
    </p>
    <p>
      The more stock there is, the more latent payments there are and the more
      paymeents are still waiting, the more you need to be good at planning
      batches.
    </p>
    <p>
      So producing <em>a bit of everything</em> with small batches is the way to
      go and that's the core of Heijunka.
    </p>
    <h2>
      But heijunka needs conditions. First:
      <strong title="Singe Minute Exchange of Dice">SMED</strong>
    </h2>
    <p>
      We didn't talk here about how we manage products that need different time
      to be produced. There are multiple difficulties when we try to level the
      production: by doing everything every day you must have much more
      <strong class="rainbow" aria-label="flexibility">flexibility</strong> in
      what you can make per day.
    </p>
    <h2>Heijunka is fun</h2>
    <p>
      For craftspersonns, there's no such thing repeating over and over again
      the making of the same product - even if you love doing it - work needs
      diversity. This is what the heijunka adds by doing a bit of everything.
    </p>
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

.columns {
  display: flex;

  li {
    line-height: 1.5rem;
  }
}

li {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.factory {
  border: 2px solid var(--primary-color);
  padding: 0 1rem;
  margin: 1rem 0;
}

.shop {
  display: flex;
  border: 2px solid var(--primary-color);
  border-radius: 1rem;
  padding: 0 0.5rem;
  width: 100%;

  h2 {
    text-align: center;
  }

  & > div {
    flex: 1;
  }
}

button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
