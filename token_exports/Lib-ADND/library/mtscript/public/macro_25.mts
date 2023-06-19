[h: cfgSettings = getLibProperty("CFGSettings", "Lib:ADND")]
[h: privateMode = getStrProp(cfgSettings,"privatemode","0")]
[h: privateAttackMode = getStrProp(cfgSettings,"privateAttackMode","0")]
[h: hiddenMode = getStrProp(cfgSettings,"hiddenMode","0")]
[h: initiativedice = getStrProp(cfgSettings,"initiativedice","10")]
[h: initiativeOnce = getStrProp(cfgSettings,"initiativeOnce","0")]

[h: versionSpellDB = getStrProp(cfgSettings,"versionSpellDB","2e")]
[h: orig_versionSpellDB = versionSpellDB]

[h: versionMonsterDB = getStrProp(cfgSettings,"versionMonsterDB","2e")]
[h: orig_versionMonsterDB = versionMonsterDB]

[h: versionEquipmentDB = getStrProp(cfgSettings,"versionEquipmentDB","2e")]
[h: orig_versionEquipmentDB = versionEquipmentDB]

[h: versionSkillsDB = getStrProp(cfgSettings,"versionSkillsDB","2e")]
[h: orig_versionSkillsDB = versionSkillsDB]

[h: dbVersionList = "1e, 2e")]
[h, if(listContains(dbVersionList,versionSpellDB)):dbSpellLoc = listFind(dbVersionList,versionSpellDB);dbSpellLoc = 1]
[h, if(listContains(dbVersionList,versionMonsterDB)):dbMonsterLoc = listFind(dbVersionList,versionMonsterDB);dbMonsterLoc = 1]
[h, if(listContains(dbVersionList,versionMonsterDB)):dbEquipmentLoc = listFind(dbVersionList,versionEquipmentDB);dbEquipmentLoc = 1]
[h, if(listContains(dbVersionList,versionMonsterDB)):dbSkillsLoc = listFind(dbVersionList,versionSkillsDB);dbSkillsLoc = 1]

[h: usecrit = getStrProp(cfgSettings,"usecrit","20")]
[h: usefumble = getStrProp(cfgSettings,"usefumble","1")]
[h: npcCanCrit = getStrProp(cfgSettings,"npcCanCrit","1")]

[h: autoLoadNPCSheet = getStrProp(cfgSettings,"autoLoadNPCSheet","1")]

[h:version = getLibProperty("Version","Lib:ADND")]

[h: allMapNames = listSort(getAllMapNames(),"A")]
[h: defaultMapDM = getLibProperty("defaultMapDM", "Lib:ADND")]
[h, if(listContains(allMapNames,defaultMapDM)):mapDMLoc = listFind(allMapNames,defaultMapDM);mapDMLoc = 0]

[h: defaultMapPC = getLibProperty("defaultMapPC",  "Lib:ADND")]
[h, if(listContains(allMapNames,defaultMapPC)):mapPCLoc = listFind(allMapNames,defaultMapPC);mapPCLoc = 0]

<!-- set default value for this -->
[h: saveTypes = getLibProperty("SaveTypes","Lib:ADND")]
[h,if(saveTypes==''):saveTypes="Paralyzation/Poison/Death Magic, Rod/Staff/Wand, Petrification/Polymorph, Breath Weapon, Spell/Other"]
[h: setLibProperty("SaveTypes",saveTypes,"Lib:ADND")]

[h: combatActions = getLibProperty("CombatActions","Lib:ADND")]
[h,if(combatActions==''):combatActions="Attack Melee,Attack Ranged,Charge,Flee,Fighting Retreat,Move,Cast On Enemy,Cast On Friendly,Other"]
[h: setLibProperty("CombatActions",combatActions,"Lib:ADND")]

[h:status = input(
	"seperator|<html><b>------------ ADND Framework v"+version+" Settings ------------</b></html>||LABEL|SPAN=TRUE",
	"seperator|<html><b>--- Version Selection ---</b></html>||LABEL|SPAN=TRUE",
	"versionSpellDB| "+dbVersionList+" | Spell Version DB |LIST|SELECT="+dbSpellLoc+" VALUE=STRING",
	"versionMonsterDB| "+dbVersionList+" | Monster Version DB |LIST|SELECT="+dbMonsterLoc+" VALUE=STRING",
	"versionSkillsDB| "+dbVersionList+" | Skills Version DB |LIST|SELECT="+dbSkillsLoc+" VALUE=STRING",
	"versionEquipmentDB| "+dbVersionList+" | Equipment Version DB |LIST|SELECT="+dbEquipmentLoc+" VALUE=STRING",

	"seperator|<html><b>--- General ---</b></html>||LABEL|SPAN=TRUE",
	"privateMode|"+privateMode+"|Keep NPC save/ability-check/initiative rolls private (DM only).|CHECK",
	"privateAttackMode|"+privateAttackMode+"|Keep NPC attacks private (DM only).|CHECK",
	"hiddenMode|"+hiddenMode+"|Keep all PC save/ability/prof/skill rolls private (DM only).|CHECK",
	"seperator|<html><b>--- Combat ---</b></html>||LABEL|SPAN=TRUE",

	"usecrit|"+usecrit+"|Critical hit target. On a natural roll of the value calculate double dice damage. (set to 0 to disable)|TEXT|WIDTH=2", 
	"usefumble|"+usefumble+"|Fumble roll target. On a natural roll of the value, display 0 damage. (set to 0 to disable)|TEXT|WIDTH=2", 
	"npcCanCrit|"+npcCanCrit+"|All NPCs can critical by default?|CHECK",

	"seperator|<html><b>--- Initiative ---</b></html>||LABEL|SPAN=TRUE",
	"initiativedice|"+initiativedice+"|Initiative dice size. (default 10)|TEXT|WIDTH=2",
	"autoLoadNPCSheet|"+autoLoadNPCSheet+"|Automatically load/select the NPC sheet on initiative turn?|CHECK",
	"initiativeOnce|"+initiativeOnce+"|Only roll initiative at the start of the encounter instead of every round?|CHECK",
	
	"seperator|<html><b>--- Default Start Maps, user will be moved to this map on connect to server ---</b></html>||LABEL|SPAN=TRUE",
	"defaultMapDM|"+allMapNames+"| DM Map |LIST|SELECT="+mapDMLoc+" VALUE=STRING",
	"defaultMapPC|"+allMapNames+"| PC Map |LIST|SELECT="+mapPCLoc+" VALUE=STRING"
)]
[H: abort(status)]

[h: cfgSettings = setStrProp(cfgSettings,"npcCanCrit",npcCanCrit)]
[h: cfgSettings = setStrProp(cfgSettings,"usecrit",usecrit)]
[h: cfgSettings = setStrProp(cfgSettings,"usefumble",usefumble)]
[h: cfgSettings = setStrProp(cfgSettings,"initiativedice",initiativedice)]
[h: cfgSettings = setStrProp(cfgSettings,"initiativeOnce",initiativeOnce)]
[h: cfgSettings = setStrProp(cfgSettings,"privatemode",privateMode)]
[h: cfgSettings = setStrProp(cfgSettings,"privateAttackMode",privateAttackMode)]
[h: cfgSettings = setStrProp(cfgSettings,"hiddenMode",hiddenMode)]
[h: cfgSettings = setStrProp(cfgSettings,"autoLoadNPCSheet",autoLoadNPCSheet)]

[h: cfgSettings = setStrProp(cfgSettings,"versionSpellDB",versionSpellDB)]
[h: cfgSettings = setStrProp(cfgSettings,"versionMonsterDB",versionMonsterDB)]
[h: cfgSettings = setStrProp(cfgSettings,"versionEquipmentDB",versionEquipmentDB)]
[h: cfgSettings = setStrProp(cfgSettings,"versionSkillsDB",versionSkillsDB)]

[h: setLibProperty("CFGSettings", cfgSettings, "Lib:ADND")]

[h: setLibProperty("defaultMapDM", defaultMapDM, "Lib:ADND")]
[h: setLibProperty("defaultMapPC", defaultMapPC, "Lib:ADND")]

[h: processedDBChange = 0]
[h: originalMap = getCurrentMapName()]

[if (versionSpellDB != orig_versionSpellDB), code :{
	[h: changeDB("Framework - DB","Lib:Spells",versionSpellDB)]
	[h: processedDBChange = 1 ]
};{}]
[if (versionMonsterDB != orig_versionMonsterDB), code :{
	[h: changeDB("Framework - DB","Lib:MM",versionMonsterDB)]
	[h: processedDBChange = 1 ]
};{}]

[if (versionEquipmentDB != orig_versionEquipmentDB), code :{
	[h: changeDB("Framework - DB","Lib:Equipment",versionEquipmentDB)]
	[h: processedDBChange = 1 ]
};{}]

[if (versionSkillsDB != orig_versionSkillsDB), code :{
	[h: changeDB("Framework - DB","Lib:Skills",versionSkillsDB)]
	[h: processedDBChange = 1 ]
};{}]

[h, if (originalMap != getCurrentMapName()), code :{
	[h: 'if we moved maps to deal with the db version change go back to where we were now.']
	[h: setCurrentMap(originalMap)]
};{}]

[h: outTxt = '']
[h: outTxt = concat(outTxt,strformat("<b>Spell DB</b> set to =<b>%{versionSpellDB}</b><br>"))]
[h: outTxt = concat(outTxt,strformat("<b>Monster DB</b> set to =<b>%{versionMonsterDB}</b><br>"))]

[h: outTxt = concat(outTxt,strformat("<b>Equipment DB</b> set to =<b>%{versionEquipmentDB}</b><br>"))]
[h: outTxt = concat(outTxt,strformat("<b>Skills DB</b> set to =<b>%{versionSkillsDB}</b><br>"))]

[h: outTxt = concat(outTxt,strformat("<b>Critical</b> set to d20>=<b>%{usecrit}</b><br>"))]
[h: outTxt = concat(outTxt,strformat("<b>Fumble</b> set to d20&lt;=<b>%{usefumble}</b><br>"))]
[h: outTxt = concat(outTxt,strformat("<b>NPC Crit</b> set to %{npcCanCrit}</b><br>"))]
[h: outTxt = concat(outTxt,strformat("<b>Initiative</b> dice set to <b>1d%{initiativedice}</b>.<br>"))]
[h: outTxt = concat(outTxt,strformat("<b> Roll-Initiative once </b> mode %{initiativeOnce}.<br>"))]
[h: outTxt = concat(outTxt,strformat("<b> NPC Save/Check Private rolls</b> mode %{privateMode}.<br>"))]
[h: outTxt = concat(outTxt,strformat("<b> NPC Attack Private rolls</b> mode %{privateAttackMode}.<br>"))]
[h: outTxt = concat(outTxt,strformat("<b> PC save/skill/ability rolls </b> hidden mode %{hiddenMode}.<br>"))]
[h: outTxt = concat(outTxt,strformat("<b> NPC Sheet Load </b> auto load %{autoLoadNPCSheet}.<br>"))]
[h: outTxt = concat(outTxt,strformat("<b>DM</b> Default start map <b>%{defaultMapDM}</b><br>"))]
[h: outTxt = concat(outTxt,strformat("<b>PC</b> Default start map <b>%{defaultMapPC}</b><br>"))]
[h, if(processedDBChange):outTxt = concat(outTxt,strformat("<b>DB Change</b> <font color=red>SAVE Campaign and reload! Database options changed.</font><br>"))]
[broadcast(outTxt,"gm")]
