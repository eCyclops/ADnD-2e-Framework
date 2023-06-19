[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[H, token(myID): myBooks = getMatchingProperties("book\\..*")]

[h: myScribedList = '']
[h, foreach(book,myBooks,""), code :{
	[h: bookJSON = getProperty(book,myID)]
	[foreach(spell,bookJSON,""), code :{
		[h, if(spell != 'hidden-book-notes'): myScribedList = listAppend(myScribedList,spell)]	
	}]
}]

[h: macro.return = myScribedList]
