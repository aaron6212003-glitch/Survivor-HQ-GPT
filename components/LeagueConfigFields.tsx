'use client';

export const field='sports-field mt-2 p-3';
export const primary='sports-primary px-5 py-3';
export const panel='sports-panel p-5 sm:p-6';
export const defaults={name:'',format:'survivor',maxEntries:100,tiebreaker:'shared',tiesLose:true};

export default function LeagueConfigFields({value,onChange,existing=false}:{value:any;onChange:(v:any)=>void;existing?:boolean}) {
 const set=(key:string,next:any)=>onChange({...value,[key]:next});
 const setFormat=(format:string)=>onChange({...value,format,maxEntries:format==='survivor'?value.maxEntries||100:1,tiesLose:format==='survivor'?value.tiesLose!==false:true});
 const survivor=value.format==='survivor';
 return <div className="space-y-4">
  <label className="block">League name<input className={field} value={value.name} onChange={e=>set('name',e.target.value)} minLength={2} maxLength={60} required/></label>
  <div className="grid sm:grid-cols-2 gap-4">
   <label>Format<select className={field} value={value.format} disabled={existing} onChange={e=>setFormat(e.target.value)}><option value="survivor">Survivor</option><option value="pickem">Straight Pick’em</option></select></label>
   {survivor&&<label>Maximum lives per member<input className={field} type="number" min={1} max={100} required value={value.maxEntries} onChange={e=>set('maxEntries',Number(e.target.value))}/></label>}
   {!survivor&&<label>Standings tiebreaker<select className={field} value={value.tiebreaker} onChange={e=>set('tiebreaker',e.target.value)}><option value="shared">Share the rank</option><option value="correct-picks">Most correct picks</option></select></label>}
  </div>
  <p className="rounded-xl border border-sky-900 bg-sky-950/30 p-3 text-sm text-sky-100">Picks lock one game at a time: a Thursday player can no longer pick the Thursday game after kickoff, while Sunday and Monday games remain open until their own kickoffs.</p>
  {survivor?<>
   <label className="flex gap-3"><input type="checkbox" checked={value.tiesLose} onChange={e=>set('tiesLose',e.target.checked)}/>A tied game eliminates the Survivor life</label>
   <p className="text-sm text-slate-500">Each life gets one team per week. A team cannot be used twice by the same life.</p>
  </>:<p className="text-sm text-slate-500">Every member receives one season record. Pick every game each week; correct picks build your record.</p>}
  <p className="text-sm text-slate-500">Rules become fixed once picks are submitted or games start.</p>
 </div>;
}
