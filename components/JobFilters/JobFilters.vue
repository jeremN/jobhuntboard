<template>
  <div class="wrap jobfilters">
    <div class="jobfilters__titles">
      <h2>Search Jobs</h2>
      <p><strong>144 result</strong> of your preferences</p>
    </div>
    <div class="jobfilters__content">
      <div class="jobfilters__search search">
        <label for="jobSearch" class="visually__hidden">Search</label>
        <input
          @input="handleSearch"
          v-model="searchValue"
          id="jobSearch"
          type="search"
          placeholder="Search by company name or job title"
          class="search__field"
        >
      </div>
      <div class="jobfilters__filters filters">
        <button
          @click="handleStatusFilter('all')"
          :class="activeFilter === 'all' ? 'is__active' : ''"
          class="filters__filter"
        >
          All
        </button>
        <button
          v-for="status in statuses"
          @click="handleStatusFilter(status.id)"
          :key="status.id"
          :class="activeFilter === status.id ? 'is__active' : ''"
          class="filters__filter">
          {{ status.text }}
        </button>
      </div>
    </div>
    <div class="jobfilters__orderBy orderBy">
      <div class="orderBy__group">
        <label for="orderby">Order By:</label>
        <select
          id="orderby"
          v-model="orderByFilter"
          @change="handleFilterOrder">
          <option
            v-for="order in orders"
            :key="order.id"
            :value="order.id">
              {{ order.text }}
            </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { debounce } from '~/helpers/helpers'
import STATUS from '~/helpers/statusTypes'
import ORDERS from '~/helpers/ordersTypes'

export default {
  data () {
    return {
      activeFilter: 'all',
      orderByFilter: 'none',
      searchValue: ''
    }
  },
  computed: {
    statuses () {
      return STATUS
    },
    orders () {
      return ORDERS
    }
  },
  methods: {
    ...mapActions([
      'filterByStatus',
      'filterBySearch',
      'orderBy'
    ]),
    handleFilterOrder () {
      this.orderBy(this.orderByFilter)
    },
    handleStatusFilter (status) {
      this.filterByStatus(status)
    },
    handleSearch: debounce(function (e) {
      console.debug(e, this.searchValue, e.target.Value)
      this.filterBySearch(this.searchValue)
    }, 500)
  }
}
</script>

<style scoped>
.jobfilters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
}

h2 {
  color: #272d5e;
  letter-spacing: 0.2rem;
}

input {
  width: 100%;
  padding: 0 1rem;
  border: 1px solid #EFF0F3;
}

select {
  border: 1px solid #EFF0F3;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  height: 3.9rem;
  margin-left: 1rem;
}

.jobfilters__titles {
  width: 30%;
}
.jobfilters__content {
  padding-left: 12rem;
  width: 70%;
}

.search {
  margin: 0;
}

.search__field {
  width: 100%;
  height: 4.9rem;
  padding: 0.5rem 2rem;
  border: 0;
  background-color: #fff;
  border-radius: 4rem;
}

.filters,
.orderBy {
  padding: 1rem 0;
  display: flex;
  align-items: center;
}

.filters {
  color: #b6bbc9;
  font-size: 1rem;
}

.filters__filter {
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-radius: 2rem;
}

.filters__filter:not(:first-of-type) {
  margin-left: 1rem;
  margin-right: 1rem;
}

.filters__filter:first-of-type {
  margin-right: 1rem;
}
.filters__filter:last-of-type {
  margin-right: 0;
}

.filters__filter.is__active {
  color: red;
}

.orderBy {
  margin-top: 5rem;
  width: 100%;
}
</style>
