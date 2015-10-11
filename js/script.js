(function(){
// 要素の取り込み
  var container = document.getElementById("container");
  
  var canv = document.getElementById("canv");
  var ctx = canv.getContext("2d");

  var canvBack = document.getElementById("canv-back");
  var ctxBack = canvBack.getContext("2d");

  var dialog = document.getElementById("dialog");
  var startButton = document.getElementById("start");

  var width = window.innerWidth;
  var height = window.innerHeight - 100; // ヘッダが100として
  var ZOOM = 2;

  function resize(){
    dialog.style.width = width + "px";
    dialog.style.height = height + "px";

    container.style.width = width + "px";
    container.style.height = height + "px";
    
    canv.width = width * ZOOM;
    canv.height = height * ZOOM;
    canv.style.width = width + "px";
    canv.style.height = height + "px";

    canvBack.width = width * ZOOM;
    canvBack.height = height * ZOOM;
    canvBack.style.width = width + "px";
    canvBack.style.height = height + "px";
  }
  function grid(ctx){
    var size = 64;
    var i;
    for(i = 0; i < height*ZOOM / size; i ++){
      ctx.beginPath();
      ctx.moveTo(0, i * size);
      ctx.lineTo(width * ZOOM, i * size);
      ctx.stroke();
    }
    for(i = 0; i < width*ZOOM / size; i ++){
      ctx.beginPath();
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, height * ZOOM);
      ctx.stroke();
    }
 
  }
  // dialog handler
  function showDialog(){
    dialog.style.display = "block";
  }
  function hideDialog(){
    dialog.style.display = "none";
  }


  // == canvas event handler ===
  var mousef = false;
  var px, py;
  function eventDown(e){
    mousef = true;
    px = e.offsetX * ZOOM;
    py = e.offsetY * ZOOM;
  }
  function eventUp(e){
    mousef = false;;
  }
  function eventMove(e){
    if(mousef){
      var x = (px + e.offsetX * ZOOM)/2;
      var y = (py + e.offsetY * ZOOM)/2;
      ctx.strokeStyle = "black";
      ctx.lineCap = "round";
      if(e.pressure){ // PenEventの時は筆圧が取れる
        ctx.lineWidth = Math.sqrt(e.pressure) * 6;
      }else{
        ctx.lineWidth = 2;
      }
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(x, y);
      ctx.stroke();

      px = x;
      py = y;
    }
  }
  // =====
  if(window['PointerEvent'] != undefined){
    canv.addEventListener('pointerdown', function(e){
      if(e.pointerType == "pen" || e.ponterType == 3){
        eventDown(e);
      }
    });
    canv.addEventListener('pointerup', function(e){
      if(e.pointerType == "pen" || e.ponterType == 3){
        eventUp(e);
      }
    });
    canv.addEventListener('pointermove', function(e){
      if(e.pointerType == "pen" || e.ponterType == 3){
        eventMove(e);
      }
    });
  }else{
    canv.addEventListener('mousedown', function(e){eventDown(e)});
    canv.addEventListener('mouseup', function(e){eventUp(e)});
    canv.addEventListener('mousemove', function(e){eventMove(e)});
  }

  start.addEventListener('mousedown', function(e){hideDialog()});
  // ======
  resize();
  ctx.strokeStyle = "#99ddff";
  ctx.lineWidth = 2;
  grid(ctx);
})();
