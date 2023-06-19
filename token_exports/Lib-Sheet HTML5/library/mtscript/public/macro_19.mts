[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]
[h: encumbrance = "none"]

[h: currentDB = getProperty("Equipment_List",myID)]
[h: itemTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]
[h: totalWeight = 0]

[if(!json.isEmpty(currentDB) && json.type(currentDB) == "OBJECT"), code :{
[h: itemNames = json.sort(json.fields(currentDB, 'json'))]

<!-- item list-->
	[r, macro("List Inventory Locations@this"): strformat("myID=%{myID};")]
	[h: totalWeight = getStrProp(macro.return,"totalWeight",0)]
	[h: encumbrance = adjustEncumbranceValue(totalWeight,myID)]

	<div align=center>
	  <span>Total Weight Carried:</span>
		<span align="center"><b>[r: totalWeight]</b></span>
		<span align="center">[r, if(encumbrance != "none"): strformat("<i>%{encumbrance} encumbered</i>")]</span>
	</div>
};{ 
	<p>No equipment.</p>
}]

<div>
  <div align=center>[r: macroLink('+add','Open Tradepost@Lib:Equipment:Macros','none',strformat("myID=%{myID};"),myID)],  [r: macroLink('+notes','noteAsk@Lib:Equipment:Macros','none',strformat("myID=%{myID};"),myID)][if(isGM()), code: {,  [r: macroLink('+GM notes','noteAsk@Lib:Equipment:Macros','none',strformat("myID=%{myID};noteType=gm"),myID)]};{}]</div>
</div>