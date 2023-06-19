[h: tempLinkMacro = arg(0)]
[h: tempLinkText = arg(1)]
[h: tempLinkArgs = arg(2)]
[h, if(argCount() > 3), code: {
	[h: tempLinkUses = getStrProp(arg(3), "uses", 1)]
	[h: tempLinkExpiration = getStrProp(arg(3), "expire", 120)]
	[h: tempLinkOutput = getStrProp(arg(3), "output", "none")]
	[h: tempLinkTarget = getStrProp(arg(3), "target", "impersonated")]
};
{
	[h: tempLinkUses = 1]
	[h: tempLinkExpiration = 120]
	[h: tempLinkOutput = "none"]
	[h: tempLinkTarget = "impersonated"]
}]

[h, if(!isNumber(tempLinkUses) || tempLinkUses == ""): tempLinkUses = 1]
[h, if(!isNumber(tempLinkExpiration) || tempLinkExpiration == ""): tempLinkExpiration = 120]
[h, if(tempLinkUses < 1): tempLinkUses = 1]
[h, if(tempLinkExpiration < 0): tempLinkExpiration = 120]

[h: temporaryLinkID = tempLinkID()]
[h: temporaryLinkList = getLibProperty("temporaryLinkList")]
[h: temporaryLinkList = listAppend(temporaryLinkList, temporaryLinkID, ";")]
[h: setLibProperty("temporaryLinkList", temporaryLinkList)]

[h: tempLinkTimeStamp = json.get(getInfo("server"), "timeInMs")]
[h: temporaryLinkTimeout = getLibProperty("temporaryLinkTimeout")]
[h: temporaryLinkTimeout = listAppend(temporaryLinkTimeout, tempLinkUses + "," + tempLinkExpiration + "," + tempLinkTimeStamp, ";")]
[h: setLibProperty("temporaryLinkTimeout", temporaryLinkTimeout)]

[h: tempLinkFullArgs = json.set("{}", "id", temporaryLinkID, "macro", tempLinkMacro, "args", tempLinkArgs)]

[r: macroLink(tempLinkText, "Execute Link@Lib:Temporary Links", tempLinkOutput, tempLinkFullArgs, tempLinkTarget)]