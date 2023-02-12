function callApi(nomCiudad, codPais){
    const key="785ba427781c6d943c0772420d614224";
    const url=`http://api.openweathermap.org/data/2.5/weather?q=${nomCiudad},${codPais}&units=metric&appid=${key}`;

    fetch(url)
    .then(resp=>resp.json())
    .then(dataJson=>{
        // console.log(dataJson)
        mostrarClima(dataJson);
    })
}
function callApiDays(lat, lon){
    const key="785ba427781c6d943c0772420d614224";
    const url=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        mostrarClimaDays(data);
    });
}
function mostrarClima(data){
    lon=data.coord.lon;
    lat=data.coord.lat;
    contCiudad.innerText=data.name;
    tempe.innerText=data.main.temp+"°";
    let arr=data.weather;
    let ico=document.getElementById("ico");
    estado.innerText=arr[0].description;
    min.innerText=data.main.temp_min+"°";
    max.innerText=data.main.temp_max+"°";
    ico.src=`https://openweathermap.org/img/wn/${arr[0].icon}@2x.png`
    console.log(data);
}
function mostrarClimaDays(data){
    let arr=data.list;
    
    for(let i=0;i<5;i++){
        let fecha=arr[i*8].dt_txt;
        fecha=fecha.substring(0,10).split("-");
        let ano=fecha[0];
        let mes=fecha[1];
        let dia=fecha[2];
        if(i==0){diaFecha(ano, mes, dia)}
        fecha=laFecha(ano, mes, dia);
        fecha=fecha.split("-");
        let nomdDia=fecha[0];
        let diaMes=fecha[1];
        let arrW=arr[i].weather;
        
        
        arrHoy[i].innerText=nomdDia;
        arrFecha[i].innerText=diaMes;
        arrImg[i].src=`https://openweathermap.org/img/wn/${arrW[0].icon}@2x.png`;
        
        arrMin[i].innerText=arr[i].main.temp_min+"°";
        arrMax[i].innerText=arr[i].main.temp_max+"°";
    }
}
function laFecha(a, m, d){
    const calendario=new Date(a, m, d);
    let strDia=dias[calendario.getDay()];
    let strMes=meses[calendario.getMonth()];
    return strFecha=strDia+"-"+d+" "+strMes
}
function diaFecha(a, m, d){
    const calendario=new Date(a, m, d);
    let strDia="";
    if(calendario.getDay()==0){
        strDia=dias[6];
    }
    else{
        strDia=dias[calendario.getDay()-1];
    }
    diaActual.innerText=strDia;
}
let lon=0;
let lat=0;

let diaActual=document.getElementById("dia_actual");
let contCiudad=document.getElementById("c_ciudad");
let tempe=document.querySelector(".temperatura");
let btn=document.getElementById("btn_buscar");
let estado=document.querySelector(".descrip");
let min=document.getElementById("min");
let max=document.getElementById("max");

let arrHoy=document.getElementsByClassName("hoy");
let arrFecha=document.getElementsByClassName("fecha");
let arrMax=document.getElementsByClassName("max");
let arrMin=document.getElementsByClassName("min");
let arrImg=document.getElementsByClassName("cielo-img");

const dias={
    0:"Domingo",
    1:"Lunes",
    2:"Martes",
    3:"Miercoles",
    4:"Jueves",
    5:"Viernes",
    6:"Sabado"
}
const meses={
    0:"Dic",
    1:"Ene",
    2:"Feb",
    3:"Mar",
    4:"Abr",
    5:"May",
    6:"Jun",
    7:"Jul",
    8:"Ago",
    9:"Sep",
    10:"Oct",
    11:"Nov"
}
btn.addEventListener("click",function(e){
    e.preventDefault();
    let selePais=document.getElementById("s_pais");
    let codPais=selePais.value;
    let ciudad=document.getElementById("ciudad");
    let nomCiudad=ciudad.value;
    callApi(nomCiudad, codPais);
    callApiDays(lat, lon);
});
window.addEventListener("load",function(){
    callApi("bucaramanga", "CO");
    callApiDays(lat, lon);
});
