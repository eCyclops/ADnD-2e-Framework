[h: closeFrame("Multiple Weapon Selection")]

[h: myID = json.get(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid in "+getMacroName()+"@"+getMacroLocation())]

[h: weaponList = '']
[h, foreach(check,arg(0),""), code :{
	[if(startsWith(check,"weapon.")), code :{
		[h: findString = strformat( "\^(?i).*\\.(.*)(\$)" )]
		[h: id = strfind(check, findString)]
		[h, if(getFindCount(id)>0): attackNumber = getGroup(id, 1, 1); attackNumber = -1]
		[weaponList = ListAppend(weaponList,attackNumber)]
	};{}]

}]
[h: setProperty("LastMultiAttack",weaponList, myID)]

[h, macro("DO_Attack@Lib:ADND"):strformat("myID=%{myID}; weaponList=%{weaponList};")]

