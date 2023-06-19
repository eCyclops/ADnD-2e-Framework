[h: myID = getStrProp(arg(0),"myID")]

[h: catagory = getStrProp(arg(0),"catagory","Goods")]

[h: catList = getLibProperty("Catagories","Lib:Equipment")]
[h: catIndex = listFind(catList,catagory)]

[h: status=input(
	"catagory|"+catList+"|Select type to add|RADIO|SELECT="+catIndex+" VALUE=STRING"
)]
[h:abort(status)]

[h: args = strformat("myID=%{myID}; item=Unknown;catagory=%{catagory};")]
[macro("edit@Lib:Equipment:Macros"):args]

[if(myID!=''), code :{
	[g: getName(myID)+" has updated items in the Equipment library."]
};{}]
