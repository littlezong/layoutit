$(function(){
	$('.draggable').attr('draggable','true').ondragstart(drag(event));
});

var w_bar = document.getElementsByClassName('widget-bar');
var obj = w_bar[0].getElementsByClassName('draggable');
for(var i=0;i<obj.length;i++){
	(function(){
		obj[i].ondragstart = this.drag(event);
		
	})();
}

function allowDrop(ev){
	ev.preventDefault();
}
function drag(ev){
	ev.dataTransfer.setData("Text",ev.target.id);
}
function drop(ev){
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	ev.target.appendChild(document.getElementById(data));
}
