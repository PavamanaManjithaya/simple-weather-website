const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message1')
const messagetwo=document.querySelector('#message2')
weatherform.addEventListener('submit',(e)=>{
e.preventDefault()

const location=search.value


messageone.textContent='Loading....'
messagetwo.textContent=''

fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
    if(data.error){
        messageone.textContent=data.error
    }else{
         messageone.textContent=data.location
         messagetwo.textContent=data.forecast
         console.log(data.forecast)
    }
    })
 })
})