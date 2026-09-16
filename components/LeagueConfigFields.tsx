'use client';

export const field='mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white';
export const primary='rounded-xl bg-emerald-400 px-5 py-3 text-slate-950 font-bold disabled:opacity-40 hover:bg-emerald-300';
export const panel='rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6';
export const defaults={name:'',format:'survivor',maxEntries:100,deadlineMode:'per-game',tiebreaker:'shared',doublePickWeeks:[] as number[],tiesLose:true};

export default function LeagueConfigFields({value,onChange,existing=false}:{value:any;onChange:(v:any)=>void;existing?:boolean}) {
 const set=(key:string,next:any)=>onChange({...value,[key]:next});
 const setFormat=(format:string)=>onChange({...value,format,maxEntries:format==='survivor'?value.maxEntries||100:1,doublePickWeeks:format==='survivor'?value.doublePickWeeks||[]:[],tiesLose:format==='survivor'?value.tiesLose!==false:true});
 const survivor=value.format==='survivor';
 return <div className="space-y-4">
  <label className="block">League name<input className={field} value={value.name} onChange={e=>set('name',e.target.value)} minLength={2} maxLength={60} required/></label>
  <div className="grid sm:grid-cols-2 gap-4">
   <label>Format<select className={field} value={value.format} disabled={existing} onChange={e=>setFormat(e.target.value)}><option value="survivor">Survivor</option><option value="pickem">Straight Pick’em</option></select></label>
   {survivor&&<label>Maximum lives per member<input className={field} type="number" min={1} max={100} required value={value.maxEntries} onChange={e=>set('maxEntries',Number(e.target.value))}/></label>}
   <label>Pick deadline<select className={field} value={value.deadlineMode} onChange={e=>set('deadlineMode',e.target.value)}><option value="per-game">Each game locks at kickoff</option><option value="first-game">All picks lock at first kickoff</option></select></label>
   {!survivor&&<label>Standings tiebreaker<select className={field} value={value.tiebreaker} onChange={e=>set('tiebreaker',e.target.value)}><option value="shared">Share the rank</option><option value="correct-picks">Most correct picks</option></select></label>}
  </div>
  {survivor?<>
   <fieldset><legend className="mb-2">Double-pick weeks</legend><div className="flex flex-wrap gap-2">{Array.from({length:18},(_,i)=>i+1).map(week=><label key={week} className="p-2 rounded-lg bg-slate-950 border border-slate-700"><input type="checkbox" checked={(value.doublePickWeeks||[]).includes(week)} onChange={e=>set('doublePickWeeks',e.target.checked?[...(value.doublePickWeeks||[]),week].sort((a:number,b:number)=>a-b):(value.doublePickWeeks||[]).filter((n:number)=>n!==week))}/> {week}</label>)}</div></fieldset>
   <label className="flex gap-3"><input type="checkbox" checked={value.tiesLose} onChange={e=>set('tiesLose',e.target.checked)}/>A tied game eliminates the Survivor life</label>
   <p className="text-sm text-slate-500">Each life gets one team per week, unless you select a double-pick week. A team cannot be used twice by the same life.</p>
  </>:<p className="text-sm text-slate-500">Every member receives one season record. Pick every game each week; correct picks build your record.</p>}
  <p className="text-sm text-slate-500">Rules become fixed once picks are submitted or games start.</p>
 </div>;
}
