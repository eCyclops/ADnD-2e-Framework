[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: catagorySelection = getStrProp(arg(0),"catagorySelection","Goods")]

[h: catList = getLibProperty("Catagories","Lib:Equipment")]

[h: catagorySelectionTxt = '']

[h: catagorySelectionTxt = concat(catagorySelectionTxt,strformat('<table border=1 cellpadding=1><tr>'))]
[h: catagorySelectionTxt = concat(catagorySelectionTxt,strformat('<td><b>Catagory Selection</b></td>'))]
[foreach(cat,catList,""), code :{
	[h: catLink =  macroLink(cat,'Open Tradepost@Lib:Equipment:Macros','none',strformat('myID=%{myID}; catagorySelection=%{cat};'))]
	[h,if(cat == catagorySelection): 
		 catagorySelectionTxt = concat(catagorySelectionTxt,strformat('<td bgcolor=white>%{cat}</td>'));
		 catagorySelectionTxt = concat(catagorySelectionTxt,strformat('<td bgcolor=yellow>%{catLink}</td>'))]
}]
[h: catagorySelectionTxt = concat(catagorySelectionTxt,strformat('</tr></table>'))]

[frame("Tradepost"): {
<html>
<head>
<title>Tradepost</title>
<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
</head>
<BODY BGCOLOR="#FFD700">
    <TABLE BORDER="0" CELLPADDING="1" WIDTH="100%"  BORDERCOLOR="#000000" BORDERCOLORLIGHT="#000000" BORDERCOLORDARK="#000000">
<TR>[r: catagorySelectionTxt]</TR>
<TR>
<TD BGCOLOR="#FFD700">
<TABLE WIDTH="100%">

<TD VALIGN="TOP">
<TABLE width=100% BORDER="1" CELLPADDING="5" BORDERCOLOR="#000000" BORDERCOLORLIGHT="#000000" BORDERCOLORDARK="#000000">
<TR>
<TD BGCOLOR="#F0F0F0"><FONT FACE="Verdana,Arial" SIZE="+1"><STRONG>[r: catagorySelection]</STRONG></FONT>
<TABLE width=100% border=1 cellpadding=1 >
	[h: args = strformat("myID=%{myID}; catagory=%{catagorySelection};")]
	<tr>[r: ListTradepost(args)]</tr>
</TABLE>
</TR>
</TD>
</TABLE>


</TABLE>
</TR>
</TD>
</TABLE>
<hr>
[h: disabled = 'macroLink("<i>Add Item to Tradepost Inventory</i> (confer with DM first)","Add Item@Lib:Equipment:Macros","none",strformat("myID=%{myID};"))']
</body>
</html>
}]

