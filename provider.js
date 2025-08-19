document.addEventListener('DOMContentLoaded', () => {
  // Inline SVG placeholder (no external file needed)
  const PLACEHOLDER =
    `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 180'>
        <rect width='240' height='180' fill='#eef2ff'/>
        <g fill='none' stroke='#c7d2fe' stroke-width='6'>
          <rect x='30' y='30' width='180' height='120' rx='12' ry='12'/>
          <path d='M55 130 L110 80 L150 110 L185 85'/>
          <circle cx='95' cy='65' r='10' fill='#c7d2fe' stroke='none'/>
        </g>
      </svg>
    `)}`;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const heroImg = document.getElementById('heroImg');
  const infoEl  = document.getElementById('providerInfo');
  const form    = document.getElementById('bookingForm');

  if (!id) {
    if (infoEl) infoEl.innerHTML = "<p>Missing provider id.</p>";
    return;
  }
  if (!window.MOCK_PROVIDERS) {
    console.error("MOCK_PROVIDERS not found — load mockData.js before provider.js");
    if (infoEl) infoEl.innerHTML = "<p>Data not loaded.</p>";
    return;
  }

  const provider = window.MOCK_PROVIDERS.find(p => p.id === id);
  if (!provider) {
    if (infoEl) infoEl.innerHTML = "<p>Provider not found.</p>";
    return;
  }

  // Hero image + fallback
  if (heroImg) {
    heroImg.src = provider.photo || PLACEHOLDER;
    heroImg.alt = provider.name;
    heroImg.addEventListener('error', () => { heroImg.src = PLACEHOLDER; });
  }

  // Right column info
  if (infoEl) {
    infoEl.innerHTML = `
      <h1 style="margin:0 0 8px;">${provider.name}</h1>
      <div class="meta" style="margin-bottom:12px;">
        ${provider.categories.join(", ")} • ${provider.city}
      </div>
      <p style="margin:0 0 12px;">${provider.bio}</p>
      <div class="price">${provider.price}</div>
    `;
  }

  // Booking form (mock submit)
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
