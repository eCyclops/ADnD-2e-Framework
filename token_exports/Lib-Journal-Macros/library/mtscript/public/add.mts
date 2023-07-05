[h: name = getStrProp(arg(0),"name")]
[h: description = getStrProp(arg(0),"description")]
[h: visible = getStrProp(arg(0),"visible",0)]

[h: assert(!(name =='' || description == ''),"Need name and description.",1)]

[h: journalTag = getLibProperty("JournalsTagVar","Lib:Journal")]
[h: tag = strformat('%{journalTag}.%{name}')]

[h: storeThis = strformat('name=%{name}; visible=%{visible}; description=%{description}; ')]

[h: setLibProperty(tag,storeThis,"Lib:Journal")]

[h: jName = decode(name)]
[h: outTxt = strformat("Added new journal entry under %{jName}.<br>")]
[broadcast(outTxt,"gm")]

[h, if(isFrameVisible("Journal Management")), code :{
	[macro("Manage Main@Lib:Journal:Macros"):strformat('')]
};{}]
