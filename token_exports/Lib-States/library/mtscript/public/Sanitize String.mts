[h: '<!-- Remove any character that is not a letter, number, whitespace, dash, underscore, or common mathematical operator -->']
[h: inputString = arg(0)]
[r: replace(inputString, "[^\\w\\s\\-_\\/*+.]", "")]

[h: '<!--
Allowed characters:
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789
.+-/*_
and whitespace
-->']