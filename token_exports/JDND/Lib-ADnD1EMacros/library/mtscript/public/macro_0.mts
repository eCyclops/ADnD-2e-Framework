[h: theLevel = number(arg(0))]
[h: theRoll = number(arg(1))]
[h: ACResult = 999]

<!--Attack Table for Level 1 to 3-->
[h, IF(theLevel >= 1 && theLevel <= 3 && theRoll >= 10), CODE: {
  [IF(theRoll <= 19): ACResult = 20 - theRoll]
  [IF(theRoll == 20): ACResult = -5]
  [IF(theRoll > 20): ACResult = 15 - theRoll]
}]

<!--Attack Table for Level 4 to 6-->
[h, IF(theLevel >= 4 && theLevel <= 6 && theRoll >= 8), CODE: {
  [IF(theRoll <= 19): ACResult = 18 - theRoll]
  [IF(theRoll == 20): ACResult = -7]
  [IF(theRoll > 20): ACResult = 13 - theRoll]
}]

<!--Attack Table for Level 7 to 9-->
[h, IF(theLevel >= 7 && theLevel <= 9 && theRoll >= 6), CODE: {
  [IF(theRoll <= 19): ACResult = 16 - theRoll]
  [IF(theRoll == 20): ACResult = -9]
  [IF(theRoll > 20): ACResult = -10]
}]

<!--Attack Table for Level 10 to 12-->
[h, IF(theLevel >= 10 && theLevel <= 12 && theRoll >= 4), CODE: {
  [IF(theRoll <= 19): ACResult = 14 - theRoll]
  [IF(theRoll >= 20): ACResult = -10]
}]

<!--Attack Table for Level 13 to 15-->
[h, IF(theLevel >= 13 && theLevel <= 15 && theRoll >= 2), CODE: {
  [IF(theRoll <= 19): ACResult = 12 - theRoll]
  [IF(theRoll >= 20): ACResult = -10]
}]

<!--Attack Table for Level 16 to 18-->
[h, IF(theLevel >= 16 && theLevel <= 18), CODE: {
  [ACResult = 10 - theRoll]
}]

<!--Attack Table for Level 19 or higher-->
[h, IF(theLevel >= 19), CODE: {
  [ACResult = 9 - theRoll]
}]

[r: ACResult]