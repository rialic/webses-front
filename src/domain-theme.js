document.addEventListener('DOMContentLoaded', () => {
  const dataTheme = document.querySelector('[data-bs-theme]')
  const domainFragmentList = window.location.host.split('.')
  const subdomainAvailableList = import.meta.env.VITE_SUBDOMAINS.split(',')
  const subdomain = domainFragmentList.filter((domain) => subdomainAvailableList.includes(domain))

  dataTheme.dataset.bsTheme = subdomain
})