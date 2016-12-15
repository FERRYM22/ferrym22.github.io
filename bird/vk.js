
var user = {
	name:'',
	getName: function()
	{
       VK.api('users.get',{'fields': 'photo_50,first_name'},function(data){
       	name = data.response[0].first_name; });
       return this.name;
	}
};
