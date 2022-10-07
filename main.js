// declaring & assigning inputs/variables
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let warningMsg = document.getElementById('warning');
let mode = 'create'; //intializing mode to be create
let tmp;
let dataPro; //array of data
let searchMode = 'title'; //intialize search mode for title
var newPro = new Object();
var table = '';

// --- keeping data if exist in local storage
if ( localStorage.product != null ) {
    dataPro = JSON.parse(localStorage.product);
}
else {
    dataPro=[];
}

// --- function get total
function getTotal()
{
    if ( price.value != '' ) {
        let result = +price.value + +taxes.value + 
        +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background= '#1abc9c';
    }
    else {
        total.innerHTML = '';
        total.style.background='#bdc3c7';
    }
}

// --- function write data in object newPro
function writeData() {
    newPro.title=title.value.toLowerCase();
    newPro.price=price.value;
    newPro.taxes=taxes.value;
    newPro.ads=ads.value;
    newPro.discount=discount.value;
    newPro.total=total.innerHTML;
    newPro.count=count.value;
    newPro.category=category.value.toLowerCase();
}

// --- function create button
function createButton() {
    writeData();
    if ( title.value != '' && price.value !='' && category.value !='' && newPro.count < 101 ) {
        if ( mode === 'create' ) { // create mode
        createProduct();
        }

        else { // update mode
        updateProduct();
        }
        warningMsg.innerHTML='';
        clearData();
    }
    else {
        warningMsg.innerHTML= `<h4 style="text-align: center; margin-top:20px; text-transform: uppercase; color:#e74c3c;">Please Enter Valid Data</h4>`
    }
    localStorage.setItem('product', JSON.stringify(dataPro) );
    showData();
    
}

// --- function create product
function createProduct() {
    if ( newPro.count > 1 ) {
        for(let i = 0; i< newPro.count; i++)
        {dataPro.push(newPro);}
    }   
    else {
        {dataPro.push(newPro);}
    }
    
}

// --- function update product
function updateProduct() {
    dataPro[tmp] = newPro;
    mode = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
    
}

// --- function clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// --- function write table

function writeTable( ) {
    for ( let i = 0; i < dataPro.length; i++ ) {
    table += `
    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
    }
}


// --- function show data

function showData()
{   getTotal()
    table = '';
        writeTable()
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if ( dataPro.length > 0 ) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
    }
    else { 
        btnDelete.innerHTML='';
    }
}
showData()



// --- function delete button
function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

// --- function delete all button
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// --- function update button
function updateData(para) {
    title.value = dataPro[para].title;
    price.value = dataPro[para].price;
    taxes.value = dataPro[para].taxes;
    ads.value = dataPro[para].ads;
    discount.value = dataPro[para].discount;
    category.value = dataPro[para].category;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mode = 'update';
    tmp = para;
    scroll({top:0,behavior:'smooth'});
}



// --- function get search mode
function getSearchMode(id) {   
    let search = document.getElementById('search');
    if ( id == 'searchTitle' ) { 
        searchMode = 'title';
    }
    else { 
        searchMode = 'category';
    }
    search.placeholder = 'Search by '+ searchMode;
    search.focus()
    search.value = '';
    showData()
}

// --- function search for data
function searchData(value) {
    table='';
    for ( let i = 0; i < dataPro.length; i++ ) {
        if ( searchMode == 'title' ) { 
            if ( dataPro[i].title.includes( value.toLowerCase() ) ) {
                searchResult(i)
            }
        }

        else { if ( dataPro[i].category.includes( value.toLowerCase() ) ) { 
            searchResult(i)
        }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// --- function search result table
function searchResult(i) {
    table += `
    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
    }
