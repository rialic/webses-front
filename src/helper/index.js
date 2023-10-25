export const {
  logo,
  empty,
  getSubDomain,
  parseFilters,
  trimInput,
  lowerCaseName,
  validCPF
} = (() => {
  function logo() {
    const mainLogo = new URL(`/src/assets/img/${getSubDomain()}/main-logo.png`, import.meta.url)
    const navLogo = new URL(`/src/assets/img/${getSubDomain()}/nav-logo.png`, import.meta.url)
    const asideLogo = new URL(`/src/assets/img/${getSubDomain()}/aside-logo.png`, import.meta.url)

    return {
      mainLogo,
      navLogo,
      asideLogo
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
    const acronymsList = [
      'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES',
      'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE',
      'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC',
      'SE', 'SP', 'TO', 'UBS', 'USF', 'PM', 'APA', 'I', 'II', 'III', 'IV', 'I'
    ]

    return val.split(' ').reduce((acc, val) => {
      if (exceptionNameList.includes(val.toLowerCase())) {
        acc += val.toLowerCase() + ' '

        return acc
      }

      if (acronymsList.includes(val)) {
        return acc += val + ' '
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

  function validCPF(cpf) {
    const cpfRegex = /^(?:(\d{3}).(\d{3}).(\d{3})-(\d{2}))$/

    if (!cpfRegex.test(cpf) ||
      cpf === '000.000.000-00' ||
      cpf === '111.111.111-11' ||
      cpf === '222.222.222-22' ||
      cpf === '333.333.333-33' ||
      cpf === '444.444.444-44' ||
      cpf === '555.555.555-55' ||
      cpf === '666.666.666-66' ||
      cpf === '777.777.777-77' ||
      cpf === '888.888.888-88' ||
      cpf === '999.999.999-99') {
      return false
    }

    const numbers = cpf.match(/\d/g).map(Number)
    let sum = numbers.reduce((acc, cur, index) => {
      if (index < 9) {
        return acc + cur * (10 - index)
      }
      return acc
    }, 0)

    let rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) {
      rest = 0
    }

    if (rest !== numbers[9]) {
      return false
    }

    sum = numbers.reduce((acc, cur, index) => {
      if (index < 10) {
        return acc + cur * (11 - index)
      }
      return acc
    }, 0)

    rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) {
      rest = 0
    }

    if (rest !== numbers[10]) {
      return false
    }

    return true
  }

  return {
    logo,
    empty,
    getSubDomain,
    parseFilters,
    trimInput,
    lowerCaseName,
    validCPF
  }
})()