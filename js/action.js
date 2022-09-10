let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let Category=document.getElementById("Category");
let creat=document.getElementById("creat");
let search=document.getElementById("search");



// variable of js to store Data
// array to save A data in local storage 
let storeData;
// array to save A data with A part of have A update of storeDate
let StoreChange;
// number save index of change for update
let numberIndexChanges;

//  function to start to retive the data from local storage 
(function()
    {
        if(localStorage.getItem("product")!=null)
        {
            storeData=JSON.parse(localStorage.getItem("product"));
            displayDate();
            displayRemoveData();
        }   
        else
        {
            storeData=[];

        }
    }

)();


// get total of price 

// firset step check of price and descount to applay single responsibility;


//check price is valuid
//  make a parameter to can use function of creat and update of Project 
function validPrice(numbervalid)
{
    if(Number(numbervalid)!="" &&Number(numbervalid)>=0 )
    {
        return true;
    }
        else
    {
       return false;
    }
}



// function check descount
function checkDiscount(numberDiscount)
{
    if(numberDiscount!="")
    {
        return true;
    }
    else
    {
        numberDiscount=0;
        return false;
    }
}

function getTotal(price,taxes,ads,discount)
{
    if(validPrice(Number(price.value))==true)
    {

            if(checkDiscount(Number(discount.value))==true)
            {
                let resualte=(Number(price.value)+Number(taxes.value)+Number(ads.value))-Number(discount.value);

                total.innerHTML=resualte;
                total.style.background="#005506";
                return true;
            }
            else
            {
                let resualte=(Number(price.value)+Number(taxes.value)+Number(ads.value));
                total.innerHTML=resualte;
                total.style.background="#005506";
                return true;

            }
    }
    else
    {
        total.style.background="red";  
        total.innerHTML="";
        return false;
    }
}
getTotal(price,taxes,ads,discount);

function addProduct()
{
let container=
{
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    Category:Category.value,
}

    if(getTotal(price,taxes,ads,discount)==true && counter()==true)
    {
        storeData.push(container); 
    }

    if(getTotal(price,taxes,ads,discount)==true && counter()==false)
    {
        for(let m=0 ; m<count.value;m++)
        {
            storeData.push(container); 
        }
    }
    localStorage.setItem('product',JSON.stringify(storeData));
    // TO SAVE data in local storage
    clear();
    displayDate();
    getTotal(price.value,taxes.value,ads.value,discount.value);
    displayRemoveData();
}


// function to make the value of empty
function clear()
{
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    count.value="";
    Category.value="";
}

function displayDate()
{
    concat='';

    for(let i=0;i<storeData.length;i++)
    {
        
        concat +=`           
         <tr>
            <td>${i}</td>
            <td>${storeData[i].title}</td>
            <td>${storeData[i].price}</td>
            <td>${storeData[i].taxes}</td>
            <td>${storeData[i].ads}</td>
            <td>${storeData[i].discount}</td>
            <td>${storeData[i].total}</td>
            <td>${storeData[i].Category}</td>
            <td><button onclick="Update(${i})">Update</button></td>
            <td><button onclick="removeItem(${i})">delete</button></td>
        </tr>` ; 
    }
    document.getElementById("tbody").innerHTML=concat;

}
// appear the button of delete All data
function displayRemoveData()
{
    if(storeData.length>0)
    {
        document.getElementById("deletAll").innerHTML=`<button onclick="removeStorage()">delete All(${storeData.length})</button>`
    }
    else
    {
        document.getElementById("deletAll").innerHTML=``
    }
}

// function to clear storage data and display data
function removeStorage()
{
    localStorage.removeItem('product');
    storeData=[];
    displayRemoveData()
    displayDate();
}




// function removeItem(){};
function removeItem(x)
{
  storeData.splice(x,1);  
localStorage.product=JSON.stringify(storeData)
displayRemoveData()
displayDate();
};

// function to chech data and use it in to make many data in the time  
function counter()
{
    if(count.value=="" ||count.value==0 ||count.value==1 )
    {
        return true;
    }
    else
    {
        return false;
    }
}

// function used to covert the for data static toooo  data in inputes to  make changes it 
function Update(x)
{   
    numberIndexChanges=x;
StoreChange=storeData[x];
let changesData=`
<tr>
<td><input class="changesUpdates" id="" type="text" value="${x}"disabled></td> 
<td><input  class="changesUpdates" id="changetitle" type="text" value="${StoreChange.title}"></td> 
<td><input class="changesUpdates" id="changeprice" type="text" oninput="UpdateTotal()" value="${StoreChange.price}"></td>  
<td><input  class="changesUpdates" id="changetaxes" type="text"oninput="UpdateTotal()"  value="${StoreChange.taxes}"></td> 
<td><input  class="changesUpdates" id="changeads" type="text"  oninput="UpdateTotal()" value="${StoreChange.ads}"></td> 
<td><input class="changesUpdates" id="changediscount" type="text" oninput="UpdateTotal()"    value="${StoreChange.discount}"></td> 
<td><input class="changesUpdates" id="changeTotal"  type="text" value="${StoreChange.total}" readonly></td>  
<td><input class="changesUpdates" id="changecategory" type="text" value="${StoreChange.Category}"></td> 
<td colspan="2"><i class="fs-1 text-primary fa-regular fa-circle-check" onclick="test()"> </i></td> 
</tr>
`;
document.getElementById("tbody").innerHTML=changesData;
}




// oninput="UpdateTotal()
// oninput="UpdateTotal()
// oninput="UpdateTotal()


function test()
{
    let changetitle=document.getElementById("changetitle");
    let changeprice=document.getElementById("changeprice");
    let changetaxes=document.getElementById("changetaxes");
    let changeads=document.getElementById("changeads");
    let changediscount=document.getElementById("changediscount");
    let changeTotal=document.getElementById("changeTotal");
    let changecategory=document.getElementById("changecategory");

    if(validPrice(changeprice.value)==true)
    {
        if(storeData[numberIndexChanges].title!=changetitle.value)
        {
            storeData[numberIndexChanges].title=changetitle.value;
        }

        if(storeData[numberIndexChanges].Category!=changecategory.value)
        {
            storeData[numberIndexChanges].Category=changecategory.value;
        }


        if(storeData[numberIndexChanges].price!=changeprice.value)
        {
            storeData[numberIndexChanges].price=changeprice.value;
        }
        if(storeData[numberIndexChanges].taxes!=changetaxes.value)
        {
            storeData[numberIndexChanges].taxes=changetaxes.value;
        }


        if(storeData[numberIndexChanges].ads!=changeads.value)
        {
            storeData[numberIndexChanges].ads=changeads.value;
        }

        if(storeData[numberIndexChanges].discount!=changediscount.value)
        {
            storeData[numberIndexChanges].discount=changediscount.value;
        }
        if(changeTotal.value!=storeData[numberIndexChanges].total)
        {
            storeData[numberIndexChanges].total=changeTotal.value;
        }
    }
    localStorage.setItem("product",JSON.stringify(storeData));
    displayDate();
}

function UpdateTotal()
{
   changeTotal.value=( +changeads.value + +changeprice.value + +changetaxes.value)- +changediscount.value;

}










// function used to makecompare for data and make latest update
// function compareChanges()
// {
//     console.log("asas")    ;
//     // input show to make changes in that 
// // let changetitle=document.getElementById("changetitle");
// // let changeprice=document.getElementById("changeprice");
// // let changetaxes=document.getElementById("changetaxes");
// // let changeads=document.getElementById("changeads");
// // let changediscount=document.getElementById("changediscount");
// // let changecategory=document.getElementById("changecategory");


// //     if(StoreChange.title!=changetitle.value)
// //     {
// //         storeData[numberIndexChanges].title=changetitle.value;
// //     }


// //     if(StoreChange.price!=changeprice.value)
// //     {
// //         if(validPrice(changeprice.value)==true)
// //         {
// //             storeData[numberIndexChanges].price=changeprice.value; 
// //         }
 
// //     }


// //     if(StoreChange.taxes!=changetaxes.value)
// //     {
// //         storeData[numberIndexChanges].taxes=changetaxes.value;
// //     }

// //     if(StoreChange.ads!=changeads.value)
// //     {
// //         storeData[numberIndexChanges].ads=changeads.value;  
// //     }


// //     if(StoreChange.discount!=changediscount.value)
// //     {
// //         storeData[numberIndexChanges].discount=changediscount.value;
// //     }
// //     if(StoreChange.Category!=changecategory.value)
// //     {
// //         storeData[numberIndexChanges].Category=changecategory.value;  
// //     }

// }
// function Update();
// function search();


