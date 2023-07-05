[h: '<!-- returns weight of object, some containers have weight reduction effect -->']

[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(myID, itemName). "+getMacroName()+"@"+getMacroLocation())]

[H: myID = arg(0) ]
[H: itemName = arg(1) ]

[h: currentDB = getProperty("Equipment_List",myID)]
[h: itemTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]
[h: finalWeight = 0]

[h: thisJSON = json.get(currentDB,itemName)]
[h: myLocation = json.get(thisJSON,"itemLocation")]
[h: myCount = json.get(thisJSON,"itemQuantity")]
[h: mySource = json.get(thisJSON,"itemSource")]

[h: sourceProperty = getLibProperty(itemTag+mySource,"Lib:Equipment")]
[h, if(length(sourceProperty)>0): sourceJSON = json.get(sourceProperty,mySource);sourceJSON = "{}"]

[h, if (json.isEmpty(sourceJSON)): 
	myWeight = 0; 
	myWeight = json.get(sourceJSON,"weight")*mycount]

[if(myLocation != "Carried" && myLocation != "Stored"), code :{
	[h: thisContainerJSON = json.get(currentDB,myLocation)]
	[h: myContainerSource = json.get(thisContainerJSON,"itemSource")]

	[h: sourceProperty = getLibProperty(itemTag+myContainerSource,"Lib:Equipment")]
	[h, if(length(sourceProperty)>0): sourceContainerJSON = json.get(sourceProperty,myContainerSource);sourceContainerJSON = "{}"]


	[h: myWtReduction = json.get(sourceContainerJSON,"wt_reduction")]
	[h: percentReduction = myWtReduction * 0.01]
	[h: finalWeight = myWeight - (myWeight*percentReduction)]
};{
	[h: finalWeight = myWeight]
}]


[h: macro.return = finalWeight]
