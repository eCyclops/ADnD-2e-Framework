[h: inputNum = arg(0)]
[h: inputNum = replace(inputNum, "[^0123456789+/*\\-\\(\\)\\.\\^]", "")]
[h: inputNum = replace(inputNum, "([^0-9])(?=[^0-9])", "")]
[h: checkOperators = strfind(inputNum,"[^0123456789\\.]")]
[h, if(getFindCount(checkOperators) > 0): inputNum = eval(inputNum)]
[h, if(inputNum == ""): inputNum = 0]
[h: macro.return = inputNum]