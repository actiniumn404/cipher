out = document.getElementById("output")
function getkey(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function isLetter(str) {
	for (z of str.toString().split("")){
		if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").includes(z) === false){
			return false
		}
	}
	return true
}
document.getElementById("input").onkeyup = function(){
	function create_err(text){
		out.value = text
		out.value += "\n\n"+document.getElementById("input").value+"\n"+errorpointer
	}
	out.value = ""
	errorpointer = "^"
	text = document.getElementById("input").value.trim().split(' ')
	for (j of text){
		if (j === "+"){
			out.value += " "
		}else if (isLetter(j)){
			if (j.length !== 1){
				create_err("ERROR. You can. only have one letter in a block")
				break
			}
			out.value += j
		}else if (Number(j)){
			if (Number(j) < 1 || Number(j) > 119){
				create_err("ERROR. There is no such element with the atomic number of \""+j+"\"")
				break
			}if (Number(j) % 1 !== 0){
				create_err("ERROR. That is not a number")
				break
			}
			out.value += getkey(symbols, Number(j))
		}else if (j.match(/(a[1-26])/)){
			out.value += ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")[Number(j.substring(1)) - 1])
		}
		else{
			out.value += ""
		}
		for (let k = 0;k<=j.length;k++){
			errorpointer = "-"+errorpointer
		}
	}
}
window.addEventListener('message', e => {
	if (e.data.type == 'disable links'){
		document.querySelectorAll("a").forEach(e=>{
			e.setAttribute("href", "javascript:void(0)")
		})
	}
});