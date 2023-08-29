const API_KEY = "Ds2JMBZnLbPinPwbGKABNc09e4bWnCyZ_a97C4Dsl7E";

const formElement = document.querySelector("form"),
 inputElement = document.getElementById("search-input"),
 searchResults = document.querySelector('.search-results'),
 showMoreElement = document.getElementById("show-more-button");

 let inputData="", pageNo=1;

 async function searchImages(){
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputData}&client_id=${API_KEY}`

    const response = await fetch(url)
    const data = await response.json();
    
    const results = data.results;
    if (pageNo === 1){
        searchResults.innerHTML = "";
    }
    results.map((result) =>{
        const  imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const img = document.createElement('img');
        img.src = result.urls.small;
        img.alt = result.alt_description;
        const imgTxt = document.createElement('p');
        imgTxt.textContent = result.alt_description;
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(imgTxt);
        searchResults.appendChild(imageWrapper);
    })

    pageNo++;
    if(pageNo > 1){
        showMoreElement.style.display = "block";
    }

 }

 formElement.addEventListener("submit",(event) => {
    event.preventDefault();
    pageNo=1;
    searchImages();
 } )

 
 showMoreElement.addEventListener("click",() => {
    searchImages();
 } )