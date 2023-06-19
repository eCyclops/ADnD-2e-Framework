[h: theLevel = arg(0)]
[h: theRoll = arg(1)]
[h: ACResult = 999]

<!--Attack Table for Level 1 to 4-->
[h, IF(theLevel >= 1 && theLevel <= 4 && theRoll >= 11), CODE: {
  [IF(theRoll <= 19): ACResult = 21 - theRoll]
  [IF(theRoll == 20): ACResult = -4]
  [IF(theRoll > 20): ACResult = 16 - theRoll]
}]

<!--Attack Table for Level 5 to 8-->
[h, IF(theLevel >= 5 && theLevel <= 8 && theRoll >= 9), CODE: {
  [IF(theRoll <= 19): ACResult = 19 - theRoll]
  [IF(theRoll == 20): ACResult = -6]
  [IF(theRoll > 20): ACResult = 14 - theRoll]
}]

<!--Attack Table for Level 9 to 12-->
[h, IF(theLevel >= 9 && theLevel <= 12 && theRoll >= 6), CODE: {
  [IF(theRoll <= 19): ACResult = 16 - theRoll]
  [IF(theRoll == 20): ACResult = -9]
  [IF(theRoll > 20): ACResult = -10]
}]

<!--Attack Table for Level 13 to 16-->
[h, IF(theLevel >= 13 && theLevel <= 16 && theRoll >= 4), CODE: {
  [IF(theRoll <= 19): ACResult = 14 - theRoll]
  [IF(theRoll >= 20): ACResult = -10]
}]

<!--Attack Table for Level 17 to 20-->
[h, IF(theLevel >= 17 && theLevel <= 20 && theRoll >= 2), CODE: {
  [IF(theRoll <= 19): ACResult = 12 - theRoll]
  [IF(theRoll >= 20): ACResult = -10]
}]

<!--Attack Table for Level 21 or higher-->
[h, IF(theLevel >= 21), CODE: {
  [ACResult = 10 - theRoll]
}]

[r: ACResult]