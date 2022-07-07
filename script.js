
//-------------------------- function for get data from api --------------------------------
async function getdata(lat,lon){  
    let url1=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=46f77e9660f18d961b9048556368fcf9`;
    let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=monthaly&appid=374b929e9dbb926db0761ca76e817fc9`;
    try{
        let res=await fetch(url)
        let data=await res.json()

        let res1=await fetch(url1)
        let data1=await res1.json()
        display(data,data1.name)
    }catch(e){
    }
}

//---------------------------- function for lat and lon from geolocation --------------------------
navigator.geolocation.getCurrentPosition(success);
function success(pos){
    const crd = pos.coords;
    let lat=crd.latitude
    let lon=crd.longitude
    getdata(lat,lon)
}


//--------------------------------- function for lat and lon from search ---------------------------
document.getElementById("btn").addEventListener("click",function(){
    search_val()
})
async function search_val(){
    let city=document.getElementById("search").value
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5dd92473dd772877a44c94ec69592de9`
    try{
        let res=await fetch(url)
        let data=await res.json()
        let lat=data.coord.lat
        let lon=data.coord.lon
        getdata(lat,lon)
    }catch(e){
    }
}


//----------------------------------- function for display data --------------------------------------
function display(data,name){
let city=document.getElementById("city")
city.innerHTML=name

let tdy=document.getElementById("tdy")
let tdy_dt=new Date(data.current.dt*1000-(3600*1000))
let yer=tdy_dt.getFullYear()
let mnt=getmonths(tdy_dt)
let dte=tdy_dt.getDate()
let hor=gethours(tdy_dt)
let minu=getmin(tdy_dt)
let dy=getDays(tdy_dt)
tdy.innerHTML=`${dy}&nbsp&nbsp&nbsp${dte}&nbsp${mnt}&nbsp${yer}&nbsp&nbsp&nbsp${hor}:${minu}`

let tmp_logo=data.current.weather[0].icon
let img=document.createElement("img")
img.src=`http://openweathermap.org/img/wn/${tmp_logo}@2x.png`
let tp_lg=document.getElementById("tmp_logo")
tp_lg.innerHTML=null
tp_lg.append(img)

let temp=document.getElementById("temp")
temp.innerHTML=`&nbsp${data.current.temp}°`

let hum=document.getElementById("hum")
hum.innerHTML=`Humidity ${data.current.humidity}%`

let dew=document.getElementById("dew")
dew.innerHTML=`Dew point ${data.current.dew_point}°`

let sunrise=document.getElementById("sunrise")
let sunr=new Date(data.current.sunrise*1000-(3600*1000))
var sunmin=getmin(sunr)
var sunhor=gethours(sunr)
sunrise.innerHTML=`Sunrise ${sunhor}:${sunmin}`

let sunset=document.getElementById("sunset")
let suns=new Date(data.current.sunset*1000-(3600*1000))
var sunsmin=getmin(suns)
var sunshor=gethours(suns)
sunset.innerHTML=`Sunset ${sunshor}:${sunsmin}`

let env=document.getElementById("env")
env.innerHTML=data.current.weather[0].main
let back=document.querySelector("html")
if(data.current.weather[0].main=="Haze"){
    back.style.backgroundImage = "url('https://i.gifer.com/GCup.gif')"
}
if(data.current.weather[0].main=="Rain"){
    back.style.backgroundImage = "url('https://i.pinimg.com/originals/6b/6d/c2/6b6dc2cf132ca0e9fc1ad397e59edb68.gif')"
}
if(data.current.weather[0].main=="Clouds"){
    back.style.backgroundImage = "url('https://i.gifer.com/srG.gif')"
}

let d=new Date(data.current.dt*1000-(3600*1000))
let mt=getmonths(d)

displayNextDay(data.daily)
displayNextHours(data.hourly)
}

//------------------------------------- function for display next 7 days data ------------------------------------
function displayNextDay(data){
document.getElementById("days_data").innerHTML=null

data.forEach(el => {

    let div=document.createElement("div")
    div.setAttribute("class","day_card")

    let sunrise=new Date(el.sunrise*1000-(3600*1000))
    var sunmin=getmin(sunrise)
    var sunhor=gethours(sunrise)

    let sunset=new Date(el.sunset*1000-(3600*1000))
    var sunsmin=getmin(sunset)
    var sunshor=gethours(sunset)

    let day=new Date(el.dt*1000-(3600*1000))
    var tday=getDays(day)

      let p1=document.createElement("p")
      p1.setAttribute("class","day")
      p1.innerText=`${tday}`

      let p2=document.createElement("img")
      let tmp_logo=el.weather[0].icon
      p2.setAttribute("class","weth_logo")
      p2.src=`http://openweathermap.org/img/wn/${tmp_logo}@2x.png`
      
      let div1=document.createElement("div")
      div1.setAttribute("class","tmp_div")
            let p3=document.createElement("p")
            p3.setAttribute("class","max_temp")
            p3.innerText=`${el.temp.max}°`

            let p4=document.createElement("p")
            p4.setAttribute("class","min_temp")
            p4.innerText=`${el.temp.min}°`
      div1.append(p3,p4)

      let div2=document.createElement("div")
      div2.setAttribute("class","sun_div")
            let p5=document.createElement("p")
            p5.innerText=`Sunrise ${sunhor}:${sunmin}`

            let p6=document.createElement("p")
            p6.innerText=`Sunset ${sunshor}:${sunsmin}`
            p6.setAttribute("class","sunset")
      div2.append(p5,p6)

      let p7=document.createElement("p")
      p7.setAttribute("class","weth")
      p7.innerText=el.weather[0].main

      div.append(p1,p2,div1,div2,p7)

      let container=document.getElementById("days_data")
      container.append(div)

});
}

//-------------------------------------- function for display hours data-------------------------------------
function displayNextHours(data){
    document.getElementById("hours_data").innerHTML=null

data.forEach(el => {

    let div=document.createElement("div")
    div.setAttribute("class","day_card")

    let day=new Date(el.dt*1000-(3600*1000))
    var hours=gethours(day)
    let min=getmin(day)

      let p1=document.createElement("p")
      p1.setAttribute("class","day")
      p1.innerText=`${hours}:${min}`

      let tmp=document.createElement("p")
      tmp.innerText=`${el.temp}°`
      tmp.setAttribute("class","day_tmp")

      let p2=document.createElement("img")
      p2.setAttribute("class","weth_logo")
      p2.src=`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`
      
      let p7=document.createElement("p")
      p7.setAttribute("class","hour_weth")
      p7.innerText=el.weather[0].main

      let wind=document.createElement("p")
      wind.setAttribute("class","wind")
      let w=el.wind_speed*3600/1000
      w=w.toFixed(1)
      wind.innerText=`Wind: ${w}km/h`

      div.append(p1,tmp,p2,p7,wind)

      let container=document.getElementById("hours_data")
      container.append(div)

    }); 
}


//--------------------------------------- functions for get day month hours and minutes--------------------------------------
function getDays(dates){
    let arr=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return arr[dates.getDay()];
}

function getmonths(val){
    let arr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    return arr[val.getMonth()]
}

function gethours(val){
    let arr=['01','02','03','04','05','06','07','08','09',10,11,12,13,14,15,16,17,18,19,20,21,22,23,00]
    return arr[val.getHours()]
}

function getmin(val){
    let arr=['00','01','02','03','04','05','06','07','08','09',]
    for(let i=10; i<60; i++){
        arr.push(i)
    }
    return arr[val.getMinutes()]
}