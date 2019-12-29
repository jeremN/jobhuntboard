import moment from 'moment'

const getUnixTime = time => moment(time).unix()

const sortByTimeFn = (a, b) => {
  const unixTimeA = getUnixTime(a.createdAt)
  const unixTimeB = getUnixTime(b.createdAt)
  return unixTimeA < unixTimeB ? -1 : 1
}

const sortBySpecificOrder = order => (a, b) => {
  const jobA = a[order] ? a[order].toLowerCase() : ''
  const jobB = b[order] ? b[order].toLowerCase() : ''
  return jobA < jobB ? -1 : 1
}

export default function orderJobs (order, jobs) {
  const orderedJobs = [...jobs]

  if (order === 'createdAt') {
    orderedJobs.sort(sortByTimeFn)
  } else {
    orderedJobs.sort(sortBySpecificOrder(order))
  }

  return orderedJobs
}
