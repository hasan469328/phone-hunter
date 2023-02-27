const spinner = isLoading => {
  const spinnerElement = document.getElementById('spinner')
  if(isLoading){
    spinnerElement.classList.remove('d-none')
  }
  else{
    spinnerElement.classList.add('d-none')
  }
}

// call the api and spinner for search


