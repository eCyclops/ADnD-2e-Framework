[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: currentName = getStrProp(arg(0),"name","unknown")]
[h: newName = currentName]

[h: currentEQ = getProperty("Equipment_List",myID)]
[h, if(!json.isEmpty(currentEQ) && json.type(currentEQ) == "OBJECT"):testObj = json.get(currentEQ,currentName);testObj = '']

[h: count=0]
[while(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"), code :{
	[h: previousName = newName]
	[h: count = count +1]
	[h: newName = currentName+"("+count+")"]
	[h: testObj = json.get(currentEQ,newName)]

}]

[macro.return = newName]