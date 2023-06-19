[h:'<!-- Report the number of temporary links that are being stored -->']
[h: broadcast(
	listCount(getLibProperty("temporaryLinkList"), ";") + " temporary links stored.",
	"self"
)]