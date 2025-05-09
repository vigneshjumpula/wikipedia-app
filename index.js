// let searchInputEl=document.getElementById("searchInput");
// let searchResultsEl=document.getElementById("searchResults");
// let spinnerEl=document.getElementById("spinner");


// function createAndAppendData(res){
//     let {link,title,description}=res;
//     let resultItemEl=document.createElement("div");
//     resultItemEl.classList.add("result-item");

//     let titleEl=document.createElement("a");
//     titleEl.href=link;
//     titleEl.target="_blank";
//     titleEl.textContent=title||"No Title Available";
//     titleEl.classList.add("result-title");
//     resultItemEl.appendChild(titleEl);

//     let titleBreakEl = document.createElement("br");
//     resultItemEl.appendChild(titleBreakEl);

//     let url=document.createElement("a");
//     url.href=link;
//     url.target="_blank";
//     url.textContent=link;
//     url.classList.add("result-url");
//     resultItemEl.appendChild(url);

//     let linkBreakEl = document.createElement("br");
//     resultItemEl.appendChild(linkBreakEl);

//     let des=document.createElement("p");
//     des.classList.add("link-description");
//     des.textContent=description || "No Description Available";
//     resultItemEl.appendChild(des);
//     searchResultsEl.appendChild(resultItemEl);
// }
// function display(search_results){
//     spinnerEl.classList.add("d-none");
//     for(let res of search_results){
//         createAndAppendData(res);
//     }
// }

// function searchWikipedia(event){
//     if(event.key==="Enter"){
//         spinnerEl.classList.remove("d-none");
//         searchInputEl.textContent="";
//         searchResultsEl.textContent="";
    
//     let search=searchResultsEl.value;
//     //https://apis.ccbp.in/wiki-search?search=taj%20mahal
//     let url = "https://apis.ccbp.in/wiki-search?search=" + search;
//     // let url="https://apis.ccbp.in/wiki-search?search=" + search;
//     // let search = searchResultsEl.value;
//     // let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${search}`;
    
//     let options={
//         method:"GET"
//     };
//     fetch(url, options)
//     .then(function (response) {
//     return response.json();
//     })
//     .then(function (jsonData) {
//     let { search_results } = jsonData;
//     display(search_results);
//     });
// }
// }

// searchInputEl.addEventListener("keydown",searchWikipedia);

let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendData(res) {
    let { link, title, description } = res;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title || "No Title Available";
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let url = document.createElement("a");
    url.href = link;
    url.target = "_blank";
    url.textContent = link;
    url.classList.add("result-url");
    resultItemEl.appendChild(url);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let des = document.createElement("p");
    des.classList.add("link-description");
    des.textContent = description || "No Description Available";
    resultItemEl.appendChild(des);

    searchResultsEl.appendChild(resultItemEl);
}

function display(search_results) {
    spinnerEl.classList.add("d-none");
    for (let res of search_results) {
        createAndAppendData(res);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let search = searchInputEl.value;

        let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${search}`;

        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonData) {
             
                let search_results = jsonData.query.search.map(result => {
                    return {
                        title: result.title,
                        link: `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`,
                        description: result.snippet.replace(/<\/?[^>]+(>|$)/g, "")
                    };
                });
                display(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
