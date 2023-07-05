[h:version = getLibProperty("Version","Lib:ADND")]

AD&D Framework v[r:version] loaded. 
[r, if(isGM()): "Greetings my master!" ; "Welcome to the server player!"]<br>
[r: macroLink("View Changelog","View Changelog@Lib:ADND","none")]

[h: mapDM = getLibProperty("defaultMapDM", "Lib:ADND")]
[h: mapPC = getLibProperty("defaultMapPC", "Lib:ADND")]
[if(isGM()), code :{
	[h: setCurrentMap(mapDM)]
};{
	[h: setCurrentMap(mapPC)]
}]

[h: gotoLink = 'Teleport_Start']
[h: execLink(goto(gotoLink),1)]
[h: execLink(goto(gotoLink),1)]
[h: execLink(goto(gotoLink),1)]
[h: execLink(goto(gotoLink),1)]