export const {
  pageParams
} = (() => {
  function pageParams(route) {
    if (route.params.uuid) {
      return { uuid : route.params.uuid }
    }

    return { page: parseInt(route.query.page) || 1, limit: 20 }
  }

  return {
    pageParams
  }
})()