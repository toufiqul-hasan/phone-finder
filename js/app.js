let allphone = [];
// Handle Search Button
const searchButton = () => {
  allphone = [];
  // Show Spinner
  document.getElementById("spinner").style.display = "block";
  const input = document.getElementById("input-value");
  const error = document.getElementById("error");
  const inputValue = input.value;
  // Clear Search Result Field
  result.innerHTML = "";
  // Clear Phone Details Field
  details.innerHTML = "";
  if (
    inputValue.toLowerCase() == "apple" ||
    inputValue.toLowerCase() == "iphone" ||
    inputValue.toLowerCase() == "ipad" ||
    inputValue.toLowerCase() == "watch" ||
    inputValue.toLowerCase() == "samsung" ||
    inputValue.toLowerCase() == "galaxy" ||
    inputValue.toLowerCase() == "tab" ||
    inputValue.toLowerCase() == "huawei" ||
    inputValue.toLowerCase() == "nova" ||
    inputValue.toLowerCase() == "mate" ||
    inputValue.toLowerCase() == "enjoy" ||
    inputValue.toLowerCase() == "oppo" ||
    inputValue.toLowerCase() == "find" ||
    inputValue.toLowerCase() == "pad" ||
    inputValue.toLowerCase() == "reno" ||
    inputValue == " "
  ) {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
      .then((res) => res.json())
      .then((data) => searchResult(data.data));
    // Clear Input Field
    input.value = "";
    // Clear Error Message
    error.innerHTML = "";
  } else {
    error.innerText = "No phone found!";
    // Clear Input Field
    input.value = "";
    // Clear Search Result Field
    result.innerHTML = "";
    // Hide Spinner
    document.getElementById("spinner").style.display = "none";
  }
};
// Handle Search Result

const searchResult = (phones) => {
  const restphones = phones.slice(20);
  for (const restphone of restphones) {
    allphone.push(restphone);
  }
  if (phones.length > 20) {
    document.getElementById("more").style.display = "block";
  } 
  else {
    document.getElementById("more").style.display = "none";
  }
  const first20Phones = phones.slice(0, 20);
  for (const phone of first20Phones) {
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
    // Hide Spinner
    document.getElementById("spinner").style.display = "none";
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
      div.classList.add("mb-5");
      // Clear Phone Details Field
      details.innerHTML = "";
      div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${singleDetails.image}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${singleDetails.name}</h5>
          <p class="card-text">Release Date: ${singleDetails?.releaseDate||'Will Update Soon'}</p>
          <p class="card-text">Chipset: ${singleDetails?.mainFeatures?.chipSet??'Will Update Soon'}</p>
          <p class="card-text">Display Size: ${singleDetails?.mainFeatures?.displaySize??'Will Update Soon'}</p>
          <p class="card-text">Memory: ${singleDetails?.mainFeatures?.memory??'Will Update Soon'}</p>
          <p class="card-text">Storage: ${singleDetails?.mainFeatures?.storage??'Will Update Soon'}</p>
          <p class="card-text">Sensors: ${singleDetails?.mainFeatures?.sensors??'Will Update Soon'}</p>
          <p class="card-text">WLAN: ${singleDetails?.others?.WLAN??'Will Update Soon'}</p>
          <p class="card-text">Bluetooth: ${singleDetails?.others?.Bluetooth??'Will Update Soon'}</p>
          <p class="card-text">GPS: ${singleDetails?.others?.GPS??'Will Update Soon'}</p>
          <p class="card-text">NFC: ${singleDetails?.others?.NFC??'Will Update Soon'}</p>
          <p class="card-text">Radio: ${singleDetails?.others?.Radio??'Will Update Soon'}</p>
          <p class="card-text">USB: ${singleDetails?.others?.USB??'Will Update Soon'}</p>
        </div>
      </div>
      `;
      details.appendChild(div);
    });
};
