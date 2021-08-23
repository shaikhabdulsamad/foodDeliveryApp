
firebase.database().ref(`restaurant`).on('child_added', (data) => {
    // console.log(data.val().categories)

    let a = data.val().categories

    for (var key in a) {
        for (var key1 in a[key]) {

            // console.log(a[key][key1].image)

            let row = document.getElementById('row');

            row.innerHTML += `
  <div class="col-lg-3 col-md-4 col-sm-6 mt-3">
            <div class="card" >
                    <img src="images/${a[key][key1].image}" style="height:200px" class="card-img-top" alt="...">
                        <div class="card-body">
                    <h5 class="card-title">${a[key][key1].Itemname}</h5>
                    <p class="card-text">${a[key][key1].deliveryType} Delievery</p>
                     <p class="card-text">Rs. <span>${a[key][key1].price}</span>/-</p>
                     <button type="button" class="btn btn-primary" onclick="addToCart(this)">Buy now</button>
                    </div>
                        </div>
                        </div>`

        }
    }

})




let dishes = document.getElementById('dishes');
dishes.innerHTML = `<div class="continer-md mt-3">
<div class="row" id="row">

</div>
</div>`



let addToCart = function(e){
let ItemName = e.parentNode.firstChild.nextSibling.innerText
let ItemPrice = e.previousSibling.previousSibling.firstChild.nextSibling.innerText

// console.log(e.previousSibling.previousSibling.firstChild.nextSibling.innerText)
if(localStorage.getItem('Items') === null){
    var abc = [];
    localStorage.setItem('Items', JSON.stringify(abc));  
}

var items = {
    itemName: ItemName,
    itemPrice: ItemPrice,

}


var get =  JSON.parse(localStorage.getItem('Items'));
get.push(items);

localStorage.setItem('Items', JSON.stringify(get));

}

let about = ()=>{
    swal("E-Restaurant", "E-Restaurant is an online food ordering platform with a difference – We constantly reward our customers! Get instant cashback on every delivery, dine-in, or takeaway. Be it a cup of coffee or a treat for the entire family, you get cashback on every bite!");
}