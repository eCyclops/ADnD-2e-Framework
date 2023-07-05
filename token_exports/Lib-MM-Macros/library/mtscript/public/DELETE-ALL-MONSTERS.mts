[h:status = input(
	"areYouSure| 0 | DELETE ALL MONSTERS? |CHECK"
)]
[H: abort(status)]
[h: assert(!(areYouSure == 0),"Whew! Did not delete all creatures.",0)]

[h: list = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z']

[h: idxTag_Prefix = getLibProperty('MonsterIDXTag','Lib:MM')]

[foreach(letter,list,"<br>"), code :{
	[h:idxTag = strformat('%{idxTag_Prefix}.%{letter}')]
	[h: setLibProperty(idxTag,"{}","Lib:MM")]
}]
