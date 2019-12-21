<template>
  <div class="jobfilters">
    <div class="jobfilters__search search">
      <input
        @input="handleSearch"
        v-model="searchValue"
        type="search"
        placeholder="Search by company name or job title"
        class="search__field"
      >
    </div>
    <div class="jobfilters__filters filters">
      <button
        @click="handleStatusFilter('all')"
        :class="activeFilter === 'all' ? 'is__active' : ''"
        class="filters_filter"
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
    <div class="jobfilters__orderBy orderBy">
      <div class="orderBy__group">
        <label for="orderby">Order By:</label>
        <select
          id="orderby"
          v-model="orderBy"
          @change="handleFilterOrder">
          <option
            v-for="order in orderByFilters"
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
import STATUS from '~/helpers/statusTypes'

export default {
  data () {
    return {
      orderByFilters: [
        { id: 'none', text: 'Choose filter' },
        { id: 'createdAt', text: 'Created Date' },
        { id: 'companyName', text: 'Company Name' },
        { id: 'jobTitle', text: 'Job Title' },
        { id: 'status', text: 'Status' }
      ],
      activeFilter: 'all',
      orderBy: 'none',
      searchValue: ''
    }
  },
  computed: {
    statuses () {
      return STATUS
    }
  },
  methods: {
    handleFilterOrder () {},
    handleStatusFilter (status) {},
    handleSearch () {}
  }
}
</script>

<style scoped>
.jobfilters {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

input {
  width: 100%;
  padding: 0 1rem;
}

.jobfilters > * {
  width: 100%;
  margin: 15px auto;
}

.filters__filter.is__active {
  color: red;
}
</style>
