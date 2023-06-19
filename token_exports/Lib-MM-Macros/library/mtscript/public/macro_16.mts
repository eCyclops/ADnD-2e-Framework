[h: npcJSON = arg(0)]

[h: viewLetter = json.get(npcJSON,"viewLetter")]
[h: npcJSON = json.remove(npcJSON,"viewLetter")]

[h: name = decode(json.get(npcJSON,"name"))]
[h: name = lower(name)]

[h: pTag = getLibProperty("PropertyTag","Lib:MM")]
[h: pTag = strformat('%{pTag}.%{name}')]

[h: idxTagDISABLED = strformat('MonsterIDX')]
[h: idxTag_Prefix = getLibProperty('MonsterIDXTag','Lib:MM')]
[h: firstChar = substring(name,0,1)]
[h: idxTag = strformat('%{idxTag_Prefix}.%{firstChar}')]
[h: idxJSON = getLibProperty(idxTag,"Lib:MM")]

[h:status = input(
	"areYouSure| 1 |Are you sure you want to DELETE "+name+"? |CHECK"
)]
[H: abort(status)]
[h: assert(!(areYouSure == 0),"You can slay the beast another day.")]

[h: newListOfMonsters = json.remove(idxJSON,name)]
[h: setLibProperty(idxTag,newListOfMonsters,"Lib:MM")]
[h: setLibProperty(pTag,"","Lib:MM")]

[h: outTxt = strformat("Removed %{name} from the realm.<br>")]
[broadcast(outTxt,"gm")]

[h, if(isFrameVisible("Monster_DB_Management")), code :{
	[h, macro("Manage Main@Lib:MM:Macros"):strformat('viewLetter=%{viewLetter};')]
};{}]
