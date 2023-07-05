[h: assert(argCount() == 1,"Please specify the number of pieces of jewelry.",0)]
[h: num = arg(0)]
[h: totalValue = 0]
[h: totalCount = 0]
[h, while(num >= 1), code: {
	[num = num -1],
	[jewels()],
	[totalValue = totalValue + macro.return],
	[totalCount = totalCount + 1]
} ]
<br>
I counted [r: totalCount] pieces of jewelry, for a total value of [r: totalValue]