[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: item = getStrProp(arg(0),"item","unknown")]
[h: newEntry  = getStrProp(arg(0),"newEntry",0)]
[h: ItemCatagory = getStrProp(arg(0),"ItemCatagory","Goods")]
[h: itemLocation = getStrProp(arg(0),"itemLocation",'Carried')]
[h: itemQuantity = getStrProp(arg(0),"itemQuantity",1)]
[h: itemSource = getStrProp(arg(0),"itemSource","Unknown")]
[h: itemCharges = getStrProp(arg(0),"itemCharges",-1)]
[h: itemValue = getStrProp(arg(0),"itemValue","unknown")]
[h: bookID = getStrProp(arg(0),"bookID",-1)]
[h: itemNotes = getStrProp(arg(0),"itemNotes","")]

[h: storeThis = json.set("{}",
	"itemSource",itemSource,
	"itemCatagory",ItemCatagory,
	"itemQuantity",itemQuantity,
	"itemLocation",itemLocation,
	"itemCharges",itemCharges,
	"itemValue",itemValue,
	"itemNotes",itemNotes,
	"bookID",bookID
)]

[h: currentEQ = getProperty("Equipment_List",myID)]
[h, if(!json.isEmpty(currentEQ) && json.type(currentEQ) == "OBJECT"):testObj = json.get(currentEQ,item);testObj = '']
[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"):isEdit = 1;isEdit = 0]

[h: tag = "book."]
[h: bookInfo = getProperty(tag+bookID,myID)]
[h, if(itemCatagory == "Book/Scroll" && bookID != -1 && newEntry), code :{
	[h: storePage = json.set("{}","count",0,"item",item)]
	[h: setProperty(tag+bookID, json.set("{}","hidden-book-notes",storePage),myID) ]
};{}]

[h: setProperty("Equipment_List",json.set(currentEQ,item,storeThis),myID)]

[r: updateEquipedAdjustments(strformat("myID=%{myID};"))]

[h, if(isEdit == 1): updateTxt = "changed"; updateTxt = "added"]
[h: outTxt = getName(myID)+strformat(" %{updateTxt} %{item} in their equipment list.<br>")]
[r: showIt(outTxt,myID,"default",0)]

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
