[h: '<!-- ask Are you sure? return true/false-->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(QuestionText). "+getMacroName()+"@"+getMacroLocation())]
[h: 'example: askYN("Delete sword - long from equipmentlist?")']

[h: answeredYes = 0]
[h: questionText = arg(0)]
[h, if (numArgs == 2): answeredYes = arg(1)]


[h: status=input(
	"seperator|<html><b>--- Are you sure ? ---</b></html>||LABEL|SPAN=TRUE",
	"answeredYes | "+answeredYes+" |"+questionText+"|CHECK"
)]
[h:abort(status)]

[h: macro.return = answeredYes]
