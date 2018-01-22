function Preferences(){
    this.num_male = 100;
    this.num_cb = 50;
    this.num_herm = 25;
    this.num_futa = 25;
    this.num_dg = 50;
    this.num_female = 100;
}
Preferences.prototype = {
    set: function(name, value){
        if (this.hasOwnProperty(name)){
            this[name] = value;
        }
    },

    saveToDB: function(){
        let keys = Object.keys(this);
        for (let i = 0, len = keys.length; i < len; i++) {
            global.db.prefs.update(
                { name: keys[i] },
                { name: keys[i], value: this[keys[i]] },
                { upsert: true },
                function (err, numReplaced, upsert) {
                    if (err){
                        console.log(err);
                    }else{
                        console.log('Updated: '+keys[i]+' -> '+this[keys[i]]);
                    }
            });
        }
    }
}

module.exports.Preferences = Preferences;
