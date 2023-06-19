[h: tempLinkMacro = json.get(arg(0), "macro")]
[h: temporaryLinkID = json.get(arg(0), "id")]
[h: tempLinkArgs = json.get(arg(0), "args")]

[h: temporaryLinkList = getLibProperty("temporaryLinkList")]

[h: tempLinkQueuePosition = listFind(temporaryLinkList, temporaryLinkID, ";")]
[h: assert(tempLinkQueuePosition != -1, "This link has expired.", 0)]

[h: tempLinkTimeoutList = getLibProperty("temporaryLinkTimeout")]
[h: tempLinkTimeout = listGet(tempLinkTimeoutList, tempLinkQueuePosition, ";")]
[h: tempLinkMS = listGet(tempLinkTimeout, 1) * 1000]
[h: tempLinkExpireTime = number(listGet(tempLinkTimeout, 2)) + tempLinkMS]
[h: tempLinkCurrentTime = json.get(getInfo("server"), "timeInMs")]

[h, if(tempLinkCurrentTime > tempLinkExpireTime), code: {
	[h, macro("Deactivate Link@Lib:Temporary Links"): tempLinkQueuePosition]
	[h: assert(0, "This link has expired.", 0)]
};{}]

[h: tempLinkUses = listGet(tempLinkTimeout, 0) - 1]
[h, if(tempLinkUses == 0), code: {
	[h, macro("Deactivate Link@Lib:Temporary Links"): tempLinkQueuePosition]
};
{
	[h: tempLinkTimeout = listReplace(tempLinkTimeout, 0, tempLinkUses)]
	[h: tempLinkTimeoutList = listReplace(tempLinkTimeoutList, tempLinkQueuePosition, tempLinkTimeout, ";")]
	[h: setLibProperty("temporaryLinkTimeout", tempLinkTimeoutList)]
}]

[macro(tempLinkMacro): tempLinkArgs]