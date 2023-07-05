[h: '<!-- adjusts tokens move value based on encumbrance/weight carried -->']

[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(weightCarried, TokenID). "+getMacroName()+"@"+getMacroLocation())]

[H: weightCarried = arg(0) ]
[H: myID = arg(1) ]

[H: encumbranceProp = getProperty("Encumbrance_Table",myID)]
[h: baseMove = getProperty("Movement",myID)]
[h: moveEnc = "none"]
[h: newMove = baseMove]

[if(weightCarried >= getStrProp(encumbranceProp,"light",40)), code :{
	[h: newMove = round(baseMove-(baseMove*(1/3)))]
	[h: moveEnc = "lightly"]
};{}]
[if(weightCarried >= getStrProp(encumbranceProp,"moderate",50)), code :{
	[h: newMove = round(baseMove-(baseMove*(1/2)))]
	[h: moveEnc = "moderately"]
};{}]
[if(weightCarried >= getStrProp(encumbranceProp,"heavy",90)), code :{
	[h: newMove = round(baseMove-(baseMove*(2/3)))]
	[h: moveEnc = "heavily"]
};{}]
[if(weightCarried >= getStrProp(encumbranceProp,"severe",120)), code :{
	[h: newMove = 1]
	[h: moveEnc = "severely"]
};{}]

[h: owners = getOwners(",",myID)]
[h: tokenName = getName(myID)]
[h: messg = strformat("%{tokenName} is %{moveEnc} encumbered slowing movement to %{newMove} while carrying %{weightCarried} pounds.<br>")]
[h:',if(owners != '' && moveEnc != "none" ): broadcast(messg,owners)']
[h, if(moveEnc != "none" ): broadcast(messg,getPlayerName())]

[h: setProperty("AdjustedMove",newMove,myID)]

[h: macro.return = moveEnc]

