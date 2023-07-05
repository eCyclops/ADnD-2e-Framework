[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: item = getStrProp(arg(0),"item")]
[h: catagory = getStrProp(arg(0),"catagory")]

[h: assert( askYN(strformat("Delete/remove %{item}?"),1) ,strformat("Did not drop %{item}."),0)]

[h: currentEQ = getProperty("Equipment_List",myID)]

[h: itemJSON = json.get(currentEQ,item)]
[h: bookID = json.get(itemJSON,"bookID")]
[h: tag = "book."]
[h: bookInfo = getProperty(tag+bookID,myID)]
[h, if(catagory == "Book/Scroll" && bookID != -1), code :{
	[h: setProperty(tag+bookID,"",myID)]
};{}]

[h: itemNames = json.toList(currentEQ)]
[h: itemNames = listDelete(itemNames,listFind(itemNames,item))]
[foreach(inventory, itemNames, ""), code :{
	[h: thisJSON = json.get(currentEQ,inventory)]
	[h: myLocation = json.get(thisJSON,"itemLocation")]
	[if ( listFind(itemNames,myLocation) == -1 && myLocation != 'Carried' && myLocation != 'Stored'), code :{
		[h: thisJSON = json.set(thisJSON,"itemLocation","Carried")]
		[h: currentEQ = json.set(currentEQ,inventory,thisJSON)]
		[h: setProperty("Equipment_List",currentEQ,myID)]

		Removed [r: inventory] from container that is no longer present.<br>
	};{}]
}]

[h: setProperty("Equipment_List",json.remove(currentEQ,item),myID)]

[h: outTxt = getName(myID)+strformat(" removed %{item} in their equipment list.<br>")]
[r: showIt(outTxt,myID,"default",0)]

[updateEquipedAdjustments(strformat("myID=%{myID};"))]

[if(isFrameVisible("Open Bags")), code :{
	[macro("OpenBags@Lib:Equipment:Macros"):strformat("myID=%{myID};")]
};{}]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=Equipment;")]
};{}]

[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
[h, if(isFrameVisible(npcSheetFrame)): 
	NPC_Sheet(strformat("myID=%{myID};"))]
