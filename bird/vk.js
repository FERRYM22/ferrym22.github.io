
var user = {
	name:'',
	getName: function()
	{
       VK.api('users.get',{'fields': 'photo_50'},function(data){
       	name = data.response[0].first_name; });
       return this.name;
	}
};
