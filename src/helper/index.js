export const {
  logo,
  empty,
  getSubDomain,
  parseFilters,
  trimInput,
  lowerCaseName
} = (() => {
  function logo() {
    const mainLogo = new URL(`/src/assets/img/${getSubDomain()}/main-logo.png`, import.meta.url)

    return {
      mainLogo
    }
  }

  function empty(val) {
    if (typeof val === 'object') {
      if (val !== null) {
        const getObjectInstanceVal = () => Object.prototype.toString.call(val)
        const getArrayLength = () => val.length
        const getObjectLength = () => Object.keys(val).length
        const _default = () => val.valueOf()
        const getValueOf = () => {
          let valueOf
          const instanceList = [String, Boolean, Number]

          for (let instan of instanceList) {
            if (val instanceof instan) {
              valueOf = val.valueOf()
              break
            }
          }

          return valueOf
        }

        const objectList = {
          '[object Array]': getArrayLength,
          '[object Object]': getObjectLength,
          '[object NodeList]': getObjectLength,
          '[object RadioNodeList]': getObjectLength,
          '[object HTMLCollection]': getObjectLength,
          '[object DOMTokenList]': getObjectLength,
          '[object NamedNodeMap]': getObjectLength,
          '[object String]': getValueOf,
          '[object Boolean]': getValueOf,
          '[object Number]': getValueOf,
          'default': _default
        }

        val = (objectList[getObjectInstanceVal()] || objectList['default'])()
      }
    }

    return !val
  }

  function getSubDomain() {
    const domainFragmentList = window.location.host.split('.')
    const subdomainAvailableList = import.meta.env.VITE_SUBDOMAINS.split(',')
    const subdomain = domainFragmentList.filter((domain) => subdomainAvailableList.includes(domain))

    return subdomain[0]
  }

  function parseFilters(filterParams) {
    const filters = Object.keys(filterParams)

    return filters.reduce((acc, filterKey) => {
      const isFilterExists = !empty(filterParams[filterKey])

      if (isFilterExists) {
        acc[`filter:${filterKey}`] = filterParams[filterKey]
      }

      return acc
    }, {})
  }

  function lowerCaseName(val) {
    const exceptionNameList = ['da', 'das', 'de', 'des', 'do', 'dos', 'du', 'em']

    return val.split(' ').reduce((acc, val) => {
      if (exceptionNameList.includes(val.toLowerCase())) {
        acc += val.toLowerCase() + ' '

        return acc
      }

      acc += val.slice('0', 1) + val.slice(1).toLowerCase() + ' '

      return acc
    }, '').trim()
  }

  function trimInput(inputTag) {
    const spacePattern = /^\s+/g
    const hasSpaceInBeginning = spacePattern.test(inputTag.target.value)

    if (hasSpaceInBeginning) {
      inputTag.target.value = inputTag.target.value.replace(spacePattern, '')
    }

    return inputTag.target.value
  }

  return {
    logo,
    empty,
    getSubDomain,
    parseFilters,
    trimInput,
    lowerCaseName
  }
})()