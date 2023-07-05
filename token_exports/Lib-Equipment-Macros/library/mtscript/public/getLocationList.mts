[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: containerList = getStrProp(arg(0),"containerList")]
[h: curEQ = getStrProp(arg(0),"curEQ")]

[h, foreach(itemName,curEQ,""), code :{
	[h: itemJSON = json.get(curEQ,itemName)]
	[if( json.get(itemJSON,"isContainer")==1 && !listContains(containerList,itemName)  ):containerList = listAppend(containerList,itemName)]
}]

[h: macro.return= "containerList="+containerList+";"]