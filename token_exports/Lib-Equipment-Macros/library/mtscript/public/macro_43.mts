[h: myID = arg(0)]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: containerList = getProperty("Equipment_Containers",myID)]
[h: inventoryDB = getProperty("Equipment_List",myID)]
[h: HTMLcache = getProperty("Equipment_HTML_Cache",myID)]

[h: inventoryHTML = ""]
[h, foreach(container, containerList, ""), code: {
	[h: containerHTML = json.get(HTMLcache,container)]
	[h, if(length(containerHTML)=0), code: {
		[h, macro("Generate Container HTML@Lib:Equipment:Macros"): container]
		[h: containerHTML = macro.return]
	}]
	[h: inventoryHTML = concat(inventoryHTML,containerHTML)]
}]

[r: inventoryHTML]