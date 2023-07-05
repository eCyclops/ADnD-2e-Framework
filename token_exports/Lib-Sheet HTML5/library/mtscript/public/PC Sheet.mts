[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: page = getStrProp(macro.args, "Page","General")]
[h: args = strformat("myID=%{myID};Page=%{page};")]

[h: frameSize = 'width=400; height=500; ']
[h: myName = getName(myID)]
[h: titleTxt = strformat("%{myName}'s Character Sheet")]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[frame5(pcSheetFrame,frameSize): {
  <html>
    <head>
      <title>[r: titleTxt]</title>
      <link rel="stylesheet" type="text/css" href="PC Sheet CSS@Lib:Sheet">
    </head>
    <body>
        [macro("Mod:PC:Header@this"): args]
      <div id="content">
        [macro("PC:"+page+"@this"): args]
      </div>
      <footer>[macro("Mod:Dice@this"): args]</footer>
    </body>
  </html>
}]