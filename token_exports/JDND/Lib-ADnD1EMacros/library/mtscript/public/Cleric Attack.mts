[h: theLevel = number(arg(0))]
[h: theRoll = number(arg(1))]
[h: ACResult = 999]

[h, if(theLevel > 19): theLevel = 19]

[h, if(theRoll < 20): ACResult = 22 - theRoll - ceil(theLevel/3)*2]
[h, if(theRoll == 20): ACResult = -3 - ceil(theLevel/3)*2]
[h, if(theRoll > 20): ACResult = 17 - theRoll - ceil(theLevel/3)*2]

[r: ACResult]