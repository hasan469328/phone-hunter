// api phone
const phoneDataLoad = (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
  .then(res => res.json())
  .then(data => dataDisplay(data.data, dataLimit))
}

const search = () => {
  spinner(true);
  const searchValue = document.getElementById('search-input').value;
  // call the api
  phoneDataLoad(searchValue, 10);
  // empty search field
  // document.getElementById('search-input').value = ''
}

// display phone data
const dataDisplay = (phones, dataLimit) =>{
  // get the container of cards 
  const cardContainer = document.getElementById('card-container');
  
  
  // empty the card for search result
  cardContainer.textContent = '';
  
  // show all button
  const showAllButton = document.getElementById('showAllButton');

  // show first 10 only
  if(dataLimit && phones.length > 10){
    phones = phones.slice(0, 10);
    // show search button
    showAllButton.classList.remove('d-none')
  }
  else{
    showAllButton.classList.add('d-none')
  }
  
  document.getElementById('showAllButton').addEventListener('click', function(){
    const searchValue = document.getElementById('search-input').value;
    phoneDataLoad(searchValue)
  })


  // error message show and hide
  // error message element
  const notFoundMessage = document.getElementById('not-found');
  
  if(phones.length === 0){
    notFoundMessage.classList.remove('d-none')
  }
  else {
    notFoundMessage.classList.add('d-none')
  }

  // all phones
  phones.forEach(phone => {
    
    // create a div with col class
    const div = document.createElement('div');
    div.classList.add('col')

    // set inner html in div
    div.innerHTML = `
    <div class="card p-3">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <div class="text-center">
      <button onclick="phoneDetaisDataLoad('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">details</button>
    </div>
    </div>
    `
    // append to container
    cardContainer.appendChild(div)
  })
  spinner(false)

}

// search phone
const searchPhones = () =>{
  search()
}

// enter key search activate
const inputElement = document.getElementById('search-input');
inputElement.addEventListener('keypress', function (e){
  if (e.key === 'Enter') {
    search()
  }
})

// phones detail API call
const phoneDetaisDataLoad = async(id) =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  try {
    const res = await fetch(url);
    const data = await res.json();
    phoneDetaisDataShow(data.data)
  }
  catch(error){
    console.log(error);
  }
}

const phoneDetaisDataShow = phone => {
  document.getElementById('modaTitle').innerText = `${phone.name}`
}


