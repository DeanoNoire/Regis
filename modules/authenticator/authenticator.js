'use strict'
var crypto = require('crypto')

module.exports = {

    authenticate : function(jsonPwd){
        var pswd = jsonPwd.pwd;
        if(pswd == '69420'){
                return 'Unlocked';
            }
        else if(pswd == '11111'){
                return 'Armed';
        }
        else {
            return 'Triggered';
        }
    }

}

