[h: '<!-- getCarriedContainerContentsWeight, get weight of everything in a container and return it -->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(container, tokenID). "+getMacroName()+"@"+getMacroLocation())]

[H: container = arg(0) ]
[H: myID = arg(1) ]


[h: currentWeightInContainer = 0]


[h: currentEQ = getProperty("Equipment_List",myID)]


[h, foreach(equipment,currentEQ,""), code :{
	[h: thisJSON = json.get(currentEQ,equipment)]
	[h: thisLocation = json.get(thisJSON,"itemLocation")]
	[h: myCount = json.get(thisJSON,"itemQuantity")]
	[if(thisLocation == container && equipment != container), code :{
		[h: currentWeightInContainer = 
			currentWeightInContainer + getCarriedItemWeight(equipment,myCount,myID,1)]
	};{}]
}]


[h: macro.return = currentWeightInContainer]
