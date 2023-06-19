[h: theLevel = number(arg(0))]
[h: theRoll = number(arg(1))]
[h: ACResult = 999]

[h, if(theLevel > 21): theLevel = 21]

[h, if(theRoll < 20): ACResult = 23 - theRoll - ceil(theLevel/5)*2]
[h, if(theRoll == 20): ACResult = -3 - ceil(theLevel/5)*2]
[h, if(theRoll > 20): ACResult = 17 - theRoll - ceil(theLevel/5)*2]

[r: ACResult]