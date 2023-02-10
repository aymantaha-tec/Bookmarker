var siteName    = document.getElementById("site-name");
var webSiteURL  = document.getElementById("web-site-URL");
var btnSubmit   = document.getElementById("btn-submit");
var webTextName = document.getElementById("web-text-name");
var nameVaild   = document.getElementById("name-vaild");
var urlVaild   = document.getElementById("url-vaild");
var addRessURL  = document.getElementById("addressURL");
var listProduct = document.querySelector("#result .container");


var index;
var bookmarker;
if (localStorage.product != null) {
    bookmarker = JSON.parse(localStorage.product);
}
else {
    bookmarker =[];
}



function getMain (){

    getNameAndURL ();
    clearForm ()

    
};

 

function getNameAndURL () {
    
    var nameAndURL = {
        name: siteName.value,
        url: webSiteURL.value,
        
    }
    
    if ((siteName.value == '' || siteName.value == ' ') && (webSiteURL.value == '' || siteName.value == ' ')) {
        nameVaild.classList.remove('d-none');
        urlVaild.classList.remove("d-none");
    }

    else if ((siteName.value != '' || siteName.value != ' ') && (webSiteURL.value == '' || siteName.value == ' ')){
        nameVaild.classList.remove('d-none');
        urlVaild.classList.remove("d-none");
        nameVaild.innerHTML = "this url already exist";
    }
    else if ((siteName.value == '' || siteName.value == ' ') && (webSiteURL.value != '' || siteName.value != ' ')){
        nameVaild.classList.remove('d-none');
        urlVaild.classList.add("d-none");

    }
    else {
        nameVaild.classList.add('d-none');
        urlVaild.classList.add('d-none');
        bookmarker.push(nameAndURL);
        
        displayNameWeb()

    }

    localStorage.setItem("product", JSON.stringify(bookmarker))
};

displayNameWeb()
function displayNameWeb(){
    list = "";
    for(var i = 0 ; i < bookmarker.length ; i++ ){
        list += `
        <div class=" result-text  d-flex justify-content-between">
            <p id="web-text-name " class="fw-bold ">${bookmarker[i].name}</p>
            <div class="result-btntext">
                <button class="btn-site btn btn-primary" ><a class="text-decoration-none text-white" onclick="setHref(${i})"  target="_blank">Visit</a></button>
                <button class="btn-site btn btn-danger" onclick="del(${i})">Delete</button>
            </div>
        </div>
    ` 
    index = i;
    }
    
    listProduct.innerHTML = list;

};



function clearForm () {
    siteName.value = '';
    webSiteURL.value = '';

}

function setHref(index) {
    var url = bookmarker[index].url;
    var regex = /^http(s)?:\/\//
    if(regex.test(url)) {
        window.location.href = url
    } else {
        window.location.href = `https://${url}`
    }
};

function del(i){
    bookmarker.splice(i, 1);
    localStorage.product = JSON.stringify(bookmarker);
    displayNameWeb()
}











btnSubmit.addEventListener('click', getMain);