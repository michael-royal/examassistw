const reveal = document.getElementById('listgroup')

const ham = document.querySelector('#ham')

console.log(reveal)

const hide = () =>{
        reveal.classList.toggle('reav')
}

ham.addEventListener('click',hide)

