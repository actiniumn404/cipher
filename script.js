const canvas = document.getElementById("canvas");
window.onresize = function(){
	canvas.setAttribute("width", (window.innerWidth*9 / 10)+"px")
	canvas.setAttribute("height", (window.innerHeight * 9 / 10) + "px")
	if (urljson.get("q")){
		create(cipher(urljson.get("q")))
	}
}
canvas.setAttribute("width", (window.innerWidth*9 / 10)+"px")
canvas.setAttribute("height", (window.innerHeight * 9 / 10) + "px")
const pencil = canvas.getContext("2d");
let block_height = 200
let spacing = 50
let block_width = 150
let start_x = 0
let start_y = 100
let default_font = "400 "+Math.floor(block_height/5)+"px Arial"
pencil.font = default_font;
var x_pos
var y_pos

pencil.moveTo(x_pos, y_pos)

function isLetter(str) {
	for (z of str.toString().split("")){
		if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").includes(z) === false){
			return false
		}
	}
	return true
}

function create(array){
	default_font = "400 "+Math.floor(block_height/5)+"px Arial"
	pencil.font = default_font;
	pencil.clearRect(0, 0, canvas.width, canvas.height);
	x_pos = start_x
	y_pos = start_y
	pencil.beginPath()
	for (let i = 0;i<array.length;i++){
		if ((x_pos+block_width) > document.getElementById("canvas").width){
			x_pos = start_x
			y_pos += block_height
		}
		pencil.moveTo(x_pos, y_pos)
		if (!(array[i] === "+")){
			pencil.lineTo(x_pos+block_width, y_pos)
			if (!isLetter(array[i])){
				pencil.fillText(array[i], x_pos, y_pos+40);
			}
			if (isLetter(array[i])){
				pencil.fillText(array[i], x_pos, y_pos-20)
			}
		}else{
			// Across
			//pencil.moveTo(x_pos+(block_width / 4), y_pos - (block_height / 2 - 40))
			//pencil.lineTo(x_pos+(block_width / 4 * 3), y_pos - (block_height / 2 - 40))
			// Top
			//pencil.moveTo(x_pos+(block_width / 2), y_pos - (block_height / 2))
			//pencil.lineTo(x_pos+(block_width / 2), y_pos - (-block_height / 4 + block_height / 2 - 20))
			pencil.font = "lighter "+Math.floor(block_height/2.2)+"px Arial";
			pencil.fillText(array[i], x_pos+(block_width / 4), y_pos - (block_height / 8))
			pencil.font = default_font;
		}
		x_pos += (block_width + spacing)
	}
	pencil.stroke()
}
const sym = new Set(Object.keys(symbols))
function cipher(text){
	let result = []
	for (y of text.toUpperCase().split(" ")){
		// My python error paranoia be like
		letters = y.split("")
		// Flexin' my awesome computer science skills
		pointer = 0
		while (pointer < letters.length){
			if (sym.has(letters[pointer]+letters[pointer+1])){
				result.push(symbols[letters[pointer]+letters[pointer+1]])
				pointer += 2
				continue
			}if (sym.has(letters[pointer])){
				result.push(symbols[letters[pointer]])
			}else{
				if (!urljson.get("alphindex")){
					result.push(letters[pointer])
				}else{
					result.push("a"+(("ABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(letters[pointer])+1))
				}
			}
			pointer += 1
		}
		if (y !== text.toUpperCase().split(" ")[text.toUpperCase().split(" ").length-1]){
			result.push("+")
		}
	}
	return result
}
const urljson = new URLSearchParams(window.location.search)
if (urljson.get("q")){
	document.getElementById("resulttext").innerHTML = urljson.get("q")
	encoded = cipher(urljson.get("q"))
	create(encoded)
	document.getElementById("textfile").innerHTML = encoded.join(" ")
	document.getElementById("download").href = canvas.toDataURL()
}
function copy(txt) {
	/* Get the text field */
	//let copyText = document.body.appendChild(document.createElement("INPUT"))
	//copyText.value = canvas.toDataURL()

	/* Select the text field */
	//copyText.select();
	//copyText.setSelectionRange(0, 99999); /* For mobile devices */

	/* Copy the text inside the text field */
	try{
		navigator.clipboard.writeText(txt);
	}catch (err){
		alert("Something went wrong with copying the image link")
	}
}

