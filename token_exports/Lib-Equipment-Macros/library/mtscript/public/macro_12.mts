[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]
[h: encumbrance = "none"]

[h: currentDB = getProperty("Equipment_List",myID)]
[h: itemTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]
[h: totalWeight = 0]


[if(!json.isEmpty(currentDB) && json.type(currentDB) == "OBJECT"), code :{
[h: itemNames = json.sort(json.fields(currentDB, 'json'))]

<!-- item list-->
<TABLE  WIDTH="100%">
	[r: listsorteditemsEQ(strformat("myID=%{myID};"))]
	[h: totalWeight = getStrProp(macro.return,"totalWeight",0)]
	[h: encumbrance = adjustEncumbranceValue(totalWeight,myID)]

	<tr BGCOLOR="#F0F0F0">
	  <td colspan="2">Total Weight Carried:</td>
		<td align="center"><b>[r: totalWeight]</b></td>
		<td align="center" colspan="2">[r, if(encumbrance != "none"): strformat("<i>%{encumbrance} encumbered</i>")]</td>
	</tr>
};{ 
	<tr>No equipment.</tr>
}]
</TABLE>

<TABLE width="100%">
  <tr ALIGN=CENTER><td VALIGN=CENTER >[r: macroLink('+add','Open Tradepost@Lib:Equipment:Macros','none',strformat("myID=%{myID};"),myID)],  [r: macroLink('+notes','noteAsk@Lib:Equipment:Macros','none',strformat("myID=%{myID};"),myID)][if(isGM()), code: {,  [r: macroLink('+GM notes','noteAsk@Lib:Equipment:Macros','none',strformat("myID=%{myID};noteType=gm"),myID)]};{}]</td></tr>
</TABLE>