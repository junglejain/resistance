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
            'themself': 'himself'
        },
        "female": {
            'they':     'she',
            'them':     'her',
            'their':    'her',
            'theirs':   'hers',
            'themself': 'herself'
        }
    };

    this.template = ['they', 'them', 'their', 'theirs', 'themself', 'name'];
}
Strings.prototype = {
    replace_gender: function(match, actor){
        if (match.indexOf('name') > -1) {
            return actor.Name;
        }
        replacer = this.pronouns[actor.PresentsAs][match];
        if (match.charAt(0) === match.charAt(0).toUpperCase()) {
            replacer = replacer.charAt(0).toUpperCase() + replacer.slice(1);
        }
        return replacer;
    },

    fmt_str: function(str, actor){
        for (let i = 0; i < 6; i++) {
            let template_pronoun = this.template[i];
            let replacer = this.replace_gender(template_pronoun, actor);
            str = str.replace(new RegExp('\%('+template_pronoun+')','gi'), replacer);
        }
        return str;
    },

    describe: function(actor){
        if (typeof(this.stringList['descriptions']) === 'undefined'){
            this.stringList['descriptions'] = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
        }
        let ans = ['average', 'ugly', 'attractive'];
        let looks = "a "+actor.Looks;
        if (ans.includes(actor.Looks)){
            looks = "an "+actor.Looks;
        }
        let desc = "%name is "+looks+", "+actor.Skin+" skinned "+actor.Gender+" with "+actor.Hair+" hair and "+actor.Eyes+" eyes. ";

    }
}

module.exports.Strings = Strings;