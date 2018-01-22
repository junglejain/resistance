function Attr(value = 0, changeDiff = 5, decayRate = 5, decayAmt = 1, normDown = true){
    this.value = value;
    this.mod = 0;
    this.tooltip = '';
    this.desc = '';

    this.last_use = 0;
    this.toChange = 0;
    this.changeDiff = changeDiff;
    this.decayRate = decayRate;
    this.normDown = normDown;
    this.decayAmt = decayAmt;
}
Attr.prototype = {
    set: function(val, mod = 0){
        this.value=val;
        this.mod = mod;
    },

    valueOf: function () {
        return this.value;
    },

    toString: function () {
        if (this.desc !== ''){
            return this.desc;
        }else{
            return this.value;
        }
    },

    roll: function (diff, high = true){
        let check = 0;
        if (high){
            check = this.value + this.mod - 50;
        }else{
            check = 50 - this.value + this.mod;
        }
        return Math.random() * 49 + 1 + check >= diff;
    },

    change: function(amt){
        this.last_use = 0;
        this.toChange += amt;
        if (this.toChange >= this.changeDiff){
            this.value += this.toChange / this.changeDiff;
            this.toChange = this.toChange % this.changeDiff;
        }else if (this.toChange <= this.changeDiff * -1){
            this.value -= Math.abs(this.toChange) / this.changeDiff;
            this.toChange = Math.abs(this.toChange) % this.changeDiff * -1;
        }
    },

    normalize: function(){
        this.last_use += 1;
        if (this.last_use >= this.decayRate){
            if (this.value > 50 || this.normDown){
                this.value -= this.decayAmt;
            }else if (this.value < 50){
                this.value += this.decayAmt;
            }
        }
    }
}

module.exports.Attr = Attr;
