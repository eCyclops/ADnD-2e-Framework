<!-- compare List with NPCList and if NPC item is missing from List add it and return List -->

[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(List,NPCList). "+getMacroName()+"@"+getMacroLocation())]

[H: list = arg(0) ]
[H: npcList = arg(1) ]

[h, foreach(entry,npcList,""), code :{
	[if(!listContains(list,entry)):
		list = listAppend(list,entry)]
}]
[h: list = listSort(list,"A")]
[h: macro.return = list]