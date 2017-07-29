options={
    icons:{
            time: 'glyphicon glyphicon-time',
            date: 'glyphicon glyphicon-calendar',
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down',
            previous: 'glyphicon glyphicon-chevron-left',
            next: 'glyphicon glyphicon-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash',
            close: 'glyphicon glyphicon-remove'
        },
    format:false,
    dayViewHeaderFormat:'MMMM YYYY',
    extraFormats:false,
    stepping:1,
    minDate:false,
    maxDate:false,
    useCurrent:true,
    collapse:true,
    locale:moment.locale(),
    defaultDate:false,
    disabledDates:false,
    enabledDates:false,
    useStrict:false,
    sideBySide:false,
    daysOfWeekDisabled:[],//Accepts: array of numbers from 0-6
    calendarWeeks:flase,
    viewMode:'days',
    toolbarPlacement:'default',//Accepts: 'default', 'top', 'bottom'
    showTodayButton:false,//Show the "Today" button in the icon toolbar.
    showClear:false,//Show the "Clear" button in the icon toolbar.
    showClose:false,//Show the "Close" button in the icon toolbar.
    widgetPositioning: {horizontal: 'auto',vertical: 'auto'},//Accepts: object with the all or one of the parameters abovehorizontal: 'auto', 'left', 'right'vertical: 'auto', 'top', 'bottom'
    widgetParent:null,//Accepts: string or jQuery object
    keepOpen:false,//Will cause the date picker to stay open after selecting a date if no time components are being used.
    inline:false,//Will display the picker inline without the need of a input field. This will also hide borders and shadows.
    keepInvalid:false,//Will cause the date picker to not revert or overwrite invalid dates.
    keyBinds:{
        up: function (widget) {
            if (widget.find('.datepicker').is(':visible')) {
                this.date(this.date().clone().subtract(7, 'd'));
            } else {
                this.date(this.date().clone().add(1, 'm'));
            }
        },
        down: function (widget) {
            if (!widget) {
                this.show();
            }
            else if (widget.find('.datepicker').is(':visible')) {
                this.date(this.date().clone().add(7, 'd'));
            } else {
                this.date(this.date().clone().subtract(1, 'm'));
            }
        },
        'control up': function (widget) {
            if (widget.find('.datepicker').is(':visible')) {
                this.date(this.date().clone().subtract(1, 'y'));
            } else {
                this.date(this.date().clone().add(1, 'h'));
            }
        },
        'control down': function (widget) {
            if (widget.find('.datepicker').is(':visible')) {
                this.date(this.date().clone().add(1, 'y'));
            } else {
                this.date(this.date().clone().subtract(1, 'h'));
            }
        },
        left: function (widget) {
            if (widget.find('.datepicker').is(':visible')) {
                this.date(this.date().clone().subtract(1, 'd'));
            }
        },
        right: function (widget) {
            if (widget.find('.datepicker').is(':visible')) {
                this.date(this.date().clone().add(1, 'd'));
            }
        },
        pageUp: function (widget) {
            if (widget.find('.datepicker').is(':visible')) {
                this.date(this.date().clone().subtract(1, 'M'));
            }
        },
        pageDown: function (widget) {
            if (widget.find('.datepicker').is(':visible')) {
                this.date(this.date().clone().add(1, 'M'));
            }
        },
        enter: function () {
            this.hide();
        },
        escape: function () {
            this.hide();
        },
        'control space': function (widget) {
            if (widget.find('.timepicker').is(':visible')) {
                widget.find('.btn[data-action="togglePeriod"]').click();
            }
        },
        t: function () {
            this.date(moment());
        },
        'delete': function () {
            this.clear();
        }
    },//Allows for custom events to fire on keyboard press.
    debug:false,
    

}