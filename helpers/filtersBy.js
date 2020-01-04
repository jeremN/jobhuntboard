export default function filterJobs (filter, jobs) {
  let filteredJobs = [...jobs]

  if (filter.status !== 'all') {
    filteredJobs = filteredJobs.filter((job) => {
      return job.status === filter.status
    })
  }

  if (filter.search !== ('' || null)) {
    const search = []
    const searchedTerm = filter.search.toLowerCase()

    filteredJobs.reduce((acc, item, index, array) => {
      if ((item.companyName !== null && item.companyName.toLowerCase().includes(searchedTerm)) ||
        (item.jobTitle !== null && item.jobTitle.toLowerCase().includes(searchedTerm))) {
        search.push(item)
      }
    }, search)

    filteredJobs = search
  }

  return filteredJobs
}
