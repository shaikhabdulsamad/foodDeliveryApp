
let signin = () => {
    let email1 = document.getElementById('email1')
    let password1 = document.getElementById('password1')
    let loader = document.getElementById('loader')
    let text = document.getElementById('text')
    loader.style.display = "block"
    text.style.display = "none"
  
    let redAlert = document.getElementById('redAlert')
    let greenAlert = document.getElementById('greenAlert')
  
  
    firebase.auth().signInWithEmailAndPassword(email1.value, password1.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // console.log(user)
  
        // firebase.database().ref(`users/${user.uid}`).once('value', (data) => {
  
        //   console.log(data.val())
        // })
          // .then((res) => {
            loader.style.display = "none"
            text.style.display = "block"
            greenAlert.innerHTML = "Logined successfully"
            greenAlert.style.display = "block"
  
            email1.value = ""
            password1.value = ""
  
            setTimeout(() => {
              window.location = "customerProfile.html"
              
            }, 1000)
          })
      // })
      .catch((error) => {
        var errorMessage = error.message;
        // console.log(errorMessage)
  
        loader.style.display = "none"
        text.style.display = "block"
        
          redAlert.innerHTML = errorMessage
          redAlert.style.display = "block"
          
        
       
      })
     
  }
  
  
  window.onkeydown = function(event){
    if(event.keyCode === 13){
      
      signin()
    }
    
    }