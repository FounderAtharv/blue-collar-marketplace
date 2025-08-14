document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  // Make sure mockData.js is loaded before this
  if (!window.MOCK_PROVIDERS) {
    console.error("MOCK_PROVIDERS not found — did you load mockData.js first?");
    return;
  }

  const provider = window.MOCK_PROVIDERS.find(p => p.id === id);

  const heroImg = document.getElementById('heroImg');
  const infoEl  = document.getElementById('providerInfo');

  if (!provider) {
    if (heroImg) heroImg.remove();
    if (infoEl) infoEl.innerHTML = "<p>Provider not found.</p>";
    return;
  }

  // Hero image
  heroImg.src = provider.photo;
  heroImg.alt = provider.name;

  // Provider details
  infoEl.innerHTML = `
    <h1 style="margin:0 0 8px;">${provider.name}</h1>
    <div class="meta" style="margin-bottom:12px;">
      ${provider.categories.join(", ")} • ${provider.city}
    </div>
    <p style="margin:0 0 12px;">${provider.bio}</p>
    <div class="price">${provider.price}</div>
  `;

  // Booking form
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      console.log("Booking request:", { providerId: id, ...data });
      alert("Booking request sent! (mock)");
      form.reset();
    });
  }
});
