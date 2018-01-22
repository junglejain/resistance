/*
    Using the International Fixed Calendar (13 months, four weeks of seven days -- 28 days each) with different names.
    Throw out Year Day and Leap Years, because easier math. Names are bastardized from Babylonian.  Standard 24hr day.

    Seasons are 91 days each (3 months, one week), starting with Spring, ending with winter:
        Spring          Nisanu 1    -   Dimuzu 7
        Summer          Dimuzu 8    -   Tisritum 14
        Autumn          Tisritum 15 -   Tebetum 21
        Winter          Tebetum 22  -   Makaru 28
*/

function Time(month = 1, day = 1, hour = 0, minute = 0){
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.year = Math.random() * (400) + 1000;

    this.month_names = {
        1:  'Nisanu',
        2:  'Aru',
        3:  'Simanu',
        4:  'Dimuzu',
        5:  'Abu',
        6:  'Ulu',
        7:  'Tisritum',
        8:  'Samna',
        9:  'Kislimu',
        10:  'Tebetum',
        11:  'Sabatu',
        12:  'Adaru',
        13:  'Makaru'
    };
}
Time.prototype = {

    set: function(name, value){
        if (this.hasOwnProperty(name)){
            this[name] = value;
        }
    },

    getSeason: function () {
        if (this.month <= 4){
            if (this.month === 4 && this.day > 7){
                return 'Summer';
            }
            return 'Spring';
        }
        if (this.month <= 7){
            if (this.month === 7 && this.day > 14){
                return 'Autumn';
            }
            return 'Summer';
        }
        if (this.month <= 10){
            if (this.month === 10 && this.day > 21){
                return 'Winter';
            }
            return 'Autumn';
        }
        return 'Winter';
    },

    toString: function () {
        ret_time = this.month_names[this.month]+' ';

        if (this.day === 1 || this.day === 21){
            ret_time += this.day+'st, ';
        }else if (this.day === 2 || this.day === 22){
            ret_time += this.day+'nd, ';
        }else if (this.day === 3 || this.day === 23){
            ret_time += this.day+'rd, ';
        }else {
            ret_time += this.day + 'th, ';
        }

        return ret_time + this.year + ' ' + ('0' + this.hour).slice(-2)+':'+('0' + this.minute).slice(-2);
    }

    addMinutes: function (minutes) {
        let adding = this.minute + Math.abs(minutes);
        if (adding > 59){
            this.addHours(Math.floor(adding / 60));
            this.minute = adding % 60;
        }
    },

    addHours: function (hours){
        let adding = this.hour + Math.abs(hours);
        if (adding > 23){
            this.addDays(Math.floor(adding / 24));
            this.hour = adding % 24;
        }
    },

    addDays: function (days){
        let adding = this.day + Math.abs(days);
        if (adding > 28){
            this.addMonths(Math.floor(adding / 28));
            this.day = adding % 28;
        }
    },

    addMonths: function (months){
        let adding = this.month + Math.abs(months);
        if (adding > 13){
            this.year += Math.floor(adding / 13);
            this.month = adding % 13;
        }
    }
};