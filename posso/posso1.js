const url = "wss://api.sakura.io/ws/v1/62ec74c0-c25d-4085-9836-d49fe7a5432c";
let kusoFlag = false;
if(navigator.geolocation){
  console.log("ok");
  console.log(navigator.geolocation);
}else{
  console.log("not ok");
}


document.querySelector("#keiro").addEventListener('click', ()=>{
  console.log("動け！！");
  let kusoFlag = true;
  navigator.geolocation.getCurrentPosition(keiro(), keiroero());
});
/*
function kuso(){
  console.log("動け！！");
  let kusoFlag = true;
navigator.geolocation.getCurrentPosition(keiro, keiroero)}*/

function keiro(coords){

  if (kusoFlag === true) {
    console.log(kusoFlag);
  let kusoFlag = false;
  location.href=`https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${clat},${clng}`;
}

  let client = new WebSocket(url);
  client.onmessage = function(e) {    
    let data = JSON.parse(e.data);
    if (data.type == 'channels') {

      let datalist = data.payload.channels;
      
      for (let i = 0; i < datalist.length; i++) {
        if ((datalist[i].channel == 0)||(datalist[i].channel == 1)) {
          let lat = datalist[0].value;
          let lng = datalist[1].value;

  const clat=coords.latitude;
  const clng=coords.longitude;

}}}}}

function keiroero(){
  alert("位置情報が取得できませんでした");
}


readstart();

window.onload=readstart();

function readstart() {
  let output = document.getElementById('msgarea');
  let client = new WebSocket(url);

  output.innerHTML="接続中です・・・\n";


//接続が確立した際のイベント
  client.onopen = function() {  
    output.innerHTML = "接続開始\n";
  };
  
//接続にエラーが発生した際のイベント
  client.onerror = function() {   
    alert("エラーです");
    output.innerHTML="もう一度お試しください";
  }

//メッセージを受信した際のイベント
  client.onmessage = function(e) {    
    let data = JSON.parse(e.data);
    if (data.type == 'channels') {

      let datalist = data.payload.channels;
      
      for (var i = 0; i < datalist.length; i++) {
        if ((datalist[i].channel == 0)||(datalist[i].channel == 1)) {
          let lat = datalist[0].value;
          let lng = datalist[1].value;
          let date = new Date(datalist[i].datetime);
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          let d = date.getDate();
          let hour = date.getHours();
          let min = date.getMinutes();
          
          output.innerHTML =  
            y + "年" + m + "月" + d + "日" + 
            hour + "時" + min + "分" +"のときの位置情報です"+ /*"  https://www.google.com/maps?q="+lat+","+lng+*/"\n";

     let mymap = L.map('mapid').setView([lat , lng], 15);
     L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    })
    .addTo(mymap);           
    let marker = L.marker([lat , lng])
    .addTo(mymap);
        }
      }
    }
 
  };
}