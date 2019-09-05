

const url = "wss://api.sakura.io/ws/v1/62ec74c0-c25d-4085-9836-d49fe7a5432c";

nannkaugoku();

function nannkaugoku(){

  let tukatteru=navigator.userAgent;
  if(tukatteru.indexOf("iPhone")>0 || tukatteru.indexOf("iPad")>0 || tukatteru.indexOf("Android")>0 || tukatteru.indexOf("iPod")>0){
    const idou =confirm("スマホ版のサイトに移動しますか？");
    
    if(idou===true){
      console.log("なんで表示されないんだよクソが");
      location.href='./posso3.html'
      /*const posso=window.open('./posso3.html');  //window.openだと動かない
      posso.focus();*/
    }
  }
}


readstart();
document.querySelector(".startBtn").addEventListener("click",readstart());

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
    alert("error");
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