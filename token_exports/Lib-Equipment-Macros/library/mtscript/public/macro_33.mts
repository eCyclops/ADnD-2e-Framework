[h: '<!-- See if the container has enought "weight" left to hold this new item -->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<4),"To few arguments to function "+getMacroName()+"(container, equipment_item_name, itemCount, tokenID). "+getMacroName()+"@"+getMacroLocation())]

[H: container = arg(0) ]
[H: item = arg(1) ]
[H: itemCount = arg(2) ]
[H: myID = arg(3) ]

[h: currentWeightInContainer = getCarriedContainerContentsWeight(container,myID)]
[h: itemWeight = getCarriedItemWeight(item,itemCount,myID)]

[h: currentEQ = getProperty("Equipment_List",myID)]
[h: containerJSON = json.get(currentEQ,container)]
[h: containerSource = json.get(containerJSON,"itemSource")]
[h: containerSourceJSON = getITEMJSON(containerSource)]
[h: containerCarries = json.get(containerSourceJSON,"max_weight_carried")]

[h: currentWeightInContainer = currentWeightInContainer + itemWeight]
[h, if(currentWeightInContainer > containerCarries): canCarry = 0; canCarry = 1]

[h: macro.return = canCarry]
