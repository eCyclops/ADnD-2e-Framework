[h: npcJSON = arg(0)]

[h: viewLetter = json.get(npcJSON,"viewLetter")]

[h: importNew = json.contains(npcJSON,"importNew")]
[h: newEntry = json.contains(npcJSON,"newEntry")]
[h, if(newEntry), code :{
	[h: npcJSON = getEmptyNPCJSON()]
};{

}]

[h: description = decode(json.get(npcJSON,"description"))]

[h: attacksTxt = '']
[h: attackList = '']
[h, foreach(entry,npcJSON,""), code :{
	[data = decode(json.get(npcJSON,entry))]
	[h, if(startsWith(entry,"attack.")), code :{
		[attackList = listAppend(attackList,entry)]
		[attacksTxt = concat(attacksTxt,strformat('<input type="hidden" name="%{entry}" value="%{data}">'))]
	};{}]
}]

[h, foreach(atk,attackList,""), code :{
	[h: findString = strformat( "\^(?i).*\\.(.*)(\$)" )]
	[h: id = strfind(atk, findString)]
	[h, if(getFindCount(id)>0): attackNumber = getGroup(id, 1, 1); attackNumber = -1]
	[h: thisJSON = json.get(npcJSON,atk,strformat('attack.%{attackNumber}') )]
	[h: thisProp = json.get(thisJSON,strformat('attack.%{attackNumber}'))]
	[h: thisProp = decode(thisProp)]
	[h: thisProp = replace(thisProp,"&#59",";")]
	[h: thisDmg = getStrProp(thisProp,"damageSmall","1d6")]
	[h: attacksTxt = concat(attacksTxt,strformat('<input type="submit"  size=5 name="EditAttack.%{attackNumber}" value="%{thisDmg}" ></input>'))]
}]

[h,if(importNew || newEntry): 
	deleteInput = '';
	deleteInput = strformat('<table><td><b>Delete?</b></td><td><input type="checkbox" name="delete" value="true"></td></table>')]

[h: descriptionInput = strformat('<textarea style="width:100%" rows="10" cols="100" name="description">%{description}</textarea>')]

[h: altColor1 = '#FFFFFF']
[h: altColor2 = '#EEEEAA']
[frame("EditMonsterFrame",'width=700; height=1200; '): {
<html>
<head>
<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
<meta name="input" content="true">
</head>
<body>



<form method="json" name="editMonsterInput" action="[r:macroLinkText('editFormParse@Lib:MM:Macros',"none")]">
<table  bgcolor=[r: altColor2] align=left border=1 cellpadding=0 width=100%>
	<tr bgcolor=[r: altColor1]><td align=left><table border =0 cellpadding=0 align=LEFT width=100%>
	<tr bgcolor=[r: altColor2]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'name')),"Name",'name')][r: buildHTMLInputLine(decode(json.get(npcJSON,'intelligence')),"Intelligence",'intelligence')]</tr>
	<tr bgcolor=[r: altColor1]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'hitDice')),"Hit Dice",'hitDice')][r: buildHTMLInputLine(decode(json.get(npcJSON,'ac')),"Armor Class",'ac')]</tr>
	<tr bgcolor=[r: altColor2]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'numAppearing')),"No. Appearing",'numAppearing')][r: buildHTMLInputLine(decode(json.get(npcJSON,'treasure')),"Treasure",'treasure')] </tr>
	<tr bgcolor=[r: altColor1]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'thaco')),"THACO",'thaco')][r: buildHTMLInputLine(decode(json.get(npcJSON,'move')),"Movement",'move')]</tr>
	<tr bgcolor=[r: altColor2]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'specialAttacks')),"Special Attacks",'specialAttacks')][r: buildHTMLInputLine(decode(json.get(npcJSON,'specialDefense')),"Special Defenses",'specialDefense')]</tr>
	<tr bgcolor=[r: altColor1]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'magicResistance')),"Magic Resistance",'magicResistance')][r: buildHTMLInputLine(decode(json.get(npcJSON,'size')),"Size",'size'))]</tr>
	<tr bgcolor=[r: altColor2]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'morale')),"Morale",'morale')][r: buildHTMLInputLine(decode(json.get(npcJSON,'xp')),"XP Value",'xp'))]</tr>
	<tr bgcolor=[r: altColor1]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'diet')),"Diet",'diet')][r: buildHTMLInputLine(decode(json.get(npcJSON,'organization')),"Organization",'organization')]</tr>
	<tr bgcolor=[r: altColor2]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'frequency')),"Frequency",'frequency')][r: buildHTMLInputLine(decode(json.get(npcJSON,'alignment')),"Alignment",'alignment')]</tr>
	<tr bgcolor=[r: altColor1]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'climate')),"Climate/Terrain",'climate')][r: buildHTMLInputLine(decode(json.get(npcJSON,'activity')),"Activity Cycle",'activity')]</tr>
	<tr bgcolor=[r: altColor2]>[r: buildHTMLInputLine(decode(json.get(npcJSON,'damage')),"Damage/Attack",'damage')][r: buildHTMLInputLine(decode(json.get(npcJSON,'numAttacks')),"No. of Attacks",'numAttacks')]</tr>
	<tr bgcolor=[r: altColor1]><table border=0 cellpadding=0><th>Atks: </th><td>[r: attacksTxt]<input type="submit"  name="AddAttack" value="+add"></input></td></table></tr>

	</table></td></tr>


	<table border=0 align=left width=100%>
	<tr><td>[r: descriptionInput]</td><td></td></tr>
	</table>

	<table border=0>
	<td><table border=0 width=100%>[r: buildHTMLInputLine(decode(json.get(npcJSON,'source')),"Source",'source',50)]</table></td><td align=right>[r: deleteInput]</td>
	</table>

	<tr><td align=center><input type="submit"  name="Save" value="Save"> </input></td></tr>
</table>
	[r:strformat('<input type="hidden" name="newEntry" value="%{newEntry}">')]
	[r:strformat('<input type="hidden" name="viewLetter" value="%{viewLetter}">')]
</form>

</body>
</html>
}]
