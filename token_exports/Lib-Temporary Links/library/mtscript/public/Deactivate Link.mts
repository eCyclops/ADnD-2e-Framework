[h: tempLinkQueuePosition = arg(0)]

[h: temporaryLinkList = getLibProperty("temporaryLinkList")]
[h: tempLinkTimeout = getLibProperty("temporaryLinkTimeout")]

[h: setLibProperty("temporaryLinkList", listDelete(temporaryLinkList, tempLinkQueuePosition, ";"))]
[h: setLibProperty("temporaryLinkTimeout", listDelete(tempLinkTimeout, tempLinkQueuePosition,";"))]