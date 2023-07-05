[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: itemTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]
[h: currentDB = getProperty("Equipment_List",myID)]

[h, if (json.isEmpty(currentDB) && json.type(currentDB) == "OBJECT"), code : {
	[h: 'broadcast(getName(myID)+ " has no equipment.<br>",getPlayerName())']
	[h: emptyEquipmentList = 1]
	[h: itemNames = '{}']
};{
	[h: emptyEquipmentList = 0]
	[h: itemNames = json.sort(json.fields(currentDB, 'json'))]
}]


[h: armorWorn = ""]
[h: shieldWorn = ""]
[h: shieldAC = 0]
[h: armorAC = 0]
[h, foreach(item, itemNames, ""), code :{
	[h: thisJSON = json.get(currentDB,item)]
	[h: myLocation = json.get(thisJSON,"itemLocation")]
	[h: mySource = json.get(thisJSON,"itemSource")]

	[h: sourceProperty = getLibProperty(itemTag+mySource,"Lib:Equipment")]
	[h, if(length(sourceProperty)>0): sourceJSON = json.get(sourceProperty,mySource);sourceJSON = "{}"]

	[h: myDescription = json.get(sourceJSON,"description")]
	[h: myCatagory = json.get(sourceJSON,"catagory")]
	[h: myArmorType = json.get(sourceJSON,"armorType")]
	[h: myAC = json.get(sourceJSON,"ac")]
	[h, if(myLocation == "Carried" && myAC != 0), code :{
		[if(myArmorType == 'Shield'):
			shieldWorn = concat(shieldWorn,strformat("(%{item}) "));
			armorWorn = concat(armorWorn,strformat("(%{item}) "))]
		[if(myArmorType == 'Shield'):
			shieldAC = add(shieldAC,myAC);
			armorAC = add(armorAC,myAC)]
	};{}]
}]

[h, if(armorWorn == ''): armorWorn = 'none']
[h, if(shieldWorn == ''): shieldWorn = 'none']

[h: armorDetails = getProperty("Armor_Details",myID)]

[h: armorDetails = setStrProp(armorDetails,"Shield_Worn",shieldWorn)]
[h: armorDetails = setStrProp(armorDetails,"Shield_Adjustment",shieldAC)]

[h: armorDetails = setStrProp(armorDetails,"Armor_Worn",armorWorn)]
[h: armorDetails = setStrProp(armorDetails,"Armor_Adjustment",armorAC)]

[h, if (emptyEquipmentList == 0): setProperty("Armor_Details",armorDetails, myID)]

