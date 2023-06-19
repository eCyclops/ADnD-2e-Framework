[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: item = getStrProp(arg(0),"item")]
[h: catagory = getStrProp(arg(0),"catagory")]
[h: newEntry  = getStrProp(arg(0),"newEntry",0)]

[h: currentEQ = getProperty("Equipment_List",myID)]

[h: itemTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]

[h: contLoc = 0]
[h: containerList = 'Carried,Stored']
[h, foreach(itemName,currentEQ,""), code :{
	[h: itemJSON = json.get(currentEQ,itemName)]
	[h: sourceName = json.get(itemJSON,"itemSource")]
	[h: sourceJSON = json.get(getLibProperty(itemTag+sourceName,"Lib:Equipment"),sourceName)]
	[if( json.get(sourceJSON,"isContainer")==1 && !listContains(containerList,itemName)  ):containerList = listAppend(containerList,itemName)]
}]

[h: 'Only allow items being purchased to be placed into carried/stored. This is a kludge for max capacity carried in containers for now.']
[h,if(newEntry):containerList = 'Carried,Stored']

[h, if(!json.isEmpty(currentEQ) && json.type(currentEQ) == "OBJECT"):testObj = json.get(currentEQ,item);testObj = '']
[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"  &&  !newEntry), code :{
	[h: itemLocation = json.get(testObj,"itemLocation")]
	[h: itemQuantity = json.get(testObj,"itemQuantity")]
	[h: itemSource = json.get(testObj,"itemSource")]
	[h: itemCatagory = json.get(testObj,"itemCatagory")]
	[h: itemCharges = json.get(testObj,"itemCharges")]
	[h: itemValue = json.get(testObj,"itemValue")]
	[h: itemNotes = json.get(testObj,"itemNotes")]
	[h: bookID = json.get(testObj,"bookID")]
};{
	[h: sourceJSON = json.get(getLibProperty(itemTag+item,"Lib:Equipment"),item)]

	[h: itemLocation = 'Carried']
	[h: itemQuantity = 1]
	[h: itemSource = item]
	[h: itemCatagory = catagory]
	[h: itemCharges = -1]
	[h: itemValue = json.get(sourceJSON,'value')]
	[h: bookID = -1]
	[h: itemNotes = ""]

	[macro("getNewItemName@Lib:Equipment:Macros"):strformat("myID=%{myID}; name=%{item};")]
	[h: item = macro.return]
}]

[h: itemLocationSaved = itemLocation]
[h: itemQuantitySaved = itemQuantity]

[h: sourceJSON = getLibProperty(itemTag+itemSource,"Lib:Equipment")]
[h: itemJSON = json.get(sourceJSON,itemSource)]
[h: hasCharges = json.get(itemJSON,"hasCharges")]

[h,if(listContains(containerList,itemLocation)):contLoc = listFind(containerList,itemLocation);contLoc = 0]

[h, if(bookID == -1 && catagory == "Book/Scroll" && newEntry), code :{
	[macro("getNewBookID@Lib:Equipment:Macros"):strformat("myID=%{myID};")]
	[h:bookID = getStrProp(macro.return,"bookID",-1)]
};{}]

[h: chargesInputText = strformat("itemCharges | %{itemCharges} | Charges of item (-1 for not charged)")]
[h, if(catagory == "Ammo" || catagory == "Goods"): chargesInputText = "junkvar | NA |Item charges | LABEL"]
[h, if(itemCatagory == 'Valuables'): 
				valueablesInput = strformat('itemValue | %{itemValue} | Value of item');
				valueablesInput = "junkvar | Value of item | NA | LABEL"]

[h: gotInput = 0]
[h, if(hasCharges && !gotInput), code :{
	[h: status=input(
	"junkvar|"+itemCatagory+"|Item category| LABEL",
	"junkvar|"+itemSource+"|Item source| LABEL",
	"item|"+item+"|Item name",
	"itemQuantity|"+itemQuantity+"|Quantity of item",
	chargesInputText,
	"itemLocation|"+containerList+"|Location of item|LIST|SELECT="+contLoc+" VALUE=STRING"
	)]
	[h: gotInput = 1]
};{}]

[h, if(!hasCharges && !gotInput), code :{
	[h: status=input(
	"junkvar|"+itemCatagory+"| Item category| LABEL",
	"junkvar|"+itemSource+"| Item source| LABEL",
	"item|"+item+"|Item name",
	valueablesInput,
	"itemQuantity|"+itemQuantity+"|Quantity of item",
	"itemLocation|"+containerList+"|Location of item|LIST|SELECT="+contLoc+" VALUE=STRING"
	)]
	[h: gotInput = 1]
}]
[h:abort(status)]

[h: 'Clean the inputed values to avoid errors']
[h: item = replace(item, ',' , '-')]
[h, macro("sanitizeNumbers@Lib:ADND"): itemQuantity]
[h: itemQuantity = macro.return]

[if( (itemLocationSaved != itemLocation || itemQuantitySaved != itemQuantity) && itemLocation != "Carried" && itemLocation != "Stored" ), code :{
	[h: assert(hasSpaceForItem(itemLocation, item, itemQuantity, myID)==1,strformat("You cannot fit %{item} into your %{itemLocation}."),0)]
};{}]

[h: macro.return = 
	"item="+item+";"+
	"itemSource="+itemSource+";"+
	"itemQuantity="+itemQuantity+";"+
	"itemLocation="+itemLocation+";"+
	"itemCatagory="+itemCatagory+";"+
	"itemCharges="+itemCharges+";"+
	"bookID="+bookID+";"+
	"newEntry="+newEntry+";"+
	"itemValue="+itemValue+";"+
	"itemNotes="+itemNotes+";"+
	'myID='+myID+';'+
	]
