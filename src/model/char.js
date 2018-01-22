Attr = require("./src/base/attribute.js").Attr;

function Char(prefs, char_id = 0, newRandom = true, gender = 'any', pc = false){
    if (typeof(global.skills) === 'undefined'){
        global.skills = require("./data/skills.json");
    }

    if (typeof(global.phys) === 'undefined'){
        global.phys = require("./data/phys.json");
    }

    /*  Physical Stuff  */

    if (newRandom){
        this.generate(gender, pc);
    }
}

Char.prototype = {
    byWeight: function (weights) {
        let index = 0;
        let total_weight = weights.reduce(function (prev, cur, i, arr) {
            return parseInt(prev) + parseInt(cur);
        });

        let random_num = Math.random() * total_weight;
        let weight_sum = 0;

        for (let i = 0; i < weights.length; i++) {
            weight_sum += parseInt(weights[i]);
            weight_sum = +weight_sum.toFixed(2);

            if (random_num <= weight_sum) {
                index = i;
                break;
            }
        }
        return index;
    },

    byNormalDist: function(min = 0, max = 1){
        let rand = 0;

        for (let i = 0; i < 6; i++) {
            rand += Math.random() * (max - min) + min;
        }

        if (min === 0 && max === 1){
            return Math.round((rand / 6) * 100);
        }else{
            return Math.round(rand / 6);
        }
    },

    randomName: function(){
        if (this.genderIndex > 2){
            return global.phys.femNames[Math.floor(Math.random()*global.phys.femNames.length)];
        }else{
            return global.phys.masNames[Math.floor(Math.random()*global.phys.masNames.length)];
        }
    },

    has: function(part){
        return this.part !== '';
    },

    generate: function (gender = 'any', pc = false){
        if (gender !== 'any' && global.phys.Gender.includes(gender)) {
            this.genderIndex = global.phys.Gender.indexOf(gender);
        }else{
            this.genderIndex = this.byWeight([prefs.num_male, prefs.num_cb, prefs.num_herm, prefs.num_futa, prefs.num_dg, prefs.num_female]);
        }
        this.Gender = global.phys.Gender[this.genderIndex];

        if (global.phys.male.includes(this.genderIndex)){
            this.Sex = 'male';
            this.Penis = global.phys.penisSize[this.byWeight(global.phys.penisWeights)];
            this.Balls = global.phys.ballSize[this.byWeight(global.phys.ballWeights)];
        }
        if (global.phys.female.includes(this.genderIndex)){
            this.Sex = 'female';
            this.Breasts = global.phys.breastSize[this.byWeight(global.phys.breastWeights)];
            this.Pussy = global.phys.pussySize[this.byWeight(global.phys.pussyWeights)];
        }
        if (global.phys.intersex.includes(this.genderIndex)){
            this.Sex = "intersex";
        }
        if (this.genderIndex > 2){
            this.PresentsAs = 'female';
        }else{
            this.PresentsAs = 'male';
        }

        this.Ass = global.phys.assSize[this.byWeight(global.phys.assWeights)];

        this.Looks = global.phys.looks[this.byWeight(global.phys.looksWeights)];
        this.Skin = global.phys.skin[this.byWeight(global.phys.skinWeights)];
        this.Hair = global.phys.hair[this.byWeight(global.phys.hairWeights)];
        this.Eyes = global.phys.eyes[this.byWeight(global.phys.eyesWeights)];

        this.Name = this.randomName();

        /*  Stats   */

        let stats = Object.keys(global.skills.Stats);
        for (i = 0; i < stats.length; i++){
            if (pc){
                this[stats[i]] = new Attr(50, 5, 5, 1, false);
            }else {
                let stat = this.byNormalDist(25, 75);
                this[stats[i]] = new Attr(stat, 5, 5, 1, false);
            }
            this[stats[i]].tooltip = global.skills.Stats[stats[i]];
        }

        /*  Hidden  */

        let hidden = Object.keys(global.skills.Hidden);
        for (i = 0; i < hidden.length; i++){
            this[hidden[i]] = new Attr(0, 1, 1, 25);
        }

        if (!pc) {
            let special = Object.keys(global.skills.Special);
            for (i = 0; i < special.length; i++){
                this[special[i]] = new Attr(0, 1, 5, 1);
            }
        }
    }
}
