[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: journalType = getStrProp(arg(0),"journalType","Campaign")]

[h: thisFrameName = "Journal Entry"]
[h: formLink = macroLinkText('closeFormWindow@Lib:ADND',"none")]
[h: formText = strformat('<form method="json" name="simpleDialogFrame" action="%{formLink}">')]
[h: doneSubmitText = strformat('<input type="hidden" name="frameName" value="%{thisFrameName}"><input type="submit"  name="Done" value="Done"> </input></form>')]

[h: name = decode(getStrProp(arg(0),"name",""))]
[h: description = getStrProp(arg(0),"description","")]
[h: descUpdated = markdownFormat(decode(replace(description,'%0A','<br>')))]

[h: args = strformat('myID=%{myID}; name=%{name}; description=%{description};')]
[h: editLink =  macroLink("edit","editJournal@Lib:Journal:Macros","none",args,myID)]
[h: editJournalTip = toolTipIt("Click to edit entry.",editLink)]

[dialog(thisFrameName, "input=0"): {
  <html>
    <head>
      <title>Journal Entry</title>
      <link rel='stylesheet' type='text/css' href='Journal CSS@Lib:Journal:Macros'>
    </head>
    <body>
      <h1 align=center>[r: name][if(journalType != "Campaign"), code: { <font size=3> [r: editJournalTip]</font> };{}]</h1>
      <hr>
      [r: markdownFormat(decode(description))]
    </body>
  </html>
}]