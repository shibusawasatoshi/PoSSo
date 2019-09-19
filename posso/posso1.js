const url = "wss://api.sakura.io/ws/v1/62ec74c0-c25d-4085-9836-d49fe7a5432c";
let kusoFlag = false;

document.querySelector("#keiro").addEventListener('click', ()=>{
  console.log("動け！！");
  let kusoFlag = true;
navigator.geolocation.getCurrentPosition(keiro(), keiroero())
});
/*
function kuso(){
  console.log("動け！！");
  let kusoFlag = true;
navigator.geolocation.getCurrentPosition(keiro, keiroero)}*/

function keiro(){
  var client = new WebSocket(url);
  client.onmessage = function(e) {    
    var data = JSON.parse(e.data);
    if (data.type == 'channels') {

      var datalist = data.payload.channels;
      
      for (var i = 0; i < datalist.length; i++) {
        if ((datalist[i].channel == 0)||(datalist[i].channel == 1)) {
          var lat = datalist[0].value;
          var lng = datalist[1].value;
     
  const clat=position.coords.latitude;
  const clng=position.coords.longitude;
  if (kusoFlag === true) {
    console.log(kusoFlag);
  let kusoFlag = false;
  location.href=`https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${clat},${clng}`;
}
}}}}}

function keiroero(){
  alert("位置情報が取得できませんでした");
}


readstart();

window.onload=readstart();

function readstart() {
  var output = document.getElementById('msgarea');
  var client = new WebSocket(url);

  output.innerHTML="接続中です・・・\n";


//接続が確立した際のイベント
  client.onopen = function() {  
    output.innerHTML = "接続開始\n";
  };
  
//接続にエラーが発生した際のイベント
  client.onerror = function() {   
    alert("エラーです");
    output.innerHTML="もう一度お試しください";
  };

//メッセージを受信した際のイベント
  client.onmessage = function(e) {    
    var data = JSON.parse(e.data);
    if (data.type == 'channels') {

      var datalist = data.payload.channels;
      
      for (var i = 0; i < datalist.length; i++) {
        if ((datalist[i].channel == 0)||(datalist[i].channel == 1)) {
          var lat = datalist[0].value;
          var lng = datalist[1].value;
          var date = new Date(datalist[i].datetime);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          var d = date.getDate();
          var hour = date.getHours();
          var min = date.getMinutes();
          
          output.innerHTML =  
            y + "年" + m + "月" + d + "日" + 
            hour + "時" + min + "分" +"のときの位置情報です"+ /*"  https://www.google.com/maps?q="+lat+","+lng+*/"\n";

     var mymap = L.map('mapid').setView([lat , lng], 15);
     L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    })
    .addTo(mymap);           
    var marker = L.marker([lat , lng])
    .addTo(mymap);
        }
      }
    }
 
  };
}