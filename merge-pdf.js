/* FileAstra - Merge PDF v2 | Free, private, unlimited */
(function(){
var root=document.getElementById('toolRoot');
if(!root){return;}
function loadJS(src,cb){var s=document.createElement('script');s.src=src;s.onload=function(){cb(false);};s.onerror=function(){cb(true);};document.head.appendChild(s);}
root.innerHTML='<style>'+
'.mg-wrap{max-width:1000px;margin:0 auto;text-align:center}'+
'.mg-head-ic{width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#4f46e5,#ff6b35);display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 14px;box-shadow:0 10px 26px rgba(79,70,229,.35)}'+
'.mg-wrap h1{font-size:30px;font-weight:900;margin-bottom:8px}'+
'.mg-sub{color:#7a7a85;font-size:15px;margin-bottom:26px}'+
'.mg-big{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:17px;font-weight:800;padding:16px 42px;border-radius:999px;border:none;cursor:pointer;box-shadow:0 12px 30px rgba(79,70,229,.4);transition:.2s}'+
'.mg-big:hover{transform:translateY(-2px)}'+
'.mg-drop-hint{margin-top:12px;color:#9a9aa5;font-size:13.5px}'+
'.mg-zone{border:2px dashed transparent;border-radius:18px;padding:8px;transition:.2s}'+
'.mg-zone.on{border-color:#4f46e5;background:#eef2ff}'+
'.mg-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px;margin:26px 0;text-align:left}'+
'.mg-item{background:#fff;border:1px solid #ececf2;border-radius:12px;padding:14px;box-shadow:0 2px 8px rgba(20,20,60,.07)}'+
'.mg-item .ic{width:40px;height:40px;border-radius:9px;background:#fdeaea;display:flex;align-items:center;justify-content:center;font-size:19px;margin-bottom:10px}'+
'.mg-item .nm{font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:3px}'+
'.mg-item .mt{font-size:11.5px;color:#9a9aa5}'+
'.mg-item .bar{display:flex;gap:6px;margin-top:10px}'+
'.mg-item .bar button{flex:1;border:none;background:#f4f5fa;border-radius:7px;padding:5px 0;font-weight:800;cursor:pointer;font-size:12px}'+
'.mg-item .bar button:hover{background:#e6e8f5}'+
'.mg-add{border:2px dashed #d9dbe8;border-radius:12px;display:flex;align-items:center;justify-content:center;min-height:120px;color:#9a9aa5;font-weight:700;cursor:pointer;font-size:14px}'+
'.mg-add:hover{border-color:#4f46e5;color:#4f46e5;background:#eef2ff}'+
'.mg-go{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:16px;font-weight:800;padding:15px 40px;border-radius:999px;border:none;cursor:pointer;box-shadow:0 12px 30px rgba(79,70,229,.4)}'+
'.mg-go:disabled{opacity:.5;cursor:not-allowed}'+
'.mg-total{margin-top:10px;color:#9a9aa5;font-size:13px}'+
'.mg-busy{padding:40px 0}'+
'.mg-spin{width:40px;height:40px;margin:0 auto 14px;border:4px solid #e0e7ff;border-top-color:#4f46e5;border-radius:50%;animation:mgsp .8s linear infinite}'+
'@keyframes mgsp{to{transform:rotate(360deg)}}'+
'.mg-done-ic{width:70px;height:70px;border-radius:50%;background:#eafbef;color:#16a34a;font-size:34px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}'+
'.mg-dl{display:inline-block;background:#16a34a;color:#fff;font-weight:800;font-size:16px;padding:15px 40px;border-radius:999px;box-shadow:0 12px 30px rgba(22,163,74,.35)}'+
'.mg-again{display:inline-block;margin-left:10px;background:#f4f5fa;color:#333;font-weight:700;font-size:14px;padding:15px 26px;border-radius:999px;border:none;cursor:pointer}'+
'.mg-err{color:#dc2626;font-weight:700;margin-top:12px}'+
'</style>'+
'<div class="mg-wrap">'+
'<div id="mgPick"><div class="mg-head-ic">🔗</div><h1>Merge PDF</h1><p class="mg-sub">Combine PDFs in the order you want - free, private and unlimited. Files never leave your device.</p>'+
'<div class="mg-zone" id="mgZone"><button class="mg-big" id="mgBtn" type="button">Select PDF files</button><p class="mg-drop-hint">or drop PDFs here</p></div>'+
'<input type="file" id="mgFile" accept="application/pdf,.pdf" multiple style="display:none"></div>'+
'<div id="mgWork" style="display:none"><div class="mg-list" id="mgList"></div>'+
'<button class="mg-go" id="mgGo" type="button">Merge PDFs →</button><p class="mg-total" id="mgTotal"></p><p class="mg-err" id="mgErr"></p></div>'+
'<div id="mgBusy" style="display:none" class="mg-busy"><div class="mg-spin"></div><p style="font-weight:800;color:#4f46e5" id="mgBusyTxt">Merging PDFs...</p></div>'+
'<div id="mgDone" style="display:none"><div class="mg-done-ic">✓</div><h1 style="font-size:24px;font-weight:900;margin-bottom:6px">PDFs merged successfully!</h1><p class="mg-sub" id="mgDoneInfo"></p><a class="mg-dl" id="mgDl" href="#">⬇ Download merged PDF</a><button class="mg-again" id="mgAgain" type="button">Merge more files</button></div>'+
'</div>';
var files=[];
var pick=document.getElementById('mgPick'),work=document.getElementById('mgWork'),busy=document.getElementById('mgBusy'),done=document.getElementById('mgDone');
var zone=document.getElementById('mgZone'),btn=document.getElementById('mgBtn'),inp=document.getElementById('mgFile'),list=document.getElementById('mgList'),go=document.getElementById('mgGo'),total=document.getElementById('mgTotal'),err=document.getElementById('mgErr');
function fmtB(n){return n<1024?n+' B':(n<1048576)?(n/1024).toFixed(1)+' KB':(n/1048576).toFixed(2)+' MB';}
function ensureLib(cb){if(window.PDFLib){cb();return;}loadJS('https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',function(e){cb();});}
function addFiles(fl){
 var arr=[];
 for(var i=0;i<fl.length;i++){var f=fl[i];if(f.type==='application/pdf'||/\.pdf$/i.test(f.name)){arr.push({f:f,size:f.size,pages:null});}}
 if(!arr.length){return;}
 files=files.concat(arr);
 pick.style.display='none';work.style.display='block';
 render();
 ensureLib(function(){arr.forEach(function(it){countPages(it);});});
}
function countPages(it){
 it.f.arrayBuffer().then(function(buf){return PDFLib.PDFDocument.load(buf,{ignoreEncryption:true,updateMetadata:false});}).then(function(doc){it.pages=doc.getPageCount();render();}).catch(function(){it.pages='err';render();});
}
function render(){
 list.innerHTML='';
 files.forEach(function(it,i){
  var d=document.createElement('div');d.className='mg-item';
  d.innerHTML='<div class="ic">📕</div><div class="nm">'+it.f.name+'</div><div class="mt">'+(it.pages==='err'?'Cannot read file • ':(it.pages?it.pages+' pages • ':'Reading… '))+fmtB(it.size)+'</div><div class="bar"><button type="button" data-a="u">↑</button><button type="button" data-a="d">↓</button><button type="button" data-a="x">✕</button></div>';
  d.querySelector('[data-a=u]').onclick=function(){if(i>0){files.splice(i-1,0,files.splice(i,1)[0]);render();}};
  d.querySelector('[data-a=d]').onclick=function(){if(i<files.length-1){files.splice(i+1,0,files.splice(i,1)[0]);render();}};
  d.querySelector('[data-a=x]').onclick=function(){files.splice(i,1);render();};
  list.appendChild(d);
 });
 var add=document.createElement('div');add.className='mg-add';add.textContent='+ Add more PDFs';
 add.onclick=function(){inp.click();};
 list.appendChild(add);
 var tp=0;files.forEach(function(it){if(it.pages&&it.pages!=='err'){tp+=it.pages;}});
 total.textContent=files.length+' files • '+tp+' pages total';
 go.disabled=files.length<2;
 err.textContent='';
}
btn.onclick=function(){inp.click();};
inp.onchange=function(){addFiles(inp.files);inp.value='';};
zone.ondragover=function(e){e.preventDefault();zone.classList.add('on');};
zone.ondragleave=function(){zone.classList.remove('on');};
zone.ondrop=function(e){e.preventDefault();zone.classList.remove('on');addFiles(e.dataTransfer.files);};
go.onclick=function(){
 if(files.length<2){return;}
 err.textContent='';
 busy.style.display='block';work.style.display='none';
 document.getElementById('mgBusyTxt').textContent='Merging '+files.length+' PDFs...';
 ensureLib(function(){
  setTimeout(function(){
   PDFLib.PDFDocument.create().then(function(out){
    var chain=Promise.resolve();
    files.forEach(function(it){
     chain=chain.then(function(){
      return it.f.arrayBuffer().then(function(buf){return PDFLib.PDFDocument.load(buf,{ignoreEncryption:true});}).then(function(src){return out.copyPages(src,src.getPageIndices());}).then(function(pg){pg.forEach(function(p){out.addPage(p);});});
     });
    });
    chain.then(function(){return out.save();}).then(function(bytes){
     var blob=new Blob([bytes],{type:'application/pdf'});
     var u=URL.createObjectURL(blob);
     busy.style.display='none';done.style.display='block';
     document.getElementById('mgDoneInfo').textContent=out.getPageCount()+' pages • '+fmtB(blob.size)+' — processed 100% on your device.';
     var dl=document.getElementById('mgDl');dl.href=u;dl.download='fileastra-merged.pdf';
    }).catch(function(){
     busy.style.display='none';work.style.display='block';
     err.textContent='Some files could not be merged. Remove unreadable files and try again.';
    });
   });
  },60);
 });
};
document.getElementById('mgAgain').onclick=function(){files=[];done.style.display='none';work.style.display='none';pick.style.display='block';};
})();
