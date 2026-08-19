/* FileAstra - Merge PDF v3 | previews, fast, stable */
(function(){
var root=document.getElementById('toolRoot');
if(!root){return;}
var PDFJS_SRC='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
var PDFJS_WORKER='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
var PDFLIB_SRC='https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
function loadJS(src,cb){var s=document.createElement('script');s.src=src;s.onload=function(){cb(false);};s.onerror=function(){cb(true);};document.head.appendChild(s);}
loadJS(PDFJS_SRC,function(){if(window.pdfjsLib){window.pdfjsLib.GlobalWorkerOptions.workerSrc=PDFJS_WORKER;}});
loadJS(PDFLIB_SRC,function(){});
root.innerHTML='<style>'+
'.mg-wrap{max-width:1100px;margin:0 auto}'+
'.mg-hero{text-align:center;padding:46px 16px 30px}'+
'.mg-hero h1{font-size:40px;font-weight:900;margin-bottom:12px;letter-spacing:-1px}'+
'.mg-hero p{font-size:18px;color:#7a7a85;margin-bottom:34px}'+
'.mg-big{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:19px;font-weight:800;padding:19px 64px;border-radius:12px;border:none;cursor:pointer;box-shadow:0 14px 34px rgba(79,70,229,.35);transition:.2s}'+
'.mg-big:hover{transform:translateY(-2px);box-shadow:0 18px 40px rgba(79,70,229,.45)}'+
'.mg-drop-hint{margin-top:16px;color:#9a9aa5;font-size:14.5px}'+
'.mg-zone{border:2px dashed transparent;border-radius:18px;transition:.2s}'+
'.mg-zone.on{border-color:#4f46e5;background:#eef2ff}'+
'.mg-topbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:6px 0 16px;flex-wrap:wrap}'+
'.mg-count{font-size:14px;font-weight:700;color:#4b4b55}'+
'.mg-addbtn{background:#fff;border:1px solid #d9dbe8;color:#4f46e5;font-weight:800;font-size:13.5px;padding:10px 20px;border-radius:10px;cursor:pointer}'+
'.mg-addbtn:hover{border-color:#4f46e5;background:#eef2ff}'+
'.mg-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:16px}'+
'.mg-item{background:#fff;border:2px solid #ececf2;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(20,20,60,.07);position:relative;transition:.15s}'+
'.mg-item:hover{border-color:#c7cbff}'+
'.mg-thumb{height:170px;background:#f6f7fb;display:flex;align-items:center;justify-content:center;overflow:hidden}'+
'.mg-thumb img{width:100%;height:100%;object-fit:cover;background:#fff}'+
'.mg-ph{color:#b9bcc9;font-size:26px}'+
'.mg-num{position:absolute;top:8px;left:8px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:11px;font-weight:800;padding:3px 9px;border-radius:999px}'+
'.mg-body{padding:12px}'+
'.mg-item .nm{font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:3px}'+
'.mg-item .mt{font-size:11.5px;color:#9a9aa5}'+
'.mg-item .bar{display:flex;gap:6px;margin-top:10px}'+
'.mg-item .bar button{flex:1;border:none;background:#f4f5fa;border-radius:7px;padding:6px 0;font-weight:800;cursor:pointer;font-size:12px;color:#4b4b55}'+
'.mg-item .bar button:hover{background:#e6e8f5}'+
'.mg-item.bad .mg-thumb{background:#fdeaea}'+
'.mg-actionbar{display:flex;align-items:center;justify-content:space-between;gap:14px;margin:26px 0 10px;flex-wrap:wrap}'+
'.mg-total{color:#9a9aa5;font-size:13.5px;font-weight:600}'+
'.mg-go{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:17px;font-weight:800;padding:16px 46px;border-radius:12px;border:none;cursor:pointer;box-shadow:0 14px 34px rgba(79,70,229,.35)}'+
'.mg-go:disabled{opacity:.5;cursor:not-allowed}'+
'.mg-err{color:#dc2626;font-weight:700;margin-top:10px;text-align:center}'+
'.mg-busy{padding:60px 0;text-align:center}'+
'.mg-spin{width:44px;height:44px;margin:0 auto 16px;border:4px solid #e0e7ff;border-top-color:#4f46e5;border-radius:50%;animation:mgsp .8s linear infinite}'+
'@keyframes mgsp{to{transform:rotate(360deg)}}'+
'.mg-done{text-align:center;padding:50px 0}'+
'.mg-done-ic{width:76px;height:76px;border-radius:50%;background:#eafbef;color:#16a34a;font-size:36px;display:flex;align-items:center;justify-content:center;margin:0 auto 18px}'+
'.mg-dl{display:inline-block;background:#16a34a;color:#fff;font-weight:800;font-size:17px;padding:16px 46px;border-radius:12px;box-shadow:0 14px 34px rgba(22,163,74,.35)}'+
'.mg-again{display:inline-block;margin-left:12px;background:#f4f5fa;color:#333;font-weight:700;font-size:14px;padding:16px 26px;border-radius:12px;border:none;cursor:pointer}'+
'</style>'+
'<div class="mg-wrap">'+
'<div id="mgPick"><div class="mg-hero"><h1>Merge PDF files</h1><p>Combine PDFs in the order you want - free, private and unlimited.</p>'+
'<div class="mg-zone" id="mgZone"><button class="mg-big" id="mgBtn" type="button">Select PDF files</button><p class="mg-drop-hint">or drop PDFs here</p></div></div></div>'+
'<div id="mgWork" style="display:none">'+
'<div class="mg-topbar"><span class="mg-count" id="mgCount"></span><button class="mg-addbtn" id="mgAdd" type="button">+ Add more PDFs</button></div>'+
'<div class="mg-list" id="mgList"></div>'+
'<div class="mg-actionbar"><span class="mg-total" id="mgTotal"></span><button class="mg-go" id="mgGo" type="button">Merge PDFs →</button></div>'+
'<p class="mg-err" id="mgErr"></p></div>'+
'<div id="mgBusy" style="display:none" class="mg-busy"><div class="mg-spin"></div><p style="font-weight:800;color:#4f46e5;font-size:16px" id="mgBusyTxt">Merging PDFs...</p></div>'+
'<div id="mgDone" style="display:none" class="mg-done"><div class="mg-done-ic">✓</div><h1 style="font-size:26px;font-weight:900;margin-bottom:8px">PDFs merged successfully!</h1><p style="color:#7a7a85;font-size:15px;margin-bottom:26px" id="mgDoneInfo"></p><a class="mg-dl" id="mgDl" href="#">⬇ Download merged PDF</a><button class="mg-again" id="mgAgain" type="button">Merge more files</button></div>'+
'<input type="file" id="mgFile" accept="application/pdf,.pdf" multiple style="display:none">'+
'</div>';
var files=[];var queue=[];var processing=false;
var pick=document.getElementById('mgPick'),work=document.getElementById('mgWork'),busy=document.getElementById('mgBusy'),done=document.getElementById('mgDone');
var zone=document.getElementById('mgZone'),btn=document.getElementById('mgBtn'),inp=document.getElementById('mgFile'),list=document.getElementById('mgList'),go=document.getElementById('mgGo'),total=document.getElementById('mgTotal'),countEl=document.getElementById('mgCount'),err=document.getElementById('mgErr');
function fmtB(n){return n<1024?n+' B':(n<1048576)?(n/1024).toFixed(1)+' KB':(n/1048576).toFixed(2)+' MB';}
function addFiles(fl){
 for(var i=0;i<fl.length;i++){var f=fl[i];if(f.type==='application/pdf'||/\.pdf$/i.test(f.name)){var it={f:f,size:f.size,pages:null,thumb:null,bad:false};files.push(it);queue.push(it);}}
 if(!files.length){return;}
 pick.style.display='none';work.style.display='block';
 render();processQueue();
}
function processQueue(){
 if(processing){return;}
 var it=queue.shift();
 if(!it){return;}
 processing=true;
 if(!window.pdfjsLib){it.bad=true;processing=false;render();processQueue();return;}
 it.f.arrayBuffer().then(function(buf){
  return window.pdfjsLib.getDocument({data:buf}).promise.then(function(doc){
   it.pages=doc.numPages;
   return doc.getPage(1).then(function(p){
    var vp=p.getViewport({scale:1});
    var scale=170/vp.width;
    var vp2=p.getViewport({scale:scale});
    var canvas=document.createElement('canvas');
    canvas.width=Math.floor(vp2.width);canvas.height=Math.floor(vp2.height);
    return p.render({canvasContext:canvas,viewport:vp2}).promise.then(function(){
     it.thumb=canvas.toDataURL('image/png');
     doc.destroy();
    });
   });
  });
 }).catch(function(){it.bad=true;}).then(function(){
  processing=false;render();processQueue();
 });
}
function render(){
 list.innerHTML='';
 files.forEach(function(it,i){
  var d=document.createElement('div');d.className='mg-item'+(it.bad?' bad':'');
  d.innerHTML='<div class="mg-thumb">'+(it.thumb?'<img src="'+it.thumb+'" alt="">':'<span class="mg-ph">'+(it.bad?'⚠️':'⏳')+'</span>')+'</div><span class="mg-num">'+(i+1)+'</span><div class="mg-body"><div class="nm">'+it.f.name+'</div><div class="mt">'+(it.bad?'Unreadable file':(it.pages?it.pages+' pages • ':'Loading… '))+fmtB(it.size)+'</div><div class="bar"><button type="button" data-a="u">↑</button><button type="button" data-a="d">↓</button><button type="button" data-a="x">✕</button></div></div>';
  d.querySelector('[data-a=u]').onclick=function(){if(i>0){files.splice(i-1,0,files.splice(i,1)[0]);render();}};
  d.querySelector('[data-a=d]').onclick=function(){if(i<files.length-1){files.splice(i+1,0,files.splice(i,1)[0]);render();}};
  d.querySelector('[data-a=x]').onclick=function(){files.splice(i,1);render();};
  list.appendChild(d);
 });
 var good=files.filter(function(x){return !x.bad;});
 var tp=0;good.forEach(function(x){tp+=x.pages||0;});
 countEl.textContent=files.length+' files selected';
 total.textContent=good.length+' ready • '+tp+' pages total';
 go.disabled=good.length<2;
}
btn.onclick=function(){inp.click();};
document.getElementById('mgAdd').onclick=function(){inp.click();};
inp.onchange=function(){addFiles(inp.files);inp.value='';};
zone.ondragover=function(e){e.preventDefault();zone.classList.add('on');};
zone.ondragleave=function(){zone.classList.remove('on');};
zone.ondrop=function(e){e.preventDefault();zone.classList.remove('on');addFiles(e.dataTransfer.files);};
go.onclick=function(){
 var good=files.filter(function(x){return !x.bad;});
 if(good.length<2){return;}
 err.textContent='';
 work.style.display='none';busy.style.display='block';
 var skipped=0;
 function step(i,out){
  if(i>=good.length){
   out.save().then(function(bytes){
    var blob=new Blob([bytes],{type:'application/pdf'});
    var u=URL.createObjectURL(blob);
    busy.style.display='none';done.style.display='block';
    document.getElementById('mgDoneInfo').textContent=out.getPageCount()+' pages • '+fmtB(blob.size)+(skipped?' • '+skipped+' unreadable file(s) skipped':'')+' — processed 100% on your device.';
    var dl=document.getElementById('mgDl');dl.href=u;dl.download='fileastra-merged.pdf';
   }).catch(function(){busy.style.display='none';work.style.display='block';err.textContent='Could not merge. Please try again.';});
   return;
  }
  document.getElementById('mgBusyTxt').textContent='Merging file '+(i+1)+' of '+good.length+'...';
  good[i].f.arrayBuffer().then(function(buf){
   return PDFLib.PDFDocument.load(buf,{ignoreEncryption:true}).then(function(src){
    return out.copyPages(src,src.getPageIndices()).then(function(pg){pg.forEach(function(p){out.addPage(p);});});
   });
  }).catch(function(){skipped++;}).then(function(){step(i+1,out);});
 }
 PDFLib.PDFDocument.create().then(function(out){step(0,out);});
};
document.getElementById('mgAgain').onclick=function(){files=[];queue=[];done.style.display='none';work.style.display='none';pick.style.display='block';};
})();
