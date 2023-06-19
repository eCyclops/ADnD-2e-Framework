[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: multiAttackLink =  macroLink("Multiple Attack",'getMultiWeaponSelectionForm@Lib:ADND','all',strformat("myID=%{myID};"),myID)]
[h: multiAttackToolTip = toolTipIt("Attack with mutiple weapons. Claw/Claw/Bite, Longsword/Shortsword, Dagger/Dagger all in one sequence.",multiAttackLink)]

[r, frame("PC_Attack"): {
<html>
<head>
<title>Weapons and Attacks</title>
<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
</head>
<BODY BGCOLOR="#FFD700">
<TABLE BORDER="1" CELLPADDING="1" WIDTH="100%"  BORDERCOLOR="#000000" BORDERCOLORLIGHT="#000000" BORDERCOLORDARK="#000000">
	<caption>[r: getName(myID)]</caption>
<TR>
<TD BGCOLOR="#F0F0F0">
<TABLE>
	<caption>Attacks</caption>
	[getActiveWeaponsWindow( strformat('myID=%{myID};') )]
</TABLE>
	[r: multiAttackToolTip]
</TD>
</TR>
</TABLE>

</body>
</html>
}]