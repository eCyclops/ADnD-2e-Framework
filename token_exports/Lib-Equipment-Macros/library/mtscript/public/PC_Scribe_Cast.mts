[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: bookName = getStrProp(arg(0),"bookName","Unknown")]
[h: bookID = getStrProp(arg(0),"bookID",-1)]
[h: tag = "book."]
[h: name = getStrProp(arg(0),"name","Unknown")]

[h: bookJSON = getProperty(tag+bookID,myID)]
[h: pageJSON = json.get(bookJSON,name)]
[h: level = json.get(pageJSON,"level")]
[h: count = json.get(pageJSON,"count")]
[h: magicType = json.get(pageJSON,"magicType")]

[h: count = count -1 ]

[h: tokenName = getName(myID)]
[h: args = strformat("myID=%{myID}; Name=%{name}; magicType=%{magicType}; Level=%{level}")]

[h, macro("castSpell@Lib:Spells:Macros"): strformat("%{args}; bookName=%{bookName};")]

[h, if(count < 1), code :{
	[macro("deleteScribedSpell@Lib:Equipment:Macros"):arg(0)]
};
{
	[h: args = strformat("myID=%{myID}; bookName=%{bookName}; bookID=%{bookID}; name=%{name}; magicType=%{magicType}; level=%{level}; count=%{count}")]
	[macro("addScribedSpell@Lib:Equipment:Macros"):args]
}]

