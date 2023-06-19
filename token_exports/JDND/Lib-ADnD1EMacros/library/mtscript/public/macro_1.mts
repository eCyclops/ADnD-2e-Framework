[h: theLevel = arg(0)]
[h: theRoll = arg(1)]
[h: ACResult = 999]

<!--Attack Table for Level 0-->
[h, IF(theLevel == 0 && theRoll >= 11), CODE: {
  [IF(theRoll <= 19): ACResult = 21 - theRoll]
  [IF(theRoll == 20): ACResult = -4]
  [IF(theRoll > 20): ACResult = 16 - theRoll]
}]

[h, if(theLevel > 17): theLevel = 17]

<!--Attack Table for Level 1 to 2-->
[h, if(theLevel > 0), code: {
	[if(theRoll <= 19): ACResult = 21-theRoll-theLevel]
	[if(theRoll == 20): ACResult = -4-theLevel]
	[if(theRoll > 20): ACResult = 16-theRoll-theLevel]
}]

[h, if(ACResult < -10): ACResult = -10]

[r: ACResult]