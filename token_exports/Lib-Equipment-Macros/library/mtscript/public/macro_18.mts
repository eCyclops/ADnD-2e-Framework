[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: bookID = 0]
[h: tag = "book.")]
[h: propJSON = getProperty(tag+bookID,myID)]

[while( !json.isEmpty(propJSON) && json.type(propJSON) == "OBJECT" ), code :{
	[h: bookID = bookID +1]
	[h: propJSON = getProperty(tag+bookID,myID)]
}]

[macro.return = 
	'bookID='+bookID+';'+
	'myID='+myID+';'+
]
