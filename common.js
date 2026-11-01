const BOARDS=[['sprint','단거리'],['mile','마일'],['medium','중거리'],['long','장거리'],['dirt','더트']];
const KEY='tiermaker-data-v1';
const COLORS=['#ff7f7f','#ffbf7f','#ffdf7f','#bfff7f','#7fffff','#7fbfff'];
const uid=()=>Math.random().toString(36).slice(2,9);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function newBoard(){return{tiers:['S','A','B','C','D'].map((n,i)=>({id:uid(),name:n,color:COLORS[i],items:[]})),pool:[]}}
function emptyData(){const b={};BOARDS.forEach(([k])=>b[k]=newBoard());return{chars:[],boards:b}}
function loadLocal(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}}
function saveLocal(d){try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){alert('브라우저 저장 공간이 부족해요. JSON으로 내보내 주세요.')}}
const charOf=(d,id)=>d.chars.find(c=>c.id===id);
function chipHTML(d,id,edit,hit){
  const c=charOf(d,id);if(!c)return'';
  return `<div class="chip ${hit===true?'hit':hit===false?'dim':''}" data-id="${id}" title="${esc(c.name)}" ${edit?'draggable="true"':''}><img src="${c.img}" alt=""><small>${esc(c.name)}</small>${edit?`<button class="x" data-del="${id}" title="캐릭터 삭제">✕</button>`:''}</div>`;
}
function tierOf(d,key,id){const t=d.boards[key].tiers.find(t=>t.items.includes(id));return t?{name:t.name,color:t.color}:{name:'미배치',color:'#bdbdbd'}}
