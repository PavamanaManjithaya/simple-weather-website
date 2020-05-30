const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token=pk.eyJ1IjoicGF2YW1hbmEiLCJhIjoiY2thYzliY3kwMHU0MTJycDk2YjhvNXU0ZCJ9.7l8ZW0zcLnN3VaQtVYInOw'
    
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('please check network connection')
        }else if(response.body.features.length===0){
           callback('please enter valid data',undefined)
        }else{
            callback(undefined,{
                lattitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
        })
            }
    })
    }
    module.exports=geocode