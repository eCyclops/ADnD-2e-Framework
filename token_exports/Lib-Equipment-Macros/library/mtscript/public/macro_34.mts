[h: '<!-- getCarriedItemWeight, get weight of item and its contents if container-->']

[H: numArgs = argCount()]
[h: assert(!(numArgs<3),"To few arguments to function "+getMacroName()+"(equipment_item_name, itemCount, tokenID,currentItem). "+getMacroName()+"@"+getMacroLocation())]

[H: item = arg(0) ]
[H: itemCount = arg(1) ]
[H: myID = arg(2) ]
[h: '<!-- if this is a "test" to see if it will fit or are we trying to calculate based on currentItems -->']
[h, if(numArgs == 4): currentItem = arg(3);currentItem = 0]

[h: currentEQ = getProperty("Equipment_List",myID)]

[h: itemJSON = json.get(currentEQ,item)]

[h: itemNewCount = itemCount]
[h: itemOldCount = json.get(itemJSON,"itemQuantity")]
[h: itemAdjustmentCount = itemNewCount - itemOldCount]

[h, if(currentItem): itemMyCount = itemOldCount; itemMyCount = itemAdjustmentCount]

[h: itemSource = json.get(itemJSON,"itemSource")]
[h: itemSourceJSON = getITEMJSON(itemSource)]
[h: isContainer = json.get(itemSourceJSON,"isContainer")]
[h: itemWeight = json.get(itemSourceJSON,"weight")*itemMyCount]

[h,if(isContainer): contentsWeight = getCarriedContainerContentsWeight(item,myID); contentsWeight = 0]

[h: totalWeight = itemWeight + contentsWeight]

[h: macro.return = totalWeight]
