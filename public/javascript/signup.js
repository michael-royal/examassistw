let repeated = false,
    confirmed = false
const emailHolder = document.getElementById('emailHolder'),
      phoneHolder = document.getElementById('phoneHolder')
const forms = document.querySelectorAll('.main_form'),
        haves = document.querySelectorAll('.haves'),
        email = document.querySelector('#email'),
        phone = document.querySelector('#phone'),
      
        inputs = document.querySelectorAll('input')
    console.log(inputs)
const   signupbtn = document.getElementById('signupbtn'),
      
        getUsers = fetch('http://localhost:8080/users/api').then(res => res.json()).then((data) =>{
            console.log(data)
            email.addEventListener('input', ()=>{
                const matched =  data.filter(data => email.value === data.email)

                if (matched.length > 0) {
                    repeated = true
                  console.log(matched)
                }else{
                    repeated = false
                }

                if (repeated) {
                    signupbtn.setAttribute('disabled','true')
                    alert('This Email has already been used')
                    
                }else{
                    signupbtn.disabled = false;
                   
                }
            })
            phone.addEventListener('input', ()=>{
                const matched =  data.filter(data => phone.value === data.phone)

                if (matched.length > 0) {
                  console.log(matched)
                  repeated = true
                }else{
                    repeated = false 
                }

                
                if (repeated) {
                    signupbtn.setAttribute('disabled','true')
                    alert('This Email has already been used')
                
                    
                }else{
                    signupbtn.disabled = false;
                }
            })

        })

const regex = {
    firstname:/^[A-Z][(a-z)]{4,}$/,
    lastname:/^[A-Z][(a-z)]{4,}$/,
    email: /^[(a-z)]+\d*@gmail\.com$/,
    phone:  /^0(\d){10}$/,
    password: /[\w+]{8,}/,
    confirmpwd: /[\w+]{8,}/,
    profile: /.+/s


}

const password = document.querySelector('#password'),
      confirmpwd = document.querySelector('#confirmpwd')

confirmpwd.addEventListener('input', checkpwd)
function checkpwd(){
     if (password.value === confirmpwd.value) {
         confirmed = true;
            
          }else{
            confirmed = false;
          }
          if (confirmed) {
            signupbtn.disabled = false;
          }else{
            signupbtn.setAttribute('disabled', 'true')
            
          }
          console.log(confirmed)
          // console.log(password, confirmpwd)
}


const validate = (field,regex)=>{
    if (regex.test(field.value) === true) {
         field.nextElementSibling.classList.add('d-none')
    }else{
        field.nextElementSibling.classList.remove('d-none')
        console.log(field.parentElement)
        

    }

    console.log(regex.test(field.value))
}

inputs.forEach((input) =>{
    input.addEventListener('input', (e) =>{
        validate(e.target,regex[e.target.attributes.name.value])
    })
})

inputs.forEach((input) =>{
    if (input === '') {
        alert('fill in all fields')
    }
})



// clear()