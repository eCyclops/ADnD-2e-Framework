[h: name = encode(json.get(arg(0),"name"))]
[h: description = encode(json.get(arg(0),"description"))]
[h: deleteEntry = json.get(arg(0),"deleteEntry")]
[h, if(deleteEntry != ''): delete=1;delete=0]
[h: playerVisible = json.get(arg(0),"playerVisible")]
[h, if(playerVisible != ''): visible=1;visible=0]

[h: closeFrame("Add/Edit Journal Entry")]

[if(!delete), code :{
	[macro("add@Lib:Journal:Macros"):strformat('name=%{name}; visible=%{visible}; description=%{description}; '))]
};{
	[macro("delete@Lib:Journal:Macros"):strformat('name=%{name}; description=%{description};'))]
}]


