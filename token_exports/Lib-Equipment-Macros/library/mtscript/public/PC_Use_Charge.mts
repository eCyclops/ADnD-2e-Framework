[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: item = getStrProp(arg(0),"item")]
[h: inCombat = getStrProp(arg(0),"inCombat",0)]
[h, if (!inCombat): assert( askYN(strformat("Use charge on %{item}?"),1) ,strformat("Avoided using a charge on %{item}."),0)]

[h: curEQ = getProperty("Equipment_List",myID)]

[h: itemJSON = json.get(curEQ,item)]
[h: currentCharges = json.get(itemJSON,"itemCharges")]
[h: itemCatagory = json.get(itemJSON,"itemCatagory")]
[h: itemQuantity  = json.get(itemJSON,"itemQuantity")]
[h: itemSource  = json.get(itemJSON,"itemSource")]

[h: itemTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]
[h: sourceJSON = json.get(getLibProperty(itemTag+itemSource,"Lib:Equipment"),itemSource)]
[h: description = decode(json.get(sourceJSON,"description"))]
[h: shortName = decode(json.get(sourceJSON,"shortName"))]
[h: itemNameTxt = item]

[h: consumeText = "has used a charge from a"]
[h: isOut = 0]
[h, if((currentCharges-1)<0):leftOverCharges=0; leftOverCharges = currentCharges-1]
[h, if(itemCatagory == "Goods" || itemCatagory == "Ammo"), code :{
	[if((itemQuantity-1)<0):isOut = 1; isOut = 0]
	[if((itemQuantity-1)<0):itemQuantity=0 ; itemQuantity = itemQuantity - 1]
	[leftOverCharges = itemQuantity]
	[itemJSON = json.set(itemJSON,"itemQuantity",itemQuantity)]
	[h,if(itemCatagory == "Goods"): consumeText = "has consumed" ; consumeText = "has launched"]
	[h: itemNameTxt = shortName]
};{}]

[h, if (itemCatagory == 'Ammo'): usesTxt = strformat('Your %{item} ammunition has been depleted'); usesTxt = strformat('You have no more charges remaining on the %{item}')]
[h: assert(!isOut,strformat('%{usesTxt}.<br>'),0)]

[h: itemJSON = json.set(itemJSON,"itemCharges",leftOverCharges)]
[h: curEQ = json.set(curEQ,item,itemJSON)]
[h: setProperty("Equipment_List",curEQ,myID)]

[h: pcName = getName(myID)]
[h: outTxt = strformat("%{pcName} %{consumeText} <b>%{itemNameTxt}</b> with <i>%{leftOverCharges}</i> remaining.<br>")]

[r: showIt(outTxt,myID,"default",0)]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(!inCombat && isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=Equipment;")]
};{}]

[if(isFrameVisible("Open Bags")), code :{
	[macro("OpenBags@Lib:Equipment:Macros"):strformat("myID=%{myID};")]
};{}]


[h: macro.return = outTxt]