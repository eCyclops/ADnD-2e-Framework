[h: lifeTimeRounds = getLibProperty("lifeTimeRounds","Lib:ADND")]

[h: timeLeft = lifeTimeRounds]
[h,if (timeLeft >= 1440), code:{
	[h: days = floor(divide(timeLeft,1440))]
	[h: timeLeft = timeLeft-(days*1440)]
};{
	[h: days = 0]
}]

[h,if (timeLeft >= 60), code:{
	[h: hours = floor(divide(timeLeft,60))]
	[h: timeLeft = timeLeft-(hours*60)]
};{
	[h: hours = 0]
}]

[h,if (timeLeft >= 10), code:{
	[h: turns = floor(divide(timeLeft,10))]
	[h: timeLeft = timeLeft-(turns*10)]
};{
	[h: turns = 0]
}]

[h,if (timeLeft >= 1), code:{
	[h: rounds = timeLeft]
};{
	[h: rounds = 0]
}]

[h: macro.return = strformat('days=%{days}; hours=%{hours}; turns=%{turns}; rounds=%{rounds};')]