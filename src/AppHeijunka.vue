<script setup lang="ts">
import { ref } from 'vue'
import { useHeijunkaStore } from '@/modules/heijkunka/heijunka-store'
import {
  NUMBER_OF_DAYS,
  NUMBER_OF_HOURS_PER_DAY
} from '@/modules/heijkunka/heijunka-config'
import { ProductType } from '@/modules/heijkunka/types/product-type'
import { pickRandomElement } from './utils'

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
        approximately 5 shirts, 3 jeans, 2 pairs of shoes and 2 hats.
      </p>
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
      </section>
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

      <section class="dashboard">
        Mean lead time: {{ heijunkaStore.meanLeadTime }}
      </section>

      <section class="shop">
        <div class="inventory">
          <h2>Inventory</h2>

          <section class="shop-shirt">
            <svg
              v-for="shirt in Array.from(
                { length: heijunkaStore.inventory.shirt },
                (_, i) => i
              )"
              :key="shirt"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-shirt"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0"
              />
            </svg>
          </section>
          <section class="shop-jeans">
            <svg
              v-for="jeans in Array.from(
                { length: heijunkaStore.inventory.jeans },
                (_, i) => i
              )"
              :key="jeans"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="icon icon-tabler icons-tabler-filled icon-tabler-columns-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M4 2h6a1 1 0 0 1 1 1v18a1 1 0 0 1 -1 1h-6a2 2 0 0 1 -2 -2v-16a2 2 0 0 1 2 -2"
              />
              <path
                d="M14 2h6a2 2 0 0 1 2 2v16a2 2 0 0 1 -2 2h-6a1 1 0 0 1 -1 -1v-18a1 1 0 0 1 1 -1"
              />
            </svg>
          </section>
          <section class="shop-shoes">
            <svg
              v-for="shoes in Array.from(
                { length: heijunkaStore.inventory.shoes },
                (_, i) => i
              )"
              :key="shoes"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-shoe"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M4 6h5.426a1 1 0 0 1 .863 .496l1.064 1.823a3 3 0 0 0 1.896 1.407l4.677 1.114a4 4 0 0 1 3.074 3.89v2.27a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1z"
              />
              <path d="M14 13l1 -2" />
              <path d="M8 18v-1a4 4 0 0 0 -4 -4h-1" />
              <path d="M10 12l1.5 -3" />
            </svg>
          </section>
          <section class="shop-hat">
            <svg
              v-for="hat in Array.from(
                { length: heijunkaStore.inventory.hat },
                (_, i) => i
              )"
              :key="hat"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-chef-hat"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4 4 0 1 1 2.092 -7.723a4 4 0 0 1 3.908 -3.151z"
              />
              <path d="M6.161 17.009l11.839 -.009" />
            </svg>
          </section>
        </div>
        <div class="orders">
          <h2>Orders</h2>
          <ol>
            <li class="order" v-for="order in heijunkaStore.orders">
              <span v-show="order.status === 'requested'">
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-hourglass-empty"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z"
                  />
                  <path
                    d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z"
                  />
                </svg>
              </span>
              <span v-show="order.status === 'received'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="icon icon-tabler icons-tabler-filled icon-tabler-rosette-discount-check"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                  />
                </svg>
              </span>

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
                class="icon icon-tabler icons-tabler-outline icon-tabler-file-barcode"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path
                  d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                />
                <path d="M8 13h1v3h-1z" />
                <path d="M12 13v3" />
                <path d="M15 13h1v3h-1z" />
              </svg>

              <span class="numeric">
                {{ order.product }} | {{ order.leadTime }}
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section class="dashboard">
        Mean lead time: {{ heijunkaStore.meanLeadTime }}
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
