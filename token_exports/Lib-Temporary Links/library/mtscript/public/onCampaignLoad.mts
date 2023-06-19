[defineFunction("temporaryLink", "Build Link@Lib:Temporary Links")]
[defineFunction("tempLink", "Build Link@Lib:Temporary Links")]
[defineFunction("tempLinkID", "Generate Unique ID@Lib:Temporary Links")]

<!-- this is run this way to avoid writing to the Lib during bootup -->
[h: link = macroLinkText("Clear on Load@Lib:Temporary Links","self")]
[h: execLink(link,1)]