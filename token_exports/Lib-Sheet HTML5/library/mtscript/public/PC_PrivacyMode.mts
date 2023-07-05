[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h:status = input(
	"prvMode|"+getProperty("PrivacyMode",myID)+"|Do you want your intiative, attack, save and ability check rolls private?|CHECK"
)]
[H: abort(status)]

[h: setProperty("PrivacyMode",prvMode,myID)]

[s, if(PrivacyMode==1):"Privacy mode enabled.";"Privacy mode disabled."]
