[h: assert(argCount() == 1,"Please specify the number of gems.",0)]
[h: num = arg(0)]
[h: totalValue = 0]
[h: totalCount = 0]
[h, while(num >= 1), code: {
	[num = num -1],
	[gems()],
	[totalValue = totalValue + macro.return],
	[totalCount = totalCount + 1]
} ]
<br>
I counted [r: totalCount] gems, for a total value of [r: totalValue]