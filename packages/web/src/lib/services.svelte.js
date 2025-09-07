
const services = $state({
  data: null,
  loading: true,
  error: null
});

async function fetchServices() {
  services.loading = true; // Set loading to true before fetching
  try {
    const response = await fetch('https://services.atpub.me')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const jsonData = await response.json()
    services.data = jsonData; // Store the fetched data
  } catch (e) {
    services.error = e.message; // Store the error message
  } finally {
    services.loading = false; // Set loading to false after fetching is complete
  }
}

fetchServices()

export default services;
