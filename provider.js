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
