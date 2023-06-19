[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[frame("Open Bags"): {
<html>
<head>
<title>Equipment</title>
<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
</head>

<BODY BGCOLOR="#FFD700">
    <TABLE BORDER="0" CELLPADDING="1" WIDTH="100%"  BORDERCOLOR="#000000" BORDERCOLORLIGHT="#000000" BORDERCOLORDARK="#000000">
<TR>
<TD BGCOLOR="#FFD700">
<BR>     
<TABLE WIDTH="100%">

<body>

	[r: listItemsEQ(strformat("myID=%{myID};"))]

<hr>

<!-- end -- >
</TABLE>
</TR>
</TD>
</TABLE>
</body>
</html>
}]

