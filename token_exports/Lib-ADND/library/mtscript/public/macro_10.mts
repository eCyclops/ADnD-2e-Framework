[h:status = input(
	strformat("seperator|<html><b>--- Add Adventure Experience ---</b></html> | | LABEL | SPAN=TRUE"),
	strformat("addName|Additional Quest Reward| Reason for award"),
	strformat("addEXP|0| Amount of Experience for award")
)]
[H: abort(status)]

[h: logEXP = getLibProperty("LOG_EXP","Lib:ADND")]

[h: itemStore = json.set("{}","Name",addName,"EXP",addEXP)]
[h,if(addEXP != '' && addEXP>0): setLibProperty("LOG_EXP", json.append(logEXP,itemStore),"Lib:ADND")]

[h: outTxt = '']
[h,if(addEXP != ''): outTxt = concat(outTxt,strformat("<br><b>The party has earned <i>%{addEXP}</i> experience for <i>%{addName}</i>.</b>"));]

[h: broadcast(outTxt,"gm")]

