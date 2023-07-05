[h: catagorySelection = getStrProp(arg(0),"catagorySelection","Goods")]

[h: catList = getLibProperty("Catagories","Lib:Equipment")]

[h: catagorySelectionTxt = '']

[h: catagorySelectionTxt = concat(catagorySelectionTxt,strformat('<table align=center border=1 cellpadding=1><tr>'))]
[h: catagorySelectionTxt = concat(catagorySelectionTxt,strformat('<caption><b>Catagory Selection</b></caption>'))]
[h, foreach(cat,catList,""), code :{
	[h: catLink =  macroLink(cat,'Manage Main@Lib:Equipment:Macros','none',strformat('catagorySelection=%{cat};'))]
	[h,if(cat == catagorySelection): 
		 catagorySelectionTxt = concat(catagorySelectionTxt,strformat('<td bgcolor=white>%{cat}</td>'));
		 catagorySelectionTxt = concat(catagorySelectionTxt,strformat('<td bgcolor=yellow>%{catLink}</td>'))]
}]
[h: catagorySelectionTxt = concat(catagorySelectionTxt,strformat('</tr></table>'))]


[frame("Inventory Management"): {
<html>
<head>
<title>Equipment Management</title>
<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
</head>
<BODY BGCOLOR="#FFD700">
<TABLE BORDER="0" CELLPADDING="1" WIDTH="100%"  BORDERCOLOR="#000000" BORDERCOLORLIGHT="#000000" BORDERCOLORDARK="#000000">
<TR>[r: catagorySelectionTxt]</TR>
<TR>
<TD BGCOLOR="#FFD700">
<TABLE WIDTH="100%">
<!-- catagory-->
<TD VALIGN="TOP">
 <TABLE WIDTH="100%" BORDER="1" CELLPADDING="5" BORDERCOLOR="#000000" BORDERCOLORLIGHT="#000000" BORDERCOLORDARK="#000000">
<TR>
<TD BGCOLOR="#F0F0F0"><FONT FACE="Verdana,Arial" SIZE="+1"><STRONG>[r: catagorySelection]</STRONG></FONT>
<TABLE WIDTH="100%" border=1 cellpadding=1>
	[h: args = "catagory="+catagorySelection+";"]
	<tr>[r: listTables(args)]</tr>
</TABLE>
</TR>
</TD>
</TABLE>



<!-- end -- >
</TABLE>
</TR>
</TD>
</TABLE>
[h: args2 = strformat("item=Unknown;catagory=%{catagorySelection};")]
<hr>[r: macroLink("+add",'Add Item@Lib:Equipment:Macros','none',args2)]

<br>
</body>
</html>
}]

