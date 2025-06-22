var bookmarkNameInput= document.getElementById('bookmarkName');
var bookmarkUrlInput= document.getElementById('bookmarkURL');

allBookMarks = [];

    var markNameRegex = /^[\w\d]{3,20}$/i ;
    var markUrlRegex = /[\w\d]{3,}.com$/i ;

(function() {
    if ( localStorage.getItem('allBookmarks') != null ){
        allBookMarks = JSON.parse(localStorage.getItem('allBookmarks'));
    }
    displayAllBookmarks();
    })();


function addToBookmark (){
    var bookmark = {
        siteName: bookmarkNameInput.value,
        siteUrl: bookmarkUrlInput.value,
    }
    if(validateIpnut(markNameRegex,bookmark.siteName,"Site name must contain at least 3 characters") && validateIpnut(markUrlRegex,bookmark.siteUrl,"Site URL must be a valid one")){
    bookmark.siteUrl = urlCutString(bookmark.siteUrl);
    allBookMarks.push(bookmark);
    displayAllBookmarks ()
    localStorage.setItem('allBookmarks',JSON.stringify(allBookMarks))   
    // console.log(displayAllBookmarks ());
    clearForm();
    }
    
}



function clearForm (){
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
}

function displayAllBookmarks (){
    var StringContainer = ''
    for (i=0 ; i< allBookMarks.length ; i++){
         StringContainer += `
         <tr>
            <td>${i+1}</td>
            <td>${allBookMarks[i].siteName}</td>
            <td>
              <a target="_blank" href="https://www.${allBookMarks[i].siteUrl}">
                <button onclick="" class="btn btn-visit">
                <i class="fa-solid fa-eye pe-2"></i>
                <span>Visit</span>
                </button>
              </a>
            </td>
            <td>
              <button onclick="deleteBookMark(${i})" class="btn btn-delete pe-2">
                <i class="fa-solid fa-trash-can"></i>
                <span>Delete</span>
              </button>
            </td>
            <td>
              <button onclick="editeBookmark(${i})" class="btn"><i class="fa-regular fa-pen-to-square"></i></button>
            </td>
          </tr>
        `
    }
    document.getElementById("tableContent").innerHTML= StringContainer;
}

function deleteBookMark(indx){
    allBookMarks.splice(indx,1);
    localStorage.setItem('allBookmarks',JSON.stringify(allBookMarks))   
    displayAllBookmarks();
}

function editeBookmark(indx){
    (function() {
        bookmarkNameInput.value = allBookMarks[indx].siteName;
        bookmarkUrlInput.value = allBookMarks[indx].siteUrl;
    })();  // putting values in fields
    
    document.getElementById("add-update").innerHTML=
    `
        <button onclick="updateBookmark(${indx})" type="button" class="btn btn-outline-success">Update</button>

    `
    ;
}

function updateBookmark(indx){
    var newValues = {
        siteName: bookmarkNameInput.value,
        siteUrl: bookmarkUrlInput.value,
        
    }
    allBookMarks.splice(indx,1,newValues);
    clearForm();
    document.getElementById("add-update").innerHTML=
    `
    <button onclick="addToBookmark()" class="btn btn-outline-danger px-5">Submit</button>
    `
    ;
    localStorage.setItem('allBookmarks',JSON.stringify(allBookMarks))   
    displayAllBookmarks();
}

function searchElemnt(term){
        var StringContainer = ''
        for(i=0;i<allBookMarks.length;i++){
        if(allBookMarks[i].siteName.toLowerCase().includes(term.toLowerCase())){
        
          StringContainer += `
         <tr>
            <td>${i+1}</td>
            <td>${allBookMarks[i].siteName}</td>
            <td>
              <a target="_blank" href="https://${allBookMarks[i].siteUrl}">
                <button onclick="" class="btn btn-visit">
                <i class="fa-solid fa-eye pe-2"></i>
                <span>Visit</span>
                </button>
              </a>
            </td>
            <td>
              <button onclick="deleteBookMark(${i})" class="btn btn-delete pe-2">
                <i class="fa-solid fa-trash-can"></i>
                <span>Delete</span>
              </button>
            </td>
            <td>
              <button onclick="editeBookmark(${i})" class="btn"><i class="fa-regular fa-pen-to-square"></i></button>
            </td>
          </tr>
        `
        }
        }
    document.getElementById("tableContent").innerHTML= StringContainer;    
}

function validateIpnut(regex,element,errorMessage){
    if (regex.test(element) == true){
        return regex.test(element);
    }
    else{
        alert(errorMessage) 
    }
}

function urlCutString(stringcut){
    var lower = stringcut.toLowerCase();
    if (lower.startsWith('https://www.')) {
        return stringcut.substring(12);
    } else if (lower.startsWith('http://www.')) {
        return stringcut.substring(11);
    } else if (lower.startsWith('https://')) {
        return stringcut.substring(8);
    } else if (lower.startsWith('http://')) {
        return stringcut.substring(7);
    } else if (lower.startsWith('www.')) {
        return stringcut.substring(4);
    } else {
        return stringcut;
    }
}
