console.log("gmoney gold foil experiment established 1 2 3 1 2 3");

 //disable selection thing and context menu I HATE IT BUT I NEEEEEEEEEEED IT
document.body.onselectstart = document.body.oncontextmenu = function () { return false }

var goldfoil = [ // 0=space 1=block 2=/curve 3=\curve
	];
var goldfoilElement = document.getElementById("goldfoil");
function drawBoard(iwanttoseeit) {
	goldfoilElement.innerHTML = "";
	for (var i = 0; i < goldfoil.length; i++) {
		for (var j = 0; j < goldfoil[i].length; j++) {
			goldfoilElement.innerHTML += "<div id='goldfoil-"+i+"-"+j+"' style='float: left; width: "+(300/goldfoil.length)+"px; height: "+(300/goldfoil.length)+"px; background: "+
											((iwanttoseeit) ? (((goldfoil[i][j]==3)? "linear-gradient(45deg,white 0%,white 45%,grey 45%,grey 55%, white 55%, white 100%);" : 
											(goldfoil[i][j]==2) ? "linear-gradient(-45deg,white 0%,white 45%,grey 45%,grey 55%, white 55%, white 100%);" : 
											(goldfoil[i][j]==1) ? "grey" : "white")) : "black") +"'></div>";
			//goldfoilElement.innerHTML += "<div style='float: left; width: 15px; height: 15px; background: rgb("+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+");'></div>";
		}
	}
}
//document.body.appendChild(goldfoilElement);
console.log(goldfoil);
console.log("^ the map (0=space, 1=block, 2=/curve, 3=\\curve\n\ntype in hitit(direction, offset) to get a result.\n\nExample: hitit(0, 40) // directions are 0=top, 1=right, 2=bottom, 3=left");
console.log("current game offset max is " + goldfoil.length);


// buttons

document.getElementById("playSelector").addEventListener("click", function () {
	document.getElementById("startpage").style.display = "none";
	//document.getElementById("credits").style.display = "block";
	document.getElementById("main").style.display = "block";
});


document.getElementById("customshapesSelector").addEventListener("click", function () {
	document.getElementById("startpage").style.display = "none";
	document.getElementById("customshapes").style.display = "block";
});

document.getElementById("playStart").addEventListener("click", function() {
	document.getElementById("mainMenu").style.display = "none";
	for (var i = 0; i < 4; i++) {
		document.getElementById("beam"+i).style.background = "";
	}
	document.getElementById("play").style.display = "block";
	goldfoil = customShapes[parseInt(document.getElementById("playShape").value)];
	drawBoard();
});

document.getElementById("fire").addEventListener("click", function() {
	var agg="",dga=document.getElementById("controlDirection").value;
	for(var i=0;i<3;i++)agg+=document.getElementById("controlOffset"+i).value;agg=parseInt(agg)-1;
	console.log("agg: " + agg + ", dga: " + dga);
	
	for (var i = 0; i < 4; i++) {
		document.getElementById("beam"+i).style.background = "";
	}
	var amazing = ['T','R','B','L'].indexOf(dga);
	if (amazing == 0 || amazing == 2) {
		console.log("2 tst");
		document.getElementById("beam"+amazing).style.left = (3*((amazing==0)?100-agg+1:agg)) + "px";
	} else {
		document.getElementById("beam"+amazing).style.top = (3*((amazing==1)?100-agg-1:agg-1)) + "px";
	}
	document.getElementById("beam"+amazing).style.background = "orange";
	outofahundred = agg;
	agg = Math.floor(agg / (100 / goldfoil.length))+1;
	hitit(dga, agg);
});

for (var i = 0; i < document.getElementsByClassName("backtostart").length; i++) {
	document.getElementsByClassName("backtostart")[i].addEventListener("click", function () {
		//document.getElementById("tutorial").style.display = "none";
		document.getElementById("customshapes").style.display = "none";
		document.getElementById("main").style.display = "none";
		document.getElementById("play").style.display = "none";
		document.getElementById("mainMenu").style.display = "block";
		document.getElementById("startpage").style.display = "block";
	});
}

input = {
	direction: function (kea) {
		kea = kea.key.toUpperCase();
		switch (kea) {
			case 'T':
				document.getElementById("controlDirection").value = kea;
				document.getElementById("controlOffset0").focus();
				break;
			case 'R':
				document.getElementById("controlDirection").value = kea;
				document.getElementById("controlOffset0").focus();
				break;
			case 'B':
				document.getElementById("controlDirection").value = kea;
				document.getElementById("controlOffset0").focus();
				break;
			case 'L':
				document.getElementById("controlDirection").value = kea;
				document.getElementById("controlOffset0").focus();
				break;
			case 'ARROWUP':
				document.getElementById("controlDirection").value = 
						['L','T','R','B'][['T','R','B','L'].indexOf(document.getElementById("controlDirection").value)];
				break;
			case 'ARROWDOWN':
				document.getElementById("controlDirection").value = 
						['R','B','L','T'][['T','R','B','L'].indexOf(document.getElementById("controlDirection").value)];
				break;
			case 'ARROWRIGHT':
				document.getElementById("controlOffset0").focus();
				break;
			case 'ENTER':
				document.getElementById("fire").click();
				break;
		}
	},
	offset: function (kea, noma) {
		kea = kea.key.toUpperCase();
		if ("0123456789".indexOf(kea) != -1) {
			document.getElementById("controlOffset" + noma).value = kea;
			if (noma < 2) document.getElementById("controlOffset"+(noma+1)).focus();
//			if (noma == 0) {
//				console.log(document.getElementById("controlOffset1").value);
//				if ("01".indexOf(kea) != -1) {
//					if (document.getElementById("controlOffset1").value == "0" && document.getElementById("controlOffset2").value == "0")
//						document.getElementById("controlOffset" + noma).value = kea;
//				}
//			} else {
//				if (document.getElementById("controlOffset0").value != "1") {
//					document.getElementById("controlOffset" + noma).value = kea;
//				}
//			}
		} else {
			switch (kea) {
				case 'ARROWUP':
					document.getElementById("controlOffset"+noma).value = 
							[1,2,3,4,5,6,7,8,9,0][[0,1,2,3,4,5,6,7,8,9].indexOf(parseInt(document.getElementById("controlOffset"+noma).value))];
					break;
				case 'ARROWDOWN':
					document.getElementById("controlOffset"+noma).value = 
							[9,0,1,2,3,4,5,6,7,8][[0,1,2,3,4,5,6,7,8,9].indexOf(parseInt(document.getElementById("controlOffset"+noma).value))];
					break;
				case 'ARROWLEFT':
					if (noma > 0) document.getElementById("controlOffset"+(noma-1)).focus();
					else document.getElementById("controlDirection").focus();
					break;
				case 'ARROWRIGHT':
					if (noma < 2) document.getElementById("controlOffset"+(noma+1)).focus();
					break;
				case 'ENTER':
					document.getElementById("fire").click();
					break;
			}
		}
	},
	directionClean: function () {
		if (document.getElementById("controlDirection").value.length != 1) 
		document.getElementById("controlDirection").value = document.getElementById("controlDirection").value[0];
		else document.getElementById("controlDirection").value = "";
	}
}




var customShapes = [[],[],[],[],[]];
if (typeof localStorage.getItem("customShapes") == "object") {
	customShapes[0]=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,0,0,3,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,2,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
	localStorage.setItem("customShapes","[[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,0,0,3,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,2,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],[],[],[],[]]");
} else {
	customShapes = JSON.parse(localStorage.getItem("customShapes"));
}
// custom shapes stuff
var customFrame = document.getElementById("customFrame");

var customShape = {
	active: 0,
	side: 25,
	data: [], 
	shading: ["black", "grey", "linear-gradient(-45deg,black 0%,black 45%,grey 45%,grey 55%, black 55%, black 100%)",
			  "linear-gradient(45deg,black 0%,black 45%,grey 45%,grey 55%, black 55%, black 100%)",],
	_loadFrame: function () {
		if (customFrame.innerHTML == "") {
			console.log("customFrame is empty");
			customFrame.style.width = (customShape.side * 30) + "px";
			for (var i = 0; i < customShape.side; i++) {
				for (var j = 0; j < customShape.side; j++) {
					
					customFrame.innerHTML += '<div class="customFrameCell"><input onkeydown="customShape._keyHandle(event,'+i+','+j+')" onchange="customShape._loadImage(true,'+i+','+j+')" id="customFrame-' + i + '-' + j + '" type="number" min="0" max="3" value="'+customShape.data[i][j]+'" /></div>';
				}
			}
		} else {
			for (var i = 0; i < customShape.side; i++) {
				for (var j = 0; j < customShape.side; j++) {
					document.getElementById("customFrame-"+i+"-"+j).value = customShape.data[i][j];
				}
			}
		}
	},
	_loadImage: function (pspecific, px, py) {
		
		
		
		if (pspecific) {
			var tvalue = document.getElementById("customFrame-"+px+"-"+py).valueAsNumber;
			document.getElementById("customImage-" + px + '-' + py).style.background = customShape.shading[tvalue];
		} else {
			if (document.getElementById("customImage").innerHTML == "") {
				console.log("customImage is empty");
				var pixelwidth = 300 / customShape.side;				
				for (var i = 0; i < customShape.side; i++) {
					for (var j = 0; j < customShape.side; j++) {
						var tvalue = document.getElementById("customFrame-"+i+"-"+j).valueAsNumber;
						var shading = (tvalue==3)? "linear-gradient(45deg,black 0%,black 45%,grey 45%,grey 55%, black 55%, black 100%);" : 
										(tvalue==2) ? "linear-gradient(-45deg,black 0%,black 45%,grey 45%,grey 55%, black 55%, black 100%);" : 
										(tvalue==1) ? "grey" : "black";
						document.getElementById("customImage").innerHTML += "<div id='customImage-" + i + '-' + j + "' style='display: inline-block; width: " + pixelwidth + "px; height: " + pixelwidth + "px; background: " + shading + "'></div>";
					}
				}
			} else {
				for (var i = 0; i < customShape.side; i++) {
					for (var j = 0; j < customShape.side; j++) {
						var tvalue = customShape.data[i][j];
						document.getElementById("customImage-"+i+"-"+j).style.background = customShape.shading[tvalue];
					}
				}
			}
		}
	},
	_keyHandle: function (keye,px,py) {
		keye = keye.key;
		switch (keye) {
			case 'w':
				if (px != 0) document.getElementById("customFrame-"+(px-1)+"-"+py).focus();
				break;
			case 'a':
				if (py != 0) document.getElementById("customFrame-"+px+"-"+(py-1)).focus();
				break;
			case 's':
				if (px != customFrame.side-1) document.getElementById("customFrame-"+(px+1)+"-"+py).focus();
				break;
			case 'd':
				if (py != customFrame.side-1) document.getElementById("customFrame-"+px+"-"+(py+1)).focus();
				break;
			
		}
	},
	_save: function (what) {
		var ac = parseInt(what.path[0].id.replace("custom",""))-1;
		document.getElementById("customContainer").style.display = "none";
		document.getElementById("customBuilder").style.display = "block";
		customShape.active = ac;
		customShape.data = [];
		console.log(ac);
		if (customShapes[ac].length == 0) {
			customShape.side = 25;
			for (var i = 0; i < customShape.side; i++) {
				customShape.data[i] = [];
				for (var j = 0; j < customShape.side; j++) {
					customShape.data[i].push(0);
				}
			}
		} else {
			customShape.side = customShapes[ac].length;
			customShape.data = customShapes[ac];
		}
		customShape._loadFrame();
		customShape._loadImage(false);

	}
}


for (var i = 0; i < 5; i++) {
	customShape._savething = i;
	document.getElementById("custom"+(i+1)).addEventListener("click", customShape._save);
}

document.getElementById("customBack").addEventListener("click", function () {
	document.getElementById("customContainer").style.display = "block";
	document.getElementById("customBuilder").style.display = "none";
});

document.getElementById("customSave").addEventListener("click", function () {
	customShape.data = [];
	for (var i = 0; i < customShape.side; i++) {
		customShape.data[i] = [];
		for (var j = 0; j < customShape.side; j++) {
			customShape.data[i].push(document.getElementById("customFrame-"+i+"-"+j).valueAsNumber);
		}
	}
	customShapes[customShape.active] = customShape.data;
	localStorage.setItem("customShapes",JSON.stringify(customShapes));
});

document.getElementById("customSaveOff").addEventListener("click", function () {
	customShape.data = [];
	for (var i = 0; i < customShape.side; i++) {
		customShape.data[i] = [];
		for (var j = 0; j < customShape.side; j++) {
			customShape.data[i].push(document.getElementById("customFrame-"+i+"-"+j).valueAsNumber);
		}
		
	}
	prompt("Save the text below on your computer. This could be in a txt file or anywhere you can save text like a google document.",JSON.stringify(customShape.data));
});





// we're gonna try this again
var dir=0,idir=0,off=0,inc=0,outofahundred=0,settimeoutthing=0;
function dirReact(cdir, boardValue) {
	if (boardValue == 1) {
		return (cdir == 0) ? 2 : (cdir == 1) ? 3 : (cdir == 2) ? 0 : 1;
	} else if (boardValue == 2) {
		return (cdir == 0) ? 1 : (cdir == 1) ? 0 : (cdir == 2) ? 3 : 2;
	} else if (boardValue == 3) {
		return (cdir == 0) ? 3 : (cdir == 1) ? 2 : (cdir == 2) ? 1 : 0;
	}
}

function beamStep(repeat) {
	try {
		var pos = [inc,off];
		document.getElementById("goldfoil-"+pos[0]+"-"+pos[1]).style.background; // ???????????????
		if (gSettings.enableTracers) document.getElementById("goldfoil-"+pos[0]+"-"+pos[1]).style.background = "rgb("+(200-5*settimeoutthing)+","+(200-3*settimeoutthing)+","+(200-9*settimeoutthing)+")";
		settimeoutthing++;
		if (goldfoil[pos[0]][pos[1]] != 0) {
			console.log("REACT!");
			dir = dirReact(dir, goldfoil[pos[0]][pos[1]]);
			console.log("new dir: " + dir);
			console.log("new off: " + off);
			console.log("new inc: " + inc);
			
			
		}
		(dir == 0) ? inc++ : (dir == 1) ? off-- : (dir == 2) ? inc-- : off++;
		if (repeat) {
			//beamStep(true);
			setTimeout(function () { beamStep(true) }, 50);
		}
	} catch (err) {
		document.getElementById("controlDirectionOut").value = ['T','R','B','L'][[2,3,0,1].indexOf(dir)];
		
		if (dir == 2 || dir == 3) {off = goldfoil.length - off; inc = goldfoil.length - inc};
		var newoff = ((dir == 0 || dir == 2) ? off : inc),
			idk = outofahundred/(100/goldfoil.length) - Math.floor(outofahundred/(100/goldfoil.length)),
			iamconfused = 0;
			
			if ((dir==0&&idir==2)||
			    (dir==1&&idir==3)||
				(dir==2&&idir==0)||
				(dir==3&&idir==1)) iamconfused = 1;
			idk = ((dir == 0 || dir == 1) && (idir == 0 || idir == 1)) ? idk : 1-idk;
			
			newoff = (Math.floor((100/goldfoil.length)*(newoff+((dir == 0 || dir == 1) ? (1-idk) : (-(idk)))))+(iamconfused)).toString();
			newoff = "000".substr(0,3-newoff.length)+newoff;
		document.getElementById("controlOffset0Out").value = newoff[0];
		document.getElementById("controlOffset1Out").value = newoff[1];
		document.getElementById("controlOffset2Out").value = newoff[2];
		console.log("beam out of bounds.");
		console.log(err);
		console.log("dir: " + dir);
		console.log("out dir: " + ['T','R','B','L'][[2,3,0,1].indexOf(dir)]);
		console.log("out off: " + off);
		console.log("out inc: " + inc);
		var amazing = [2,3,0,1].indexOf(dir);
		if (amazing == 0 || amazing == 2) {
			console.log("2 tst");
			document.getElementById("beam"+amazing).style.left = (3*((amazing==0)?100-newoff+1:newoff)) + "px";
		} else {
			document.getElementById("beam"+amazing).style.top = (3*((amazing==1)?100-newoff-1:newoff-1)) + "px";
		}
		document.getElementById("beam"+amazing).style.background = "green";
	}
}

function hitit(_dir, offset) {
	console.log("_dir init: " + _dir + "\noffset init: " + offset);
	dir = _dir = ['t','r','b','l'].indexOf(_dir.toLowerCase());
	idir = dir;
	offset = (_dir == 0 || _dir == 1) ? goldfoil.length - offset : offset - 1;
	console.log("_dir now: " + _dir + "\noffset now: " + offset);
	var increment = (_dir == 2 || _dir == 1) ? goldfoil.length - 1 : 0;
	console.log("increment: " + increment);
	if (_dir == 1 || dir == 3) {
		off = increment;
		inc = offset;
	} else {
		off = offset;
		inc = increment;
	}
	settimeoutthing = 0;
	beamStep(true);
}

function init() {
	for (var i = 0; i < customShape.side; i++) {
		customShape.data[i] = [];
		for (var j = 0; j < customShape.side; j++) {
			customShape.data[i].push(0);
		}
	}
	customShape._loadFrame();
	customShape._loadImage(false);
	document.getElementById("loadingpage").style.display = "none";
	document.getElementById("starters").style.display = "block";
}

document.getElementById("tracerCheck").addEventListener("change",
	function(event) {gSettings.enableTracers=event.target.checked?true:false}
);
var gSettings = {
	enableTracers: false
}

init();

/*
document.getElementById("loadingpage").style.display = "none";
document.getElementById("main").style.display = "block";
document.getElementById("mainMenu").style.display = "none";
document.getElementById("play").style.display = "block";
goldfoil = customShapes[parseInt(document.getElementById("playShape").value)];
drawBoard();
*/





