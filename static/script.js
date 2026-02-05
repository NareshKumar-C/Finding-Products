document.addEventListener("DOMContentLoaded",()=>{
    fetchProducts();
})
document.querySelectorAll('select').forEach(select=>{
    select.addEventListener('change',fetchProducts);
})
 
function fetchProducts(){
    const params=new URLSearchParams();
    const brand=document.querySelector("[name='brand']").value;
    const range=document.querySelector("[name='range']").value;
    const models=document.querySelector("[name='models']").value;
    const displayresolution=document.querySelector("[name='displayresolution']").value;
    const os=document.querySelector("[name='os']").value;
    const inches=document.querySelector("[name='inches']").value;

    if (brand!='def'){
        params.append('brand',brand);
    }

    if(range!='def'){
        const[min,max]=range.split('-')
        params.append('minprice',min)
        params.append('maxprice',max)
    }

    if (models!='def'){
        params.append('models',models);
    }

    if (displayresolution!='def'){
        params.append('displayresolution',displayresolution);
    }

    if (os!='def'){
        params.append('os',os);
    }

    if (inches!='def'){
        params.append('inches',inches);
    }

    fetch(`/api/collection?${params.toString()}`)
    .then(res=>res.json())
    .then(data=>renderProducts(data))
}

function renderProducts(collection){
    const container = document.getElementById("product-list")
    container.innerHTML=""
    if(collection.length==0){
        container.innerHTML="<p style='font-size:30px;'>No Products Found</p>"
        return;
    }

    let row;

    collection.forEach((c)=>{
        row=document.createElement("div")
        row.className='r1'
        container.appendChild(row);
        const card=document.createElement("div")
        card.className='r'
        card.innerHTML=`
        <img src="/static/images/${c.image}">
        <h2>${c.name}</p>
        <h3>₹${c.price}</h3>
        <button onclick='openProduct(${JSON.stringify(c)})'>Description</button>
        `;
        row.appendChild(card);
    })
}


function openProduct(c){
    document.getElementById("m-img").src = `/static/images/${c.image}`;
    document.getElementById("m-name").innerText = c.name;
    document.getElementById("m-desc").innerText = c.description;
    document.getElementById("m-brand").innerText = c.brand;
    document.getElementById("m-res").innerText = c.resolution;
    document.getElementById("m-inch").innerText = c.inches;
    document.getElementById("m-os").innerText = c.os;
    document.getElementById("m-price").innerText = c.price;
    document.getElementById("m-stock").innerText = c.stock;

    document.getElementById("productModal").style.display = "flex";
}

function closeModal(){
    document.getElementById("productModal").style.display = "none";
}


document.querySelector("#clear").addEventListener("click",()=>{
    document.querySelectorAll("select").forEach(select=>{
        select.value="def";
    })
        fetchProducts();
})