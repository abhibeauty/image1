let key = '563492ad6f91700001000001172ca0208dd94ff1bfc48501165045f3';

const mainContent = document.querySelector('.main-content')
const searchInput = document.querySelector('.search-input')
const searchForm = document.querySelector('.search-form')
const btnSubmit = document.querySelector('.btn-submit')
const btnViewMore = document.querySelector('.view-more')


let searchImagesLink;
let currentSearch;
let searchValue;
let pageCount = 1;  //this for more images


const apiHandling = async (url) => {
    const fetchData = await fetch(url,{
        method : 'GET',
        headers : {
            Accept : 'application/json',
            Authorization : key
        }

    })
    const data = await fetchData.json()
    return data;
}

//Listen for events

btnViewMore.addEventListener('click',viewMore)

searchInput.addEventListener('input',(e) => {
    searchValue = e.target.value;
})

searchForm.addEventListener('submit',(e) => {
    e.preventDefault();

    currentSearch = searchValue;
    searchImages(searchValue)
})

const clear = () => {
    mainContent.innerHTML = ''
    searchInput.value = ''
}



//Insert HTML

const insertHTML = (data) => {
    data.photos.forEach((photo, i) => {
        const gallery = document.createElement('div')
        gallery.classList.add('gallery');

        gallery.innerHTML = `<div class='image-holder'><img src=${photo.src.large}> </img> 
            <div class='profile'>
            <a href=${photo.photographer_url}> ${photo.photographer}</a>
            <a href=${photo.src.large}><img class='imgs' src='download1.png'></img></a>

            </div>
        
        </div>`;

        
        
        mainContent.appendChild(gallery);
    })
}


const curatedPhotos = async () => {
    const data = await apiHandling("https://api.pexels.com/v1/curated?per_page=15")

    insertHTML(data)
}

const searchImages = async (searchQuery) => {

    //clear input existing data

    clear();



    searchImagesLink = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=15`
    const data = await apiHandling(searchImagesLink)

    insertHTML(data)
}

//View more pics 

async function viewMore (){
    pageCount++;
    if(currentSearch){
    searchImagesLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=10&page=${pageCount}`
    }else {
        searchImagesLink = `https://api.pexels.com/v1/curated?per_page=${pageCount}`
    }

    const data = await apiHandling(searchImagesLink);
    insertHTML(data)
}


searchImages();
curatedPhotos();