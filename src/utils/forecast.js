const request=require('request')

const forecast=(lattitude,longitude,callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=8c12e30a4af37469f0099d0c43aa9671&query='+lattitude+','+longitude  
 request({url:url,json:true},(error,response)=>{
     if(error){
         callback('please check network connection')
     }else if(response.body.error){
        callback('please enter valid data',undefined)
     }else{
         callback(undefined,'It is currently '+response.body.current.temperature+' degrees out. Threr is a '+response.body.current.precip+'% of rain')
         }
 })
 }
 module.exports=forecast