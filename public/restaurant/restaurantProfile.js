

firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        var uid = user.uid;

        firebase.database().ref(`restaurant/${uid}`).once('value', (data) => {

            let profileName = document.getElementById('profileName')


            // profileName.innerHTML = data.val().username.toUpperCase()
            profileName.innerHTML = `<div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            ${data.val().username.toUpperCase()}
            </button>
            <div class="dropdown-menu mt-60" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="../customer/customerLogin.html">Login as Customer</a>
              <a class="dropdown-item" href="#" onclick="logout()">Logout</a>
             
            </div>
          </div>`



        })
    } else {
        window.location = "../index.html"
    }
});


let logout = () => {
    firebase.auth().signOut()
        .then(() => {
            window.location = "../index.html"
        })
}


firebase.database().ref(`restaurant`).on('child_added', (data) => {
    // console.log(data.val().categories)

    let a = data.val().categories

    for (var key in a) {
        for (var key1 in a[key]) {

            // console.log(a[key][key1].image)

            let row = document.getElementById('row');

            row.innerHTML += `
  <div class="col-lg-3 col-md-4 col-sm-6 mt-3">
            <div class="card">
                    <img src="../images/${a[key][key1].image}" style="height:200px" class="card-img-top" alt="...">
                        <div class="card-body">
                    <h5 class="card-title">${a[key][key1].Itemname}</h5>
                     <p class="card-text">Category: ${a[key][key1].category}</p>
                     <p class="card-text">Delivery Type: ${a[key][key1].deliveryType}</p>
                     <p class="card-text">Price: ${a[key][key1].price}</p>
                     <button  type="button" class="btn btn-danger" onclick="del(this)" >Delete Item</button>
                    </div>
                        </div>
                        </div>`

        }
    }

})




let dishes = document.getElementById('dishes');
dishes.innerHTML = `<div class="mt-120">
<div class="row" id="row">

</div>
</div>`

let myDishes = () => {
    window.location.reload();
}



let addDishes = () => {
    let dishes = document.getElementById('dishes');
    dishes.innerHTML = `
    <div class="container mt-5">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Add New Dish</h5>

                        <div class="input-div">

                            <input type="text" id="name" class="form-control" placeholder="Item Name" autofocus
                                required>
                        </div>


                        <div class="input-div">

                            <input type="number" id="price" class="form-control" placeholder="Price" required>
                        </div>
                        <div class="input-div">

                        <select class="form-control" id="category">
                        <option>Select Item</option>
                        <option>Burger</option>
                        <option>Rice</option>
                        <option>Pizza</option>
                        <option>Roll</option>
                      </select>
                        </div>
                    
                        <div class="input-div">

                        <select class="form-control" id="deliveryType">
                        <option>Delivery Type</option>
                        <option>Free</option>
                        <option>Paid</option>
                       
                      </select>
                        </div>

                        <div class="input-div">

                            <input type="file" id="image" class="" placeholder="Food Image" required>
                        </div>

                        <div class="custom-control custom-checkbox mb-3">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">Remember me</label>
                        </div>
                        <button onclick="submit()" id="btnText" class="btn btn-lg btn-primary btn-block text-uppercase">
                            <span id="text">Submit</span>
                            <div class="text-center" style="display: none;" id="loader">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden"></span>
                                </div>
                            </div>
                        </button>

                        <div class="alert alert-danger mt-3" role="alert" id="redAlert" style="display: none;">
                            A simple danger alert—check it out!
                        </div>

                        <div class="alert alert-success mt-3" role="alert" id="greenAlert" style="display: none;">
                            A simple success alert—check it out!
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>`
}


let submit = () => {
    let Itemname = document.getElementById('name')
    let price = document.getElementById('price')
    let category = document.getElementById('category')
    let deliveryType = document.getElementById('deliveryType')
    let image = document.getElementById('image')
    // console.log(image.files[0])
    let imageSrc = image.files[0]
// console.log(imageSrc.name)
    if (Itemname.value !== "" || price.value !== "") {


        let newItem = {
            Itemname: Itemname.value,
            price: price.value,
            category: category.value,
            deliveryType: deliveryType.value,
            image: imageSrc.name
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                var uid = user.uid;

                firebase.database().ref(`restaurant/${uid}/categories`).child(category.value).child(Itemname.value).update(newItem)

            }
        })

        // name.value = ""
        // price.value = ""

    }

    else { alert('fill all fields') }
}



