// call inputs
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

let mode = 'create';
let tmp;

// get total

function getTotal()
{
    if(price.value != '')
    {
        let result = +price.value + +taxes.value + 
        +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background= '#1abc9c';
    }
    else
    {
        total.innerHTML = '';
        total.style.background='#bdc3c7';
    }
}

// --- create/update product

let dataPro;

if(localStorage.product != null)
{
    dataPro = JSON.parse(localStorage.product);
}
else{dataPro=[];}

function CreateProduct()
{
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
// count & create mode

if(title.value != '' 
&& price.value !='' 
&& category.value !=''
&& newPro.count < 101) /*if there is no data 
                        it won't create the product*/
{

    if(mode === 'create')
{
    if(newPro.count > 1)
    {
        for(let i = 0; i< newPro.count; i++)
        {dataPro.push(newPro);}
    }else
    {
        {dataPro.push(newPro);}
    }
    }

    else
    {
    dataPro[tmp] = newPro;
    mode = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
    }

    warningMsg.innerHTML='';

    clearData()
}

//warning message if data is not valid
else{warningMsg.innerHTML= `'<h4 style="text-align: center; margin-top:20px; text-transform: uppercase; color:#e74c3c;">Please Enter Valid Data</h4>';`}




    localStorage.setItem('product', JSON.stringify(dataPro) );

    
    showData()
}

// --- create product

// clear inputs

function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showData()
{   getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length; i++)
    {
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
                </tr>
        `;
        
    }

    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll')
    if(dataPro.length > 0)
    {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{btnDelete.innerHTML='';}
}

showData()



// delete

function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

// delete all

function deleteAll()
{
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// update

function updateData(para)
{
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


// search

let searchMode = 'title';

function getSearchMode(id)
{   let search = document.getElementById('search');

    if(id == 'searchTitle')
    {searchMode = 'title';}
    else
    {searchMode = 'category';}

    search.placeholder = 'Search by '+ searchMode;
    search.focus()
    search.value = '';
    showData()
}

function searchData(value)
{   let table ='';
    for(let i = 0; i < dataPro.length; i++) {

        function writeTable(){
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

        if(searchMode == 'title')
        {if(dataPro[i].title.includes(value.toLowerCase())){writeTable()}}

        else
        {if(dataPro[i].category.includes(value.toLowerCase())){writeTable()}}
    }

    

    document.getElementById('tbody').innerHTML = table;

}

