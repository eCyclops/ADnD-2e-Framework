[h: myID = macro.args]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: inventoryDB = getProperty("Equipment_List",myID)]

[h: itemTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]

[h: newInventoryDB = "{}"]
[h: containerList = 'Carried,Stored']
[h, foreach(itemName, inventoryDB, ""), code: {
	<!-- Generate an ID for the item -->
	[h: itemID = uniqueID()]

	<!-- Load the data for the item -->
	[h: itemData = json.get(inventoryDB, itemName)]
	[h: itemData = json.set(itemData, "itemName", itemName)]

	<!-- If this item is a container, add it to the container list -->
	[h: sourceName = json.get(itemData,"itemSource")]
	[h: sourceProperty = getLibProperty(itemTag+sourceName,"Lib:Equipment")]
	[h, if(length(sourceProperty)>0): sourceJSON = json.get(sourceProperty,sourceName); sourceJSON = "{}"]
	[if( !json.isEmpty(sourceJSON) && json.type(sourceJSON) == "OBJECT"): emptySource = 0; emptySource = 1]
	[if( !emptySource && json.get(sourceJSON,"isContainer") == 1 && !listContains(containerList,itemID)):
		containerList = listAppend(containerList,itemID)]
	
	[h: newInventoryDB = json.set(newInventoryDB, itemID, itemData)]
}]

[r: containerList]
[r: newInventoryDB]