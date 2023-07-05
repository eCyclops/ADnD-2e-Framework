[h: catagory = getStrProp(arg(0),"catagory")]
[h: item = getStrProp(arg(0),"item")]

[h: currentDBIndex = getLibProperty(catagory,"Lib:Equipment")]
[h: setLibProperty(catagory,json.remove(currentDBIndex,item),"Lib:Equipment")]

[h: broadcast(strformat("Removed %{item}.<br>"),"gm")]

[h, if(isFrameVisible("Inventory Management")), code :{
	[h, macro("Manage Main@Lib:Equipment:Macros"):"catagory="+catagory+";"]
};{}]
