[h: "<!--
--   Multi-token Property Editor
--   Version: 3.0
--   Created: 2022 03 28
--   Updated: 2022 03 31
--   Author: Reverend/Bubblobill
--   License: I can haz all commercial rights and you can't haz none.
-->"]
[h: "<!-- dialogue settings -->"]
[h: dialogName = getMacroName()][h: useOnChangeSelection = true]
[h: maxHeight = 800][h: maxWidth = 1400][h: scrollreset = 1 ][h: rowSize = 25]
[h: closebutton = 1 ][h: input = 1 ][h: noframe = 0 ][h: title = dialogName ]
[h: temporary = 1 ][h: value = 'data' ]

[h: "<!-- initialise utility variabless -->"]
[h: args = macro.args]
[h: this = replace(getMacroLocation(), "Token:", "")]
[h: here = getTokenMap(this)]

[h: "<!-- deal with passed arguments or get selected tokens -->"]
[h: v_processids = ""]
[h, if(json.isEmpty(args)), code:{
    [v_tokenids = getSelected("json")]
    [if(json.isEmpty(v_tokenids)): v_tokenids = json.fromList(currentToken())]
    [if(json.isEmpty(v_tokenids)): v_tokenids = json.fromList(findToken(this, here))]
    [process = false]
};{
    [if(json.type(args)=="OBJECT"):
    	process = json.contains(json.fields(args, "json"), "properties"); 
    	process = false]
    [assert( or(process, json.type(args)=="ARRAY"),  
    	getMacroName()+" was expecting an array of token ids.", 0)]
    [if(process):
    	v_vars_ = json.toVars(args, "v_");
	    v_tokenids = args]
}]
[h: assert(!json.isEmpty(v_tokenids), getMacroName()+" has nothing to work with.<br>No tokens selected or ids received.", 0)]
[h: "<!-- deal with passed arguments finish -->"]

[h: "<!-- --- process updates --- -->"]
[h: message_ = strformat('%d token%s updated.', json.length(v_processids), if(json.length(v_processids)>1, "s", "") )]
[h: names = "[]"]
[h, for(colidx_, 0, json.length(v_processids)), if(process), code:{
	[tokenid_ = json.get(v_processids, colidx_)]
	[tMap_ = getTokenMap(tokenid_)]
	[names = json.append(names, getName(tokenid_, tMap_))]
	[for(rowidx_, 0, json.length(v_properties)), code:{
		[prop_ = json.get(v_properties, rowidx_)]
		[value_ = json.get(json.get(v_values, rowidx_), colidx_)]
		[if(value_==""): resetProperty(prop_, tokenid_, tMap_)]
		[if(value_=="" && getProperty(prop_, tokenid_, tMap_)!=""): setProperty(prop_, "", tokenid_, tMap_)]
		[if(value_!=""):setProperty(prop_, value_, tokenid_, tMap_)]
	}]
}]

[h,if(process): broadcast(strformat('%{message_}<ol><li>%s</ol>', json.toList(names, "<li>")), "gm")]
[h: "<!-- - process updates end - -->"]

[h: "<!-- -- build datastore start -- -->"]
[h: dataraw = "{}"][h: v_allprops="[]"]
[h, foreach(tId, v_tokenids), code:{
    [tData = "{}"][v_libProps = "{}"][v_props="{}"][v_hasProps = "[]"]
    [tMap  = getTokenMap(tId)]
    [tData = json.set(tData, "map", tMap)]
    [tName = getName(tId, tMap)]
    [tData = json.set(tData, "name", tName)]
    [tData = json.set(tData, "image", getTokenImage(50, tId, tMap))]
    [tData = json.set(tData, "type", getPropertyType(tId, tMap))]
    [v_isLib = startsWith(lower(tName), "lib:")]
    [tData = json.set(tData, "libFlag", v_isLib)]
    [if(v_isLib): v_hasProps = getLibPropertyNames(tName, "json")]
    [if(v_isLib): v_allprops = json.union(v_allprops, v_hasProps)]
    [foreach(v_prop, v_hasProps), if(v_isLib): v_libProps = json.set(v_libProps, v_prop, getLibProperty(v_prop, tName))]
    [tData = json.set(tData, "libProps", v_libProps)]
    [v_hasProps = getPropertyNamesRaw("json", tId, tMap)]
    [v_allprops = json.union(v_allprops, v_hasProps)]
    [v_hasProps = json.difference(v_hasProps, json.fields(v_libProps, "json"))]
	[foreach(v_prop, v_hasProps): v_props = json.set(v_props, v_prop, getProperty(v_prop, tId, tMap))]
    [tData = json.set(tData, "props", v_props)]
    [dataraw = json.set(dataraw, tId, tData)]
}]
[h: "<!-- --  build datastore finish -- -->"]

[h: "<!-- ---build CSS --- -->"]

[h: css='
* {box-sizing: border-box; margin: 0; padding: 0;}
html, body { background: maroon; margin: 0; }
.aestheticscreen {
    background: maroon;
    left: -50vw;
    position: absolute;    
    width: 200vw;
    z-index: 0;
}
.bottom {  top:36px; height: 12px; }
.top {bottom:-30px; height: 100px; }
.areabutton {
	background: #d9d9d9;
	border: 1px solid #777;
	border-radius: 50%;
	cursor: pointer;
	font-size: 14px;
	height: 20px;
	line-height: 18px;
	margin: 4px;
	padding: 0;
	position: relative;
	text-align: center;
	width: 18px;
}
.areabutton:focus { outline: none;  background: #silver; border-color: yellow; box-shadow: inset 0 0 3px 3px white;}
.areabutton:hover  { outline: none; background: #silver; border-color: white; box-shadow: inset 0 0 3px 2px white;}
.areabutton.show {}
.areabutton.hide {
	position: absolute;
	right: 2px;
	top: 2px;
}
.areacontainer {
	background: #8c8c8c;
	border-radius: 6px;
	display: none;
	padding: 26px 2px 3px;
	position: absolute;
	right: 0;
	top: 0;
	z-index: 1;
}
.areavalue {
	background: white;
	border-radius: 4px;
	font-size: 12pt;
	padding: 4px;
	padding-top: 4px;
	white-space: pre-wrap;
}

.arrowcell {text-align:right; padding-right:8px;}
.buttoncell { padding: 0; }
.buttonrow {
	background: #660000;	
	height: 32px;
	z-index:2;
}

.empty { background: transparent; background-image:none;}

.headingrow   { background: goldenrod; color: navy; text-align:center; }
.headingcell  { padding: 3px; ;}

#help { 
	background: #f2f2f2;
	border: 6px double silver;
	border-radius: 32px;
	color: #666666;
	display: none;
	height: 650px;
	left: 20px;
    padding: 20px;
	position: absolute;
	top: 0;
	width: 600px;
	z-index: 2;
}
#help h1 { margin:0; padding:0; }
#help h2 { margin: 0.4em 0 0.2em 0; padding: 0; }
#help ul { list-style: none inside; }
#help .helpclosemessage {
    bottom: 12px;
    background: transparent;   
    left:50%;
    position: absolute;
    text-align: center;
    transform: translateX(-50%);
}
.image    { 
	box-shadow: 0 0 0 0 silver,
				0 0 6px 5px white, 
				0 0 12px 2px grey; 
	border-radius:3px;  
	max-height: 74px; 
	margin:6px; 
}
.imagerow { text-align:center; height: 35px;}
.imagecell{ 
	background: white; 
	border-radius:23px 23px 0 0; 
	padding:auto;  
	max-height: 90px;
}

input[type="text"] {	
	background:#fcfcfc;
	border: 1px solid silver;
	border-radius: 2px;
	box-shadow: inset 4px 4px 9px 0 silver;
	line-height: 23px;
	padding-left: 4px;
	margin-left: 8px;
	max-width: 100px;
	overflow: hidden;
	width: 70%;
}
input[type="text"]:focus { box-shadow: inset 0 0 9px 0 white}
input[type="textarea"] {
	display: none;
	height: 0;
	width: 0;
}

.key {
	background: white;
	border: 1px solid silver;
	border-radius: 8px;
	cursor: context-menu;
	line-height: 40px;
	padding: 8px 8px;
}
.namerow  { text-align:center; }
.namecell {
    background: white;
	max-width: 100px;
	padding: 4px;
	width: 100px;
	word-break: break-all;
}

.typerow  { text-align:center; background: silver; }
.typecell { padding: 2px 3px; }

.libproperty { box-shadow: inset 0 0 23px 3px rgba(255, 255, 0, 0.5);}

tr.oddrow {
	background-image: linear-gradient(to bottom,
		rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 6%,  rgba(0, 0, 0, 0.1) 94%, rgba(0, 0, 0, 0.4) 100%),
        linear-gradient(to right,
		rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 1%,  rgba(0, 0, 0, 0.1) 99%, rgba(0, 0, 0, 0.4) 100%);
}

.propnamehead { }
.propvaluehead{ }

.propertyrow { background:  transparent; border: none;}
.propertyrow td:last-child {background: #660000; }
.propertynamecell { padding: 2px 6px;  }
.propertylabel { color: white; }
.propertyvaluecell {
	background-image: linear-gradient(to right, 
		rgba(0, 0, 0, 0.4) 0%,  rgba(0, 0, 0, 0.2) 5%,
		rgba(0, 0, 0, 0.2) 90%, rgba(0, 0, 0, 0.4) 100%);
	color: white;
	position: relative;
	width: 140px;
}
.propertyvaluecell.oddcol { 
	background-image: linear-gradient(to right, 
		rgba(0, 0, 0, 0.4) 0%,  rgba(255,255,255,0.3) 5%,
		rgba(255,255,255,0.3) 90%, rgba(0, 0, 0, 0.4) 100%);
}
.propertyrow .buttoncell { border-left: 2px solid maroon;}

#proptablecontainer {
	background: #660000;
	border-top: 12px solid #660000;
	left: 50%;
	padding-left: auto;
	padding-right: auto;
	position: relative;
	transform: translateX(-50%);
	width: 100%;
	}
#proptable {
	background: transparent;
	border: 1px solid transparent;
	border-collapse: collapse;
	left: 50%;
	transform: translateX(-50%);
	position: absolute;
}
#proptable td { position: relative; }
#proptable tbody { z-index:-1; }
#proptable tfoot { bottom: 12px; position: sticky;}
#proptable tfoot tr { border-bottom: 8px solid #660000; border-top: 8px solid #660000; }
#proptable tfoot td {border-left: 1px solid #660000; border-right: 1px solid #660000; z-index:2;}
#proptable thead { background: #660000; bottom: 20%; top: 13px;  position: sticky; z-index:2;}
.submitall { height:32px; width:90px; border-radius: 14px 4px; }
.submitrow { width:90px; border-radius: 3px 14px 14px 3px; }
.submitcol { height:32px; width:100%; border-radius: 3px 3px 14px 14px;}
.submitrow:active, .submitcol:active { border-color:blue;}
.submitrow, .submitcol, .submitall  {
	background: rgba(202,195,72,0.6);
	background-image:
		linear-gradient(110deg,
			transparent 0%,   rgba(252, 246, 186,0.89) 11%,
			transparent 78%,  rgba(252, 246, 186,0.78) 22%,
			transparent 33%,  rgba(252, 246, 186,0.67) 44%,
			transparent 55%,  rgba(252, 246, 186,0.78) 66%,
			transparent 78%,  rgba(252, 246, 186,0.89) 89%,
			transparent 100%),
		linear-gradient(80deg,
			rgba(212,221,52,0.9) 0%, rgba(0,0,0,0.3) 17%,
			rgba(212,221,52,0.6) 34%, rgba(0,0,0,0.14) 68%,
			rgba(212,221,52,0.6) 85%, rgba(0,0,0,0.1) 100%),
		linear-gradient(70deg,
			transparent 0%,  rgba(212,221,52,0.9) 23%,
			transparent 46%, rgba(252, 246, 186,0.8) 69%,
			transparent 100%),
		linear-gradient(90deg, rgba(212,221,52,1) 0%, transparent 50%, rgba(212,221,52,1) 100%),
		linear-gradient(0deg, rgba(212,221,52,1) 0%,  transparent 50%, rgba(212,221,52,1) 100%);
	border: 1px solid rgba(255, 230, 153, .91);
	color: rgba(200,200,100,0.1);
	cursor: pointer;
	padding: 3px 4px;
	position: relative;
	text-align: center;
	text-shadow: 1px 1px 1px rgba(0,0,0,0.7), -1px -1px 1px rgba(230,230,200, 1);
}
']

[h: "<!-- build JavaScript -->"]

[h: javascript='
var datalink;
var dataraw = JSON.parse(JSON.stringify('+dataraw+'));
var propvaluetable = [];
var proptypetable = [];
var properties = [];
var tokenids = Object.keys(dataraw);

function setPropsArrays() {
    for (var i = 0; i < tokenids.length; i++) {
        var tokprops = Object.keys(dataraw[tokenids[i]]["props"]);
        var libprops = Object.keys(dataraw[tokenids[i]]["libProps"]);
        var tmparr = [...new Set([...properties, ...tokprops, ...libprops])];
        properties = tmparr;
    }
}
function initialiseDataTables() {
	for (var i = 0; i < properties.length; i++) {
        var propname = properties[i];
        var propvaluerow = new Array();
        var proptyperow = new Array();

        for (var ii = 0; ii < tokenids.length; ii++) {        	
        	if (dataraw[tokenids[ii]]["props"].hasOwnProperty( propname )) {               
                propvaluerow.push( dataraw[tokenids[ii]]["props"][propname] );
            } else if (dataraw[tokenids[ii]]["libProps"].hasOwnProperty( propname )) {
                propvaluerow.push(dataraw[tokenids[ii]]["libProps"][propname] );
                proptyperow.push( 1 );
            } else {
                propvaluerow.push( "" );
                proptyperow.push( 0 );
            }
        }
        proptypetable.push(proptyperow);
        propvaluetable.push(propvaluerow);
    }
}

function sendData(e){
	datalink = document.getElementById("datalink");
	var data = {"properties":[], "tokenids":tokenids, "processids":[], "values":[]};
	var tmp = datalink.href;
    if (e.target.id === "rc_all") {
    	data["properties"] = properties;
    	data["processids"] = tokenids;
    	data["values"] = propvaluetable; 
    } else if (e.target.id === e.target.id.replace(/r_/g,"")) {
    	const col = e.target.id.replace(/c_/g, "");
    	data["properties"] = properties;
    	data["processids"] = tokenids[col];
    	data["values"] = propvaluetable.slice(0, propvaluetable.length).map(i => i.slice(col, col + 1));
    } else {
    	const row = e.target.id.replace(/r_/g, "");
    	data["properties"] = properties[row];
    	data["processids"] = tokenids;
    	data["values"].push(propvaluetable[row]);
    }
    datalink.href = datalink.href+ encodeURIComponent(JSON.stringify(data));
	datalink.click();
	datalink.href = tmp;
}
function keyHandler(e){
	if (e.isComposing || e.keyCode === 229) { return; }
    if (e.which === 112){
    	document.getElementById("help").style.display = "block";
    	return;
    }    
    const r1 = parseInt( e.target.id.replace(/.*r_(.*)_c_.*/g, "\$1") );
	const c1 = parseInt( e.target.id.replace(/.*_c_/g, "") );
    if(e.getModifierState("Control") && e.which==69) {
        if(e.target.id.startsWith("area_r_")){
            document.getElementById("hidearea_r_"+r1+"_c_"+c1).click();
            return;            
        } else {
            document.getElementById("showarea_r_"+r1+"_c_"+c1).click();
            return;
        }
    }
    const com = (e.getModifierState("Alt") || e.getModifierState("AltGraph")) && e.getModifierState("Shift");
	if(!com) return;
	let r0, c0;
    let moveFlag = false;
	let copyFlag = false;
  	switch(e.which){
  		case 33 : r0 = 0;                 copyFlag = true; break;
  		case 34 : r0 = properties.length; copyFlag = true; break;
  		case 35 : c0 = tokenids.length;   copyFlag = true; break;
  		case 36 : c0 = 0;                 copyFlag = true; break;
  		case 37 : c0 = c1 - 1 < 0 ? tokenids.length - 1 : c1 - 1;   r0 = r1; moveFlag = true; break;
		case 38 : r0 = r1 - 1 < 0 ? properties.length - 1 : r1 - 1; c0 = c1; moveFlag = true; break;
		case 39 : c0 = c1 + 1 > tokenids.length - 1 ? 0 : c1 +1;    r0 = r1; moveFlag = true; break;
		case 40 : r0 = r1 + 1 > properties.length - 1 ? 0 : r1 + 1; c0 = c1; moveFlag = true; break;
  		default: return;
  	}
    if(moveFlag) {
        document.getElementById( "r_" + r0 + "_c_" + c0 ).focus();
        return;
    }
    if(copyFlag) {
        var i;
        if(typeof r0 === "undefined") {
            for( i = Math.min(c0, c1); i < Math.max(c0, c1); i++) {
                document.getElementById( "r_" + r1 + "_c_" + i ).value = e.target.value;
                propvaluetable[r1][i] = e.target.value;
            }
        } else {
            for( i = Math.min(r0, r1); i < Math.max(r0, r1); i++) {
                document.getElementById( "r_" + i + "_c_" + c1 ).value = e.target.value;
                propvaluetable[i][c1] = e.target.value;
            }
        }
    }
}
function inputHandler(e){
	const r = e.target.id.replace(/r_(.*)_c_.*/g, "\$1");
	const c = e.target.id.replace(/.*_c_/g, "")
	var val = e.target.value;
	if(val === "[object Object]") val = JSON.stringify(e.target.value);
	propvaluetable[r][c] = val;
}
function hide(e){
    var el = e.target;
    var textarea = el.nextSibling;
    var cont = el.parentElement;
    var textbox = cont.previousSibling.previousSibling;
    textbox.value = textarea.value;
    cont.style.display="none";
    textbox.focus();
}
function show(e){
    var el = e.target;
    var textbox = el.previousSibling;
    var cont = el.nextSibling;
    var area = cont.children[1];
    var tas= document.getElementsByClassName("areacontainer");
    for(var i = 0; i < tas.length; i++){ tas[i].style.display="none";}
    area.value = textbox.value;
    cont.style.display="block";
    area.focus();
    moveOnScreen(cont);
}
function moveOnScreen(el){
    const rect = el.getBoundingClientRect();
    const compStyle = window.getComputedStyle(el);
    var bottom = rect.bottom;
    var left = rect.left;
    var right = parseInt(compStyle.right);
    var top = parseInt(compStyle.top);
    if(left + window.scrollX <6){ el.style.right = Math.round(left + window.scrollX)-6+"px"; }
    if(window.innerHeight - bottom - window.scrollY < 6){ el.style.top = window.innerHeight - bottom -6+"px"; }    
}

function buildTable(){
    proptablebody = document.getElementById("tbody");
    let propids = new Array();

    for (var rowidx=0; rowidx<properties.length; rowidx++) {
        row = document.createElement("tr");
        row.classList.add("propertyrow");
        if (rowidx % 2 == 1) { row.classList.add("oddrow"); }
        row.id = "prop_"+rowidx;
        cell = document.createElement("td");
        cell.classList.add("propertynamecell");

        label = document.createElement("label");
        label.classList.add("propertylabel");
        label.innerHTML = properties[rowidx];
        label.id = properties[rowidx].replace(/[^A-Za-z][\W]*/g, "");
        label.setAttribute("aria-label", "Property name");
        propids.push(label.id);

        cell.appendChild(label);
        row.appendChild(cell);
        proptablebody.appendChild(row);
    }
    for (var colidx = 0; colidx < tokenids.length; colidx++) {
        // header and footer rows start
        tokenid = tokenids[colidx];
        row = document.getElementById("imagerow");
        cell = document.createElement("td");
        cell.classList.add("imagecell");
        image = document.createElement("img");
        image.classList.add("image");
        image.setAttribute("alt", dataraw[tokenid]["name"]);
        image.setAttribute("aria-label", "Token image");
        image.setAttribute("src", dataraw[tokenid]["image"]);
        cell.appendChild(image);
        row.appendChild(cell);

        row = document.getElementById("namerow");
        cell = document.createElement("td");
        cell.classList.add("namecell");
        cell.setAttribute("aria-label", "Token name");
        cell.innerHTML = dataraw[tokenid]["name"];
        row.appendChild(cell);

        row = document.getElementById("typerow");
        cell = document.createElement("td");
        cell.classList.add("typecell");
        cell.setAttribute("aria-label", "Token type");
        cell.innerHTML = dataraw[tokenid]["type"];
        row.appendChild(cell);

        row = document.getElementById("headingrow");
        cell = document.createElement("td");
        cell.classList.add("headingcell");
        cell.setAttribute("aria-label", "Value column");
        cell.innerHTML = "Value";
        row.appendChild(cell);

        row = document.getElementById("buttonrow");
        cell = document.createElement("td");
        cell.classList.add("buttoncell");
        button = document.createElement("button");
        button.addEventListener("click", sendData, false);
        button.id = "c_" + colidx;
        button.classList.add("submitcol");
        button.setAttribute("aria-label", "Submit row");
        button.innerHTML = "Update Column";
        cell.appendChild(button);
        row.appendChild(cell);

        // header and footer rows end

        // property value cells start
        for (var rowidx=0; rowidx<properties.length; rowidx++) {
            row = document.getElementById("prop_"+rowidx);
            cell = document.createElement("td");
            cell.classList.add("propertyvaluecell");
            if (proptypetable[rowidx][colidx] === 1) { cell.classList.add("libproperty"); }
            if (colidx % 2 == 1) { cell.classList.add("oddcol"); }
            textbox = document.createElement("input");
            textbox.setAttribute("type", "text");
            textbox.setAttribute("size", 12);
            textbox.setAttribute("aria-labelledby", label.id);
            textbox.value = propvaluetable[rowidx][colidx];
            if(textbox.value=="[object Object]") textbox.value=JSON.stringify(propvaluetable[rowidx][colidx]);
            textbox.id = "r_"+rowidx+"_c_"+colidx;
            textbox.addEventListener("input", inputHandler, true);
            textbox.addEventListener("keydown", keyHandler, true);
            cell.appendChild(textbox);

            button = document.createElement("button");
            button.classList.add("areabutton");
            button.classList.add("show");
            button.id = "showarea_r_"+rowidx+"_c_"+colidx;
            button.innerHTML = "+";
            button.addEventListener("click", show, false);
            button.setAttribute("aria-label", "Display in text area");
            cell.appendChild(button);

            div = document.createElement("div");
            div.classList.add("areacontainer");
            div.id = "areacontainer__r_"+rowidx+"_c_"+colidx;

            textarea = document.createElement("textarea");
            textarea.classList.add("areavalue");
            textarea.id = "area_r_"+rowidx+"_c_"+colidx;
            textarea.setAttribute("aria-label", "Text area input");
            textarea.setAttribute("cols", 40);
            textarea.setAttribute("rows", 15);
            textarea.setAttribute("wrap", "hard");
            textarea.addEventListener("keydown", keyHandler, false);

            button = document.createElement("button");
            button.classList.add("areabutton");
            button.classList.add("hide");
            button.id = "hidearea_r_"+rowidx+"_c_"+colidx;
            button.innerHTML = "&#8722";
            button.setAttribute("aria-label", "Close text area");
            button.addEventListener("click", hide, false);

            div.appendChild(button);
            div.appendChild(textarea);
            cell.appendChild(div);
            row.appendChild(cell);

            // property value cells end
        }
    }

    // submit row button start
    for (var rowidx=0; rowidx<properties.length; rowidx++) {
        row = document.getElementById("prop_"+rowidx);
        cell = document.createElement("td");
        cell.classList.add("buttoncell");

        button = document.createElement("button");
        button.classList.add("submitrow");
        button.id = "r_" + rowidx;
        button.setAttribute("aria-label", "Submit row");
        button.innerHTML = "Update Row";
        button.addEventListener("click", sendData, false);

        cell.appendChild(button);
        row.appendChild(cell);
    }
    // submit row button end
    
    // submit all button
    row = document.getElementById("buttonrow");
    cell = document.createElement("td");
    cell.classList.add("buttoncell");
    button = document.createElement("button");
    button.addEventListener("click", sendData, false);
    button.id = "rc_all";
    button.classList.add("submitall");
    button.setAttribute("aria-label", "Submit all");
    button.innerHTML = "Update All";
    cell.appendChild(button);
    row.appendChild(cell);

    row = document.getElementById("imagerow");
	cell = document.createElement("td");
	cell.classList.add("empty");
	cell.setAttribute("rowspan", 4);
	row.appendChild(cell);
}

window.addEventListener("load", function(){
    setPropsArrays();
    initialiseDataTables();
    buildTable();
    document.getElementById("help").addEventListener("click", function(){
    	document.getElementById("help").style.display = "none";
    })
})
']

[h: "<!-- build HTML links -->"]
[h: datalink = macroLinkText(getMacroName()+"@"+this,"self")]
[h,	if(useOnChangeSelection): onChangeSelectionLink = strformat('<link rel="onChangeSelection" type="macro" href="%{datalink}">')]

[h: "<!-- determine initial dialogue width and height -->"]
[h: propMaxChar=0]
[h, foreach(v_prop, v_allprops): propMaxChar=max(propMaxChar, length(v_prop))]
[h: rowCount =json.length(v_allprops)]
[h: height = min(maxHeight, rowCount * rowSize+263)]
[h: width = max(670, min(maxWidth, propMaxChar * 16 + json.length(v_tokenids)*140+ 90))]

[h: props=strPropFromVars("width, height, closebutton, input, noframe, scrollreset, temporary, title, value")]
[r, dialog5(dialogName, props): {
<html lang="en-au">
	<head>
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		[r,	if(useOnChangeSelection): onChangeSelectionLink]
		<style>[r:css]</style>
		<script>[r: javascript]</script>
	</head>
	<body>
	<div id="proptablecontainer">
    <table id="proptable">
    <thead>
        <tr class="imagerow" id="imagerow" aria-label="Token image row"><td class="empty">
        <div class="aestheticscreen top"></div>
        </td>
        <tr class="namerow" id="namerow"   aria-label="Token name row"><td class="empty"></td>
        <tr class="typerow" id="typerow"   aria-label="Token type row"><td class="arrowcell">Token Type &rarr;</td>
        <tr class="headingrow" id="headingrow" aria-label="Table heading row"><td class="propnamehead" aria-label="Property name column">Property Name</th>
    </thead>
    <tbody id="tbody">
    </tbody>
    <tfoot id="tfoot">
        <tr class="buttonrow" id="buttonrow" aria-label="Token submit buttons"><td class="empty"><div class="aestheticscreen bottom"></div></td>
    </tfoot>
    </table>
    <div id="help">
<h1>Key Commands</h1>
<h2>Navigate</h2>
<ul>
<li><span class="key">Shift</span> + <span class="key">Alt</span> + <span class="key">&#11014;</span>&nbsp;&nbsp;Move up</li>
<li><span class="key">Shift</span> + <span class="key">Alt</span> + <span class="key">&#10145;</span>&nbsp;&nbsp;Move right</li>
<li><span class="key">Shift</span> + <span class="key">Alt</span> + <span class="key">&#11015;</span>&nbsp;&nbsp;Move down</li>
<li><span class="key">Shift</span> + <span class="key">Alt</span> + <span class="key">&#11013;</span>&nbsp;&nbsp;Move left</li>
<li><span class="key">Control</span> + <span class="key">E</span>&nbsp;&nbsp;Open/close text area input</li>
</ul>
<h2>Content Copy</h2>
<ul>
<li><span class="key">Shift</span> + <span class="key">Alt</span> + <span class="key">Page Up</span>&nbsp;&nbsp;Copy cell contents up column</li>
<li><span class="key">Shift</span> + <span class="key">Alt</span> + <span class="key">Page Down</span>&nbsp;&nbsp;Copy cell contents down column</li>
<li><span class="key">Shift</span> + <span class="key">Alt</span> + <span class="key">Home</span>&nbsp;&nbsp;Copy cell contents to row start</li>
<li><span class="key">Shift</span> + <span class="key">Alt</span> + <span class="key">End</span>&nbsp;&nbsp;Copy cell contents to row end</li>
</ul>
<div class="helpclosemessage"><span class="key">Click to close</span></div>
	</div>
    </div>
    <a id="datalink" href="[r: datalink]" style="display:none;"></a>
	</body>
</html>
}]