// Handle Search Button
const searchButton = () => {
  const input = document.getElementById("input-value");
  const inputValue = input.value;
  // Clear Search Result Field
  result.innerHTML = "";
  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then((res) => res.json())
    .then((data) => searchResult(data.data));
  // Clear Input Field
  input.value = "";
};
// Handle Search Result
const searchResult = (phones) => {
  for (const phone of phones) {
    const div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.classList.add("mb-5");
    div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${phone.image}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">See Details</button>
        </div>
      </div>
    `;
    result.appendChild(div);
  }
};
// Handle Details Result
const phoneDetails = (slug) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      const alldetails = data.data;
      const singleDetails = alldetails;
      const div = document.createElement("div");
      div.classList.add("col-lg-4");
      div.classList.add("mb-5");
      div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${singleDetails.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${singleDetails.name}</h5>
          <p class="card-text">${singleDetails.releaseDate}</p>
          <p class="card-text">${singleDetails.mainFeatures.storage}</p>
          <p class="card-text">${singleDetails.mainFeatures.displaySize}</p>
          <p class="card-text">${singleDetails.mainFeatures.chipSet}</p>
          <p class="card-text">${singleDetails.mainFeatures.memory}</p>
        </div>
      </div>
      `;
      details.appendChild(div);
    });
};
