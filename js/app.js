// Handle Search Button
const searchButton = () => {
  const input = document.getElementById("input-value");
  const error = document.getElementById("error");
  const inputValue = input.value;
  // Clear Search Result Field
  result.innerHTML = "";
  // Clear Details Field
  details.innerHTML = "";
  if (
    inputValue.toLowerCase() == "apple" ||
    inputValue.toLowerCase() == "iphone" ||
    inputValue.toLowerCase() == "ipad" ||
    inputValue.toLowerCase() == "watch" ||
    inputValue.toLowerCase() == "samsung" ||
    inputValue.toLowerCase() == "galaxy" ||
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
  }
};
// Handle Search Result
const searchResult = (phones) => {
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
        <img src="${singleDetails.image}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${singleDetails.name}</h5>
          <p class="card-text">Release Date: ${singleDetails?.releaseDate||'Data Not Found'}</p>
          <p class="card-text">Chipset: ${singleDetails?.mainFeatures?.chipSet??'Data Not Found'}</p>
          <p class="card-text">Display Size: ${singleDetails?.mainFeatures?.displaySize??'Data Not Found'}</p>
          <p class="card-text">Memory: ${singleDetails?.mainFeatures?.memory??'Data Not Found'}</p>
          <p class="card-text">Storage: ${singleDetails?.mainFeatures?.storage??'Data Not Found'}</p>
          <p class="card-text">Sensors: ${singleDetails.mainFeatures.sensors[0]??''}, ${singleDetails.mainFeatures.sensors[1]??''}, ${singleDetails.mainFeatures.sensors[2]??''}, ${singleDetails.mainFeatures.sensors[3]??''}, ${singleDetails.mainFeatures.sensors[4]??''}, ${singleDetails.mainFeatures.sensors[5]??''}</p>
          <p class="card-text">WLAN: ${singleDetails?.others?.WLAN??'Data Not Found'}</p>
          <p class="card-text">Bluetooth: ${singleDetails?.others?.Bluetooth??'Data Not Found'}</p>
          <p class="card-text">GPS: ${singleDetails?.others?.GPS??'Data Not Found'}</p>
          <p class="card-text">NFC: ${singleDetails?.others?.NFC??'Data Not Found'}</p>
          <p class="card-text">Radio: ${singleDetails?.others?.Radio??'Data Not Found'}</p>
          <p class="card-text">USB: ${singleDetails?.others?.USB??'Data Not Found'}</p>
        </div>
      </div>
      `;
      details.appendChild(div);
    });
};
