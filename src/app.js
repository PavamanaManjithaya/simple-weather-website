const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
//define path for express config
const publicpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

//setup handlebars&views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)


app.use(express.static(publicpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'WEATHER',
        name:'pavamana'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        helptext:'cpoyright@google',
        name:'pavamana'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'pavamana'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
 geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(lattitude,longitude, (error, forecastdata) => {
            if(error){
                return res.send({error}) 
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
                })
    })
    
})
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'pavamana',
        errormsg:'help airticle not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'pavamana',
        errormsg:'page not found'
    })
})

app.listen(3000,()=>{
    console.log('server running at 3000!!')
})