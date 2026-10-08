import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { validatePhase1Full } from '../src/cli/validate-youtube-phase1-full.js';
import { validatePreproduction } from '../src/cli/validate-youtube-preproduction.js';

const dir='youtube/2026-KW41_05-10_bis_11-10/paris-ballonpost-1870';
const load=async(path)=>JSON.parse(await readFile(dir+'/'+path,'utf8'));

test('Paris Ballonpost: vollwertiges world-led Longform mit 90 einzigartigen Bildern',async()=>{
 const [meta,score,mapping,render,whole,story,plan,script,prompt]=await Promise.all([
  load('99-technik/video.json'),load('99-technik/TOPIC_SCORECARD.json'),
  load('99-technik/BILD_AUDIO_ZUORDNUNG.json'),
  load('99-technik/YOUTUBE_RENDER_PLAN.json'),
  load('99-technik/WHOLE_VIDEO_QC.json'),
  load('99-technik/STORY_QC.json'),
  load('99-technik/SCENE_PLAN.json'),
  readFile(dir+'/01-voice-script/voice-script.txt','utf8'),
  readFile(dir+'/00-bildprompts/google-flow-prompt.txt','utf8')
 ]);
 assert.equal(meta.storyMode,'world-led');
 assert.equal(score.mainCharacterRequired,false);
 assert.equal(meta.audioPolicy.playbackRate,1.05);
 assert.deepEqual(meta.targetDurationRangeSeconds,[360,420]);
 assert.equal(meta.plannedImageCount,90);
 assert.equal(mapping.images.length,90);
 assert.equal(plan.length,90);
 assert.ok(script.trim().split(/\s+/).length>=1050);
 assert.ok(script.trim().split(/\s+/).length<=1170);
 assert.equal(new Set(mapping.images.map(x=>x.visualConcept)).size,90);
 assert.ok(new Set(mapping.images.map(x=>x.visualForm)).size>=12);
 assert.ok(new Set(mapping.images.map(x=>x.shotScale)).size>=7);
 assert.ok(new Set(mapping.images.map(x=>x.colorPhase)).size>=10);
 assert.ok(mapping.images.every(x=>x.narrationMatchScore>=9&&x.clarityScore>=8));
 assert.ok(mapping.images.every(x=>script.includes(x.narrationBeat)));
 assert.ok(mapping.images.filter(x=>x.explanationOnly).length/90<=0.35);
 assert.equal(whole.visualsDerivedAfterScript,true);
 assert.equal(story.endingAnswersOpeningQuestion,true);
 assert.equal(render.motionPolicy,'content-aware-v1');
 assert.equal(meta.coverPolicy.coverCandidateCount,3);
 assert.equal(meta.coverPolicy.flowMustStopAfterCoverCandidates,true);
 assert.equal(meta.coverPolicy.coverText,'BRIEFE ÜBER FEINDESLINIEN');
 assert.equal((prompt.match(/^BILD\s+\d+\s*$/gm)||[]).length,90);
 assert.equal((prompt.match(/DIRECTING — HARD:/g)||[]).length,90);
 assert.match(prompt,/BILD 90/);

 const cover=await readFile(dir+'/00-bildprompts/FLOW_BATCHES/00_COVER_3_VARIANTEN.txt','utf8');
 assert.match(cover,/Generate exactly THREE distinct COVER candidates/);
 assert.match(cover,/STOP for user selection/);
 assert.equal((cover.match(/^BILD\s+\d+\s*$/gm)||[]).length,1);
 for(let start=2;start<=90;start+=10){
   const end=Math.min(start+9,90);
   const p=dir+'/00-bildprompts/FLOW_BATCHES/BILD_'+String(start).padStart(2,'0')+'_bis_'+String(end).padStart(2,'0')+'.txt';
   const content=await readFile(p,'utf8');
   assert.match(content,/Do not create or change BILD 01/);
   assert.equal((content.match(/^BILD\s+\d+\s*$/gm)||[]).length,end-start+1);
   assert.match(content,/VIDEO WORLD LOCK/);
 }
 const pre=await validatePreproduction(dir);
 assert.equal(pre.passed,true,pre.errors.join('\n'));
 const phase1=await validatePhase1Full(dir);
 assert.equal(phase1.passed,true,phase1.errors.join('\n'));
});
