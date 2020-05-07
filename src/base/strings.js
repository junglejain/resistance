yaml = require('js-yaml');
fs = require('fs');

function Strings(){
    this.stringList = {};

    this.pronouns = {
        "male": {
            'they':     'he',
            'them':     'him',
            'their':    'his',
            'theirs':   'his',
            'themself': 'himself',
            'master':   'master',
        },
        "female": {
            'they':     'she',
            'them':     'her',
            'their':    'her',
            'theirs':   'hers',
            'themself': 'herself',
            'master':   'mistress'
        }
    };

    this.template = ['they', 'them', 'their', 'theirs', 'themself', 'master', 'name'];
}
Strings.prototype = {
    replace_gender: function(match, actor){
        if (match.indexOf('name') > -1) {
            return actor.Name;
        }
        match = match.slice(1);
        let replacer = this.pronouns[actor.PresentsAs][match.toLowerCase()];
        if (match.charAt(0) === match.charAt(0).toUpperCase()) {
            replacer = replacer.charAt(0).toUpperCase() + replacer.slice(1);
        }
        return replacer;
    },

    fmt_str: function(str, actor){
        for (let i = 0; i < 7; i++) {
            let template_pronoun = this.template[i];
            str = str.replace(new RegExp('\%('+template_pronoun+')','gi'), function(match){
                return Strings.prototype.replace_gender.call(new Strings(), match, actor);
            });
        }
        this.actor = null;
        return str;
    },

    byNumber: function(list, num){
        let keys = Object.keys(list);
        let i = 0;
        while (num > keys[i]){
            i++;
        }
        return list[keys[i]];
    },

    describe: function(actor){
        if (typeof(this.stringList['descriptions']) === 'undefined'){
            this.stringList['descriptions'] = yaml.safeLoad(fs.readFileSync('./data/strings/descriptions.yml', 'utf8'));
        }
        let ans = ['average', 'ugly', 'attractive'];
        let looks = "a "+actor.Looks;
        if (ans.includes(actor.Looks)){
            looks = "an "+actor.Looks;
            if (actor.Looks === 'average'){
                looks = looks + " looking";
            }
        }
        let desc = "<P>%name is "+looks+", "+actor.Skin+" skinned "+actor.Gender+" with "+actor.Hair+" hair and "+actor.Eyes+" eyes. ";
        desc = desc + this.byNumber(this.stringList['descriptions']['Fitness'], actor.Fitness.value);
        desc = desc + this.byNumber(this.stringList['descriptions']['Will'], actor.Will.value);
        return this.fmt_str(desc, actor);
    }
}

module.exports.Strings = Strings;