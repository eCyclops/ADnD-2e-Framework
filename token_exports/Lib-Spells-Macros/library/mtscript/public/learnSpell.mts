[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

<!-- memorize or learn spell   -->
[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType")]
[h: viewLevelSpell  = getStrProp(arg(0), "viewLevelSpell",1)]
[h: spellName = getStrProp(arg(0), "Name")]
[h: spellLevel = getStrProp(arg(0), "Level")]

[if(vancianType == "Memorized"), code :{
	[h: assert(okToMemorizeSpell(spellLevel,magicType,myID),"You do not have enough available spell slots to memorize that spell.",0)]
};{}]

[h: spellProp = add(magicType,"_"+vancianType)]
[h: sk = getProperty(spellProp,myID)]

[h: count = 0]
[h, if(! json.isEmpty(sk) && json.type(sk) == "OBJECT"):  spellInfo = json.get(sk,spellName);spellInfo='']
[h, if(! json.isEmpty(spellInfo) && json.type(spellInfo) == "OBJECT"): count = json.get(spellInfo,'count')]
[h: count = add(count,1)]

[h: itemStore = json.set("{}","level",spellLevel,"count",count)]

[h: new_sk = json.set(sk,spellName,itemStore)]

[h: setProperty(spellProp, new_sk,myID)]

[h: new_sk = json.set(sk,spellName,itemStore)]

[h: setProperty(spellProp, new_sk,myID)]

[if(vancianType == "Memorized"), code :{
	[h: outTxt = getName(myID)+strformat(" <i>memorized</i> <b>%{spellName}</b>.")]
	[h: connectedPlayerID = getPlayerName()]
	[broadcast(outTxt,"gm")]
	[broadcast(outTxt,connectedPlayerID)]
};{
	[h: outTxt = getName(myID)+strformat(" <i>learned</i> <b>%{spellName}</b>.")]
	[h: connectedPlayerID = getPlayerName()]
	[broadcast(outTxt,"gm")]
	[broadcast(outTxt,connectedPlayerID)]
}]

[h, if(vancianType == 'Memorized' && isNPC(myID)), code :{
	[macro("NPC_setSpellsMemorized@Lib:Spells:Macros"):strformat("myID=%{myID};vancianType=%{vancianType}; magicType=%{magicType};")]
};{}]

[if(isFrameVisible("Spellbook")), code :{
	[macro("Learn_Menu@Lib:Spells:Macros"):arg(0)]
};{}]


[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=Spells;")]
};{}]

[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
[h, if(isFrameVisible(npcSheetFrame)): 
	NPC_Sheet(strformat("myID=%{myID};"))]

