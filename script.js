
// function for get data from api
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

// function for lat and lon from geolocation
navigator.geolocation.getCurrentPosition(success);
function success(pos){
    const crd = pos.coords;
    let lat=crd.latitude
    let lon=crd.longitude
    getdata(lat,lon)
}


// function for lat and lon from search
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


// function for display data
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

}

// function for display next 7 days data
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

      let p2=document.createElement("p")
      if(el.weather[0].main=="Clouds"){
        p2.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cloud" viewBox="0 0 16 16">
        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
         </svg>`
      }else if(el.weather[0].main=="Rain"){
        p2.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cloud-drizzle" viewBox="0 0 16 16">
        <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
        </svg>`
      }else{
        p2.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/>
            <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
          </svg>`
      }
      
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
      div2.setAttribute("class","tmp_div")
            let p5=document.createElement("p")
            p5.innerText=`Sunrise ${sunhor}:${sunmin}`

            let p6=document.createElement("p")
            p6.innerText=`Sunset ${sunshor}:${sunsmin}`
      div2.append(p5,p6)

      let p7=document.createElement("p")
      p7.setAttribute("class","weth")
      p7.innerText=el.weather[0].main

      div.append(p1,p2,div1,div2,p7)

      let container=document.getElementById("days_data")
      container.append(div)

});
}

// functions for get day
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



// let d=new Date(data.current.dt*1000-(3600*1000))

// var year=d.getFullYear();
// var month=d.getMonth();
// var dte=d.getDate();
// var tday=d.getDay()
// var sec=d.getSeconds()
// var min=d.getMinutes()
// var hour=d.getHours()

// console.log(year,month,dte,tday,sec,min,hour)
