var properties = require(__dirname+'/../properties/properties');
var CryptoJS = require('crypto-js');

exports.get_hash = function(uid) {
    var d = new Date();
    var present_salt = d.getUTCDate()+d.getUTCHours().toString();
    console.log("present-salt for "+uid+": "+present_salt);
    present_hash = CryptoJS.SHA256(CryptoJS.MD5(properties.esup.users_secret).toString()+uid+present_salt).toString();  
    return present_hash;
}

exports.is_admin = function(user){
    var result = false;
    if(properties.esup.admins.includes(user.uid)) {
	result=true;
    }
    if(!result && properties.esup.admins_attributes && user.attributes) {
	for(attr in properties.esup.admins_attributes) {
	    if(user.attributes[attr] && user.attributes[attr].includes(properties.esup.admins_attributes[attr])) {
		result=true;
		break;
	    }
	}
    }
    return result;
}

exports.is_manager = function(user){
    var result = false;
    if(properties.esup.managers.includes(user.uid)) {
	result=true;
    }
    if(!result && properties.esup.managers_attributes && user.attributes) {
	for(attr in properties.esup.managers_attributes) {
	    if(user.attributes[attr] && user.attributes[attr].includes(properties.esup.managers_attributes[attr])) {
		result=true;
		break;
	    }
	}
    }
    return result;
}
