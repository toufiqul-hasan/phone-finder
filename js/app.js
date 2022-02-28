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
          <button onclick="cardDetails('${phone.code}')" class="btn btn-primary">See Details</button>
        </div>
      </div>
    `;
    result.appendChild(div);
  }
};
