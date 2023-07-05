[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: page = getStrProp(arg(0), "Page","General")]
[h: args = strformat("myID=%{myID};Page=%{page};")]

[h: frameSize = 'width=400; height=500; ']
[h: myName = getName(myID)]
[h: titleTxt = strformat("%{myName}'s Character Sheet")]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[frame(pcSheetFrame,frameSize): {
  <html>
    <head>
      <title>[r: titleTxt]</title>
      <link rel="stylesheet" type="text/css" href="CharSheet_css@Lib:ADnD_Sheet">
    </head>
    <body>
      [macro("CharSheetHeader@this"): args]
      <br>
      [macro("CharSheet"+page+"@this"): args]
      <br>
      [macro("CharSheet_Dice_Links@this"): args]
    </body>
  </html>
}]