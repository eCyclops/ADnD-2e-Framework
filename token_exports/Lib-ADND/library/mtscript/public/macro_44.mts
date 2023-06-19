[h: Items = getProperty("test")]


[h:status = input(
	"seperator|<html><b>--- Armor ---</b></html>||LABEL|SPAN=TRUE",
	"sName|name|Enter name", 
	"sType|leather|Enter type", 
	"sacValue|10|Enter acValue", 
	"sacAdjust|0|Enter acAdjust", 
	"sWT|0|Enter weight", 
	"sCost|0|Enter cost"

)]
[H: abort(status)]

<!-- so we dont have same name in various cases -->
[h: sName = lower(sName)]

[h: testObj = json.get(getProperty("test"), sName)]

[if(!json.isEmpty(testObj)), code :{
	{sName} already exists.<br>
	[h: obj = json.get(getProperty("test"),sName)]
	as = {json.get(obj,"type")}<br>
};
{
	[h: itemStore = json.set("{}","type",sType,"acValue",sacValue,"acAdjust",sacAdjust,"wt",sWT,"cost",sCost)]
	[h: setLibProperty("test",json.set(getLibProperty("test","Lib:ADND"),sName,itemStore),"Lib:ADND")]

	<!-- Flip through all objects and get properties -->
	[foreach(Item, getProperty("test")):">>"+Item + ": " + json.get(getProperty("test"), Item)+"<br>"]
}]


