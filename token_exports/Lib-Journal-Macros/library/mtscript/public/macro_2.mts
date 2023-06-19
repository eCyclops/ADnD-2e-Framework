[h: name = getStrProp(arg(0),"name")]

[h: journalTag = getLibProperty("JournalsTagVar","Lib:Journal")]
[h: tag = strformat('%{journalTag}.%{name}')]
[h: setLibProperty(tag,'',"Lib:Journal")]

[h: jName = decode(name)]
[h: outTxt = strformat("Deleted journal entry under %{jName}.<br>")]
[broadcast(outTxt,"gm")]

[h, if(isFrameVisible("Journal Management")), code :{
	[macro("Manage Main@Lib:Journal:Macros"):strformat('')]
};{}]
