[h: spellName = getStrProp(arg(0),"Name")]
[h: magicType = getStrProp(arg(0),"magicType")]

[h: spellJSON = getSpellJSON(magicType,spellName)]

[h: level = decode(json.get(spellJSON,"level"))]
[h: school = decode(json.get(spellJSON,"school"))]
[h: range = decode(json.get(spellJSON,"range"))]
[h: duration = decode(json.get(spellJSON,"duration"))]
[h: aoe = decode(json.get(spellJSON,"aoe"))]
[h: casttime = decode(json.get(spellJSON,"casttime"))]
[h: save = decode(json.get(spellJSON,"save"))]
[h: verbal = json.get(spellJSON,"verbal")]
[h: somatic = json.get(spellJSON,"somatic")]
[h: material = json.get(spellJSON,"material")]
[h: reversible = json.get(spellJSON,"reversible")]
[h: sphere = json.get(spellJSON,"sphere")]
[h: description = json.get(spellJSON,"description")]

[h: description = replace(description,'%0A','<br>')]
[h: description = replace(description,'%22',"'")]
[h: description = decode(description)]

[h: frameName = "Spell Details"]
[frame(frameName): {
<html>
<body style="background-color: white;">
<head>
<title>Level [r:level]<br></title>
</head>
<strong><span style="color: red;">[r:spellName]</span></strong><span style="color: red;">[r, if(reversible==1):"(reversible)"]<br>
(<em>school: [r: school]</em>)<br>[r,if(magicType == 'Divine'):strformat('(<em>sphere: %{sphere}<em>)<br>')]</span>
<table
style="text-align: left; width: 100%; height: 100%; background-color: white;"
border="0" cellpadding="1" cellspacing="1">
<tbody>
<tr>
<td style="vertical-align: top;"><b>Range:</b> [r: range]</td>
<td style="vertical-align: top;"><b>Components</b>: [r,if(verbal ==1):"V "][r,if(somatic ==1):"S "][r,if(material ==1):"M "]<br>
</td>
</tr>
<tr>
<td style="vertical-align: top;"><b>Duration:</b> [r: duration]<br>
</td>
<td style="vertical-align: top;"><b>Casting Time:</b> [r: casttime]<br>
</td>
</tr>
<tr>
<td style="vertical-align: top;"><b>Area of Effect:</b> [r: aoe]<br>
</td>
<td style="vertical-align: top;"><b>Saving Throw:</b> [r:save]<br>
</td>
</tr>
</tbody>
</table>
<br>
<table style="text-align: left; width: 100%; height: 100%;" border="0"
cellpadding="0" cellspacing="0">
<tbody>
<tr>
<td style="vertical-align: top;">[r:description]<br>
</td>
</tr>
</tbody>
</table>
<br>
</body>
</html>
}]
