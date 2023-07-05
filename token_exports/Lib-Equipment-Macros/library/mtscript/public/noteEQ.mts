[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]
[h: noteType = getStrProp(arg(0),"noteType")]

[h: item = getStrProp(arg(0),"item")]
[h: currentDB = getProperty("Equipment_List",myID)]

[h, if(!json.isEmpty(currentDB) && json.type(currentDB) == "OBJECT"):testObj = json.get(currentDB,item);testObj = '']

[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"), code :{
  [h, if(noteType == "gm"): itemNotes = json.get(testObj,"itemNotesGM"); itemNotes = json.get(testObj,"itemNotes")]
};{
	[h: assert(0,strformat('%{item} does not seem to exist in your inventory.'))]
}]
	
<!-- textarea box -->
[h: decodedNotes = decode(itemNotes)]
[h: notesInput = strformat('<textarea rows="20" cols="80" name="itemNotes">%{decodedNotes}</textarea>')]

[h: formMacroText = macroLinkText("notesFormParse@Lib:Equipment:Macros","none")]

[h: outTxt = '<html><head>']
[h: outTxt = concat(outTxt,strformat('<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>'))]
[h: outTxt = concat(outTxt,strformat('<meta name="input" content="true"></head><body>'))]
[h: outTxt = concat(outTxt,strformat('<form method="json" name="notesObjectInput" action="%{formMacroText}">'))]
[h: outTxt = concat(outTxt,strformat('<table align=left border=0 cellpadding=1><caption><b>%{item} Notes</b></caption>'))]

<!-- note -->
[h: outTxt = concat(outTxt,'<tr align=center><td>'+notesInput+'</td></tr>')]
[h: hiddenInput = strformat(
	'<input type="hidden" name="myID" value="%{myID}">'+
	'<input type="hidden" name="item" value="%{item}">'+
	'<input type="hidden" name="noteType" value="%{noteType}">'
)]

<!-- form finish -->
[h: outTxt = concat(outTxt,hiddenInput)]

[h: outTxt = concat(outTxt,strformat('<tr align=center><td>'+'<table border=0><tr>'+
		'<td align=right>'+	'<input type="submit"  name="Save" value="Submit"> </input>'+	'</td></tr></table>'+	'</td></tr>'))]
[h: outTxt = concat(outTxt,strformat('</body>'))]

[frame("Notes Object Frame",'width=600; height=400; '): {
	[r: outTxt]
}]
