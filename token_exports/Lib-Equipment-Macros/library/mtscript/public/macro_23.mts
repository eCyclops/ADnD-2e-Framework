[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: bookName = getStrProp(arg(0),"bookName")]
[h: bookID = getStrProp(arg(0),"bookID")]
[h: tag = "book."]
[h: name = getStrProp(arg(0),"name","Unknown")]

[h: magicType = getStrProp(arg(0),"magicType","Arcane")]
[h: level = getStrProp(arg(0),"level",1)]

[h: bookJSON = getProperty(tag+bookID,myID)]
[h: setProperty(tag+bookID,json.remove(bookJSON,name),myID) ]

[h: outTxt = getName(myID)+strformat(" erased spell %{name} from %{bookName}.<br>")]
[r: showIt(outTxt,myID,"default",0)]

[if(isFrameVisible("Read Book")), code :{
	[macro("PC_Read@Lib:Equipment:Macros"):strformat("myID=%{myID}; bookName=%{bookName}; bookID=%{bookID}; magicType=%{magicType}; viewLevelSpell=%{level};")]
};{}]

