[h: 'gets the system time and returns it as text for log entries and/or timestamp']

[h: sysInfoJSON = getInfo("server")]

[h: curTimeStamp = json.get(sysInfoJSON,"timeDate")]

[h: macro.return = curTimeStamp]
