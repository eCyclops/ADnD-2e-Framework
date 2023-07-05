[h: magicType = getStrProp(arg(0),"magicType")]
[h: name = getStrProp(arg(0),"name")]
[h: level = getStrProp(arg(0),"level")]

[h: tag_prefix = getLibProperty("ItemTag","Lib:Spells")]
[h: spellTag = strformat("%{tag_prefix}.%{magicType}.%{name}")]
[h: propName = add(magicType,level)]

[h: spellJson = getLibProperty(spellTag,"Lib:Spells")]

[h:status = input(
	"areYouSure|0|Are you sure you want to DELETE "+name+" in "+magicType+" training?|CHECK"
)]
[H: abort(status)]
[h: assert(!(areYouSure == 0),"Your erase spell can be used another day.")]

[h: spellIdx = getLibProperty(propName,"Lib:Spells")]
[h: newListOfSpells = json.remove(spellIdx,name)]
[h: setLibProperty(propName,newListOfSpells,"Lib:Spells")]
[h: setLibProperty(spellTag,"","Lib:Spells")]

[h: outTxt = strformat("Erased %{name} from %{magicType} training.<br>")]
[broadcast(outTxt,"gm")]
