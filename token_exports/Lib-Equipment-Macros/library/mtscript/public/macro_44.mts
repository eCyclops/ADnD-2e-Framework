[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: itemTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]
[h: currentDB = getProperty("Equipment_List",myID)]

[h, if (json.isEmpty(currentDB) && json.type(currentDB) == "OBJECT"): itemNames = '{}'; itemNames = json.sort(json.fields(currentDB, 'json'))]

[h: saveAdjustment = 0]
[h, foreach(item, itemNames, ""), code :{
	[h: thisJSON = json.get(currentDB,item)]
	[h: myLocation = json.get(thisJSON,"itemLocation")]
	[h: mySource = json.get(thisJSON,"itemSource")]

	[h: sourceProperty = getLibProperty(itemTag+mySource,"Lib:Equipment")]
	[h, if(length(sourceProperty)>0): sourceJSON = json.get(sourceProperty,mySource);sourceJSON = "{}"]

	[h: armorSaveAdj = json.get(sourceJSON,"armorSaveAdj")]
	[h, if(myLocation == "Carried" && armorSaveAdj != 0 && armorSaveAdj != ""): saveAdjustment = saveAdjustment + armorSaveAdj]
}]

[h: macro.return = saveAdjustment]