const displayImg = document.querySelector(".displaySearch");
const form = document.querySelector(".recherche");
const error = document.querySelector(".error")
let IndexPage = 1;
let SearchQuery = "random";


async function FetchLoad(){

    try{
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${IndexPage}&query=${SearchQuery}&per_page=30&client_id=7M4Dw_nrxVAMHDEHF2nLmO4kW2scvQvQ41pa38a-gmM`);
        const data = await response.json();

        if(!data.total){
            error.innerHTML = "Ce mot n'existe pas dans la base de donnée..."
        }else{
            createImg(data.results)
            console.log(data)
        }
    }catch(erreur){
        console.log("ERROR HERE !!!!!!",erreur)
    }
};
FetchLoad();

function createImg(imgs){
    imgs.forEach(img=>{
        const newImg = document.createElement("img");
        newImg.src = img.urls.regular;
        displayImg.appendChild(newImg)
    });
};

//methode observer for scroll 

const ob = new IntersectionObserver(handleIntersection, {rootMargin : "50%"});

ob.observe(document.querySelector(".infinite-marker"));

function handleIntersection(entries){
console.log(entries)
   if ( window.scrollY>window.innerHeight &&entries[0].isIntersecting){
       IndexPage++;
       FetchLoad()
    }
}
const input = document.querySelector(".search")

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    displayImg.textContent = "";
    if(e.target[0].value === ""){
        error.innerHTML = "Vous n'avez rien écrit ... Que vous voulez chercher?";
        return
    }else {
        error.innerHTML = "";
        SearchQuery= input.value;
        IndexPage= 1;
        FetchLoad()
    }   
})