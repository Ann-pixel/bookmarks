const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm= document.getElementById("bookmark-form");
const websitNameEL = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container")
let bookmarks = [];

// Show Modal, Focus on Input

function showModal(){
    modal.classList.add("show-modal");
    websitNameEL.focus();
}

//close modal
function closeModal(){
    modal.classList.remove("show-modal");
}

// Modal event listener
modalShow.addEventListener("click", showModal)
modalClose.addEventListener("click", closeModal);
window.addEventListener("click", (evt)=> evt.target === modal ? closeModal() : null)

//Validate form 
function validate(nameValue, urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert("Please submit values for both fields.");
        return false;
    }
    if (urlValue.match(regex)) {
        
    }
    if(!urlValue.match(regex)){
        alert("Please provide a valid web address");
        return false
    }
    return true;
}
// fetch bookmarks
function fetchBookmarks(){
    if(localStorage.getItem("bookmarks")){
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    } else {
        // Create bookmarks array
        bookmarks = [{
            name : "Gauri Mhaiskar",
            url : "https://gaurimhaiskar.com"
        }];
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    }
    console.log(bookmarks);
}
//Handle data from form
function storeBookmark(evt){
    evt.preventDefault();

    const nameValue = websitNameEL.value;
    let urlValue = websiteUrlEl.value;
    if(!urlValue.includes("https://") && !urlValue.includes("http://")){
        urlValue= `https://${urlValue}`
    }
    if(!validate(nameValue, urlValue)){
        return false;
    }
    const bookmark =  {
        name : nameValue,
        url : urlValue
    };

    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    fetchBookmarks();
    bookmarkForm.reset();
    websitNameEL.focus();
}

//Event listener
bookmarkForm.addEventListener("submit", storeBookmark)
//On load
fetchBookmarks()
