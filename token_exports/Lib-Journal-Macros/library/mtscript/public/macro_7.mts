[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: name = getStrProp(arg(0),"name")]
[h: description = getStrProp(arg(0),"description")]

[h: assert(!(name =='' || description == ''),"Need name and description.",1)]

[h: journalTag = getLibProperty("JournalsTagVar","Lib:Journal")]
[h: tag = strformat('%{journalTag}.%{name}')]

[h: storeThis = strformat('name=%{name}; description=%{description}; ')]

[h: setProperty(tag,storeThis,myID)]

[h: jName = decode(name)]
[h: outTxt = getName(myID)+strformat(" added new personal journal entry under %{jName}.<br>")]
[r: showIt(outTxt,myID,"default",0)]

[if(isFrameVisible("Player Journal Management")), code :{
	[macro("ManageJournal@Lib:Journal:Macros"):strformat('myID=%{myID};'))]
};{}]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=Journal;")]
};{}]


[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
[h, if(isFrameVisible(npcSheetFrame)): 
	NPC_Sheet(strformat("myID=%{myID};"))]
