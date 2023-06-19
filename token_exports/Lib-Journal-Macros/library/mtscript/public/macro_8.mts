[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: name = getStrProp(arg(0),"name")]

[h: journalTag = getLibProperty("JournalsTagVar","Lib:Journal")]
[h: tag = strformat('%{journalTag}.%{name}')]
[h: setProperty(tag,'',myID)]

[h: outTxt = getName(myID)+strformat(" deleted personal journal entry under %{name}.<br>")]
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
