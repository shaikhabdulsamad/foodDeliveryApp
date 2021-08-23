let getItems = JSON.parse(localStorage.getItem('Items')) 
// console.log(getItems)

for(var i= 0; i< getItems.length; i++){
    
    // console.log(getItems[i].itemName)


let cartItem = document.getElementById('cartItem')
cartItem.innerHTML += `

  
    <tr>
      <th scope="row">${i+1}</th>
      <td>${getItems[i].itemName}</td>
      <td>1</td>
      <td>${getItems[i].itemPrice}</td>
    
    </tr>
  
`


}


