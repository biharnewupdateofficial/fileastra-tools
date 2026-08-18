/* fileastra - Merge PDF | Free & Private (browser-based) */
(function(){
var root=document.getElementById('toolRoot');
if(!root){return;}
function loadJS(src,cb){var s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s);}
root.innerHTML='<style>'+
'.mrg-drop{border:2px dashed #c7d2fe;border-radius:16px;background:linear-gradient(180deg,#f8faff,#eef4ff);padding:42px 20px;text-align:center;cursor:pointer}'+
'.mrg-drop:hover{border-color:#4f46e5;background:#eef2ff}'+
'.mrg-list{margin:16px 0;display:flex;flex-direction:column;gap:8px}'+
'.mrg-item{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;font-size:13px}'+
'.mrg-item .nm{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600}'+
'.mrg-item button{border:none;background:#f1f5f9;border-radius:6px;padding:4px 10px;font-weight:800;cursor:pointer}'+
'.mrg-btn{display:inline-block;padding:13px 34px;border-radius:12px;background:linear-gradient(135deg,#4f46e5,#ff6b35);color:#fff;font-weight:800;border:none;cursor:pointer;font-size:15px}'+
'.mrg-btn:disabled{opacity:.5;cursor:not-allowed}'+
'.mrg-status{text-align:center;margin-top:12px;font-weight:700;color:#4f46e5}'+
'</style>'+
'<div style="max-width:800px;margin:0 auto;text-align:center">'+
'<h1 style="font-size:26px;font-weight:900">🔗 Merge PDF</h1>'+
'<p style="color:#64748b;font-size:13.5px;margin:6px 0 18px">Combine PDFs in the order you want - 100% private, files never leave your device</p>'+
'<div class="mrg-drop" id="mrgDrop"><div style="font-size:40px">📑</div><h3 style="font-size:17px;font-weight:800;margin:10px 0 4px">Drop PDF files here or click to select</h3><span style="font-size:12.5px;color:#64748b">Multiple PDF files - Unlimited and Free</span></div>'+
'<input type="file" id="mrgFile" accept="application/pdf" multiple style="display:none">'+
'<div class="mrg-list" id="mrgList"></div>'+
'<button class="mrg-btn" id="mrgGo" disabled>⚡ Merge PDFs</button>'+
'<div class="mrg-status" id="mrgStatus"></div>'+
'</div>';
var files=[];
var drop=document.getElementById('mrgDrop'),inp=document.getElementById('mrgFile'),list=document.getElementById('mrgList'),go=document.getElementById('mrgGo'),status=document.getElementById('mrgStatus');
function render(){
 list.innerHTML='';
 files.forEach(function(f,i){
  var d=document.createElement('div');d.className='mrg-item';
  d.innerHTML='<span style="background:linear-gradient(135deg,#4f46e5,#ff6b35);color:#fff;font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px">'+(i+1)+'</span><span class="nm">'+f.name+'</span>';
  var bu=document.createElement('button');bu.textContent='↑';bu.onclick=function(){if(i>0){files.splice(i-1,0,files.splice(i,1)[0]);render();}};
  var bd=document.createElement('button');bd.textContent='↓';bd.onclick=function(){if(i<files.length-1){files.splice(i+1,0,files.splice(i,1)[0]);render();}};
  var bx=document.createElement('button');bx.textContent='✕';bx.onclick=function(){files.splice(i,1);render();};
  d.appendChild(bu);d.appendChild(bd);d.appendChild(bx);
  list.appendChild(d);
 });
 go.disabled=files.length<2;
}
function add(fl){for(var i=0;i<fl.length;i++){if(fl[i].type==='application/pdf'||/\.pdf$/i.test(fl[i].name)){files.push(fl[i]);}}render();}
drop.onclick=function(){inp.click();};
inp.onchange=function(){add(inp.files);inp.value='';};
drop.ondragover=function(e){e.preventDefault();};
drop.ondrop=function(e){e.preventDefault();add(e.dataTransfer.files);};
go.onclick=function(){
 go.disabled=true;status.textContent='⏳ Loading engine...';
 loadJS('https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',function(){
  status.textContent='⏳ Merging '+files.length+' PDFs...';
  setTimeout(function(){
   PDFLib.PDFDocument.create().then(function(out){
    var chain=Promise.resolve();
    files.forEach(function(f){
     chain=chain.then(function(){
      return f.arrayBuffer().then(function(buf){return PDFLib.PDFDocument.load(buf,{ignoreEncryption:true});}).then(function(src){return out.copyPages(src,src.getPageIndices());}).then(function(pages){pages.forEach(function(p){out.addPage(p);});});
     });
    });
    chain.then(function(){return out.save();}).then(function(bytes){
     var blob=new Blob([bytes],{type:'application/pdf'});
     var u=URL.createObjectURL(blob);
     status.innerHTML='<a href="'+u+'" download="fileastra-merged.pdf" style="color:#16a34a;font-weight:900;text-decoration:underline">✅ Download Merged PDF ('+Math.round(blob.size/1024)+' KB)</a>';
     go.disabled=false;
    }).catch(function(err){status.textContent='❌ Error: '+err.message;go.disabled=false;});
   });
  },50);
 });
};
})();
