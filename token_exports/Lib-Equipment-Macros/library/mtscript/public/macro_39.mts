[h: myID = json.get(arg(0),"myID")]
[h: item = json.get(arg(0),"item")]
[h: noteType = json.get(arg(0),"noteType")]
[h: userName = getPlayerName()]
[h: tokenName = getName(myID)]

[h: closeFrame("Notes Object Frame")]

<!-- encode itemNotes -->
[h: encodedNotes = encode(json.get(arg(0),"itemNotes"))]

[h: currentEQ = getProperty("Equipment_List",myID)]
[h, if(!json.isEmpty(currentEQ) && json.type(currentEQ) == "OBJECT"), code :{
  [h: testObj = json.get(currentEQ,item)]
  [h, if(noteType == "gm"): noteLocation = "itemNotesGM"; noteLocation = "itemNotes"]
  [h: testObj = json.set(testObj,noteLocation,encodedNotes)]
  [h: currentEQ = json.set(currentEQ,item,testObj)]
  [h: setProperty("Equipment_List", currentEQ, myID)]

	[h, if(noteType != "gm"), code: {
	  [h: broadcast(strformat('Note added to %{item}.<br>'),userName)]
	  [h: broadcast(strformat('%{tokenName} updated %{item} note in equipment list.<br>'),"gm")]
	};{}]
};
{
  [h: broadcast(strformat('%{item} not found in inventory.<br>'),userName)]
  [h: broadcast(strformat('%{tokenName} tried to update %{item} note but was not in inventory.<br>'),"gm")]
}]


[if(isFrameVisible("Open Bags")), code :{
  [macro("OpenBags@Lib:Equipment:Macros"):strformat("myID=%{myID};")]
};{}]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
  [macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=Equipment;")]
};{}]

[if(isFrameVisible("Tradepost") && !isFrameVisible(pcSheetFrame)), code :{
  [macro("OpenBags@Lib:Equipment:Macros"):strformat("myID=%{myID};")]
};{}]


[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
[h, if(isFrameVisible(npcSheetFrame)): 
  NPC_Sheet(strformat("myID=%{myID};"))]
