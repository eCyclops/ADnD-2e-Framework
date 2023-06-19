[h: currrentSelections = getSelected()]
[h: deselectTokens()]

[h:status = input(
	"seperator|<html><b>--- Adjust Health ---</b></html>||LABEL|SPAN=TRUE",
	"healthAdjustment| 0 | Enter adjustment"
)]
[H: abort(status)]

[foreach(id, currrentSelections, ''), code :
{
	[h: switchToken(id)]
	[r, macro('HP_Adjust@Lib:ADND'):strformat("myID=%{id};healthAdjustment=%{healthAdjustment}")]
}]


[h: selectTokens(currrentSelections,0,",")]
