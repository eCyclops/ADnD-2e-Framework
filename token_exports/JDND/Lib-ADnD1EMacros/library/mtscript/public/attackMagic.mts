[h: theLevel = arg(0)]
[h: theRoll = arg(1)]
[h: ACResult = 999]

<!--Attack Table for Level 1 to 5-->
[h, IF(theLevel >= 1 && theLevel <= 5 && theRoll >= 11), CODE: {
  [IF(theRoll <= 19): ACResult = 21 - theRoll]
  [IF(theRoll == 20): ACResult = -4]
  [IF(theRoll > 20): ACResult = 16 - theRoll]
}]

<!--Attack Table for Level 6 to 10-->
[h, IF(theLevel >= 6 && theLevel <= 10 && theRoll >= 9), CODE: {
  [IF(theRoll <= 19): ACResult = 19 - theRoll]
  [IF(theRoll == 20): ACResult = -6]
  [IF(theRoll > 20): ACResult = 14 - theRoll]
}]

<!--Attack Table for Level 11 to 15-->
[h, IF(theLevel >= 11 && theLevel <= 15 && theRoll >= 6), CODE: {
  [IF(theRoll <= 19): ACResult = 16 - theRoll]
  [IF(theRoll == 20): ACResult = -9]
  [IF(theRoll > 20): ACResult = -10]
}]

<!--Attack Table for Level 16 to 20-->
[h, IF(theLevel >= 16 && theLevel <= 20 && theRoll >= 3), CODE: {
  [IF(theRoll <= 19): ACResult = 13 - theRoll]
  [IF(theRoll >= 20): ACResult = -10]
}]

<!--Attack Table for Level 21 or higher-->
[h, IF(theLevel >= 21), CODE: {
  [IF(theRoll <= 19): ACResult = 11 - theRoll]
  [IF(theRoll >= 20): ACResult = -10]
}]

[r: ACResult]