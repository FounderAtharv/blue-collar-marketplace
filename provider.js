const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const provider = window.MOCK_PROVIDERS.find(p => p.id === id);
const detailEl = document.getElementById('providerDetail');

if (!provider) {
  detailEl.innerHTML = "<p>Provider not found.</p>";
} else {
  detailEl.innerHTML = `
    <article class="card">
      <img src="${provider.photo}" alt="${provider.name}" />
      <div class="pad">
        <h1>${provider.name}</h1>
        <div class="meta">${provider.categories.join(", ")} • ${provider.city}</div>
        <p>${provider.bio}</p>
        <div class="price">${provider.price}</div>
      </div>
    </article>
  `;
}

document.getElementById('bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  console.log("Booking request:", { providerId: id, ...data });
  alert("Booking request sent! (mock)");
  e.target.reset();
});


if (provider) {
  document.getElementById('heroImg').src = provider.photo;
  document.getElementById('heroImg').alt = provider.name;
  // rest of your render stays same (name, meta, bio, price) into #providerDetail
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const provider = window.MOCK_PROVIDERS.find(p => p.id === id);

  const heroImg = document.getElementById('heroImg');
  const infoEl  = document.getElementById('providerInfo');

  if (!provider) {
    if (heroImg) heroImg.remove();
    infoEl.innerHTML = "<p>Provider not found.</p>";
    return;
  }

  // Hero image
  heroImg.src = provider.photo;
  heroImg.alt = provider.name;

  // Right column info
  infoEl.innerHTML = `
    <h1 style="margin:0 0 8px;">${provider.name}</h1>
    <div class="meta" style="margin-bottom:12px;">
      ${provider.categories.join(", ")} • ${provider.city}
    </div>
    <p style="margin:0 0 12px;">${provider.bio}</p>
    <div class="price">${provider.price}</div>
  `;

  // Form submit (single form on page)
  const form = document.getElementById('bookingForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    console.log("Booking request:", { providerId: id, ...data });
    alert("Booking request sent! (mock)");
    form.reset();
  });
});