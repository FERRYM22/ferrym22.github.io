// get VK API	
var getUserName = function() {
VK.api('users.get',{'fields': 'photo_50'},function(data){
	name = data.response[0].first_name;
	urlPhoto = data.response[0].photo_50;
	
});
};

var getAva = function(ss) {
	var Avatar = game.newImageObject({
             file: ss,
             x:5 , y:5
             });
	Avatar.draw();
	brush.drawText({
			x : 60,
			y : 5,
			text : name,
			size : 20,
			color : 'white',
			font : 'myFont',
		});
};
