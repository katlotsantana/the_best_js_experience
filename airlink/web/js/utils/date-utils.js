(function( window ) {

    //-----------------------------------------------------------------
    // Class info
    //-----------------------------------------------------------------
    window.com = window.com || {};
    window.com.utils = window.com.utils || {};

    com.utils.DateUtils = new function() {

        //-----------------------------------------------------------------
        // Method
        //-----------------------------------------------------------------
        /** 
         * Compare date format String
         * 
         * @return -1:date1 is future, 0:same date, 1:date2 is future
         */
        this.compareDate = function( date1, date2 ) {
            var date1Obj = this.createDate( date1 );
            var date2Obj = this.createDate( date2 );
            var retval = this.compareDateObj( date1Obj, date2Obj );
            return retval;
        };

        /**
         * get number of Date between date 1 and date 2
         * @param date1
         * @param date2
         * @returns {number}
         */
        this.getDiffDate = function (date1, date2) {
            var that = this;

            var date1Obj = that.createDate( date1 );
            var date2Obj = that.createDate( date2 );

            return Math.abs(date1Obj - date2Obj)/86400000;
        };

        /** 
         * Compare date format Date class
         * 
         * @return -1:date1 is future, 0:same date, 1:date2 is future
         */
        this.compareDateObj = function( date1Obj, date2Obj ) {

            var retval = -99;
            if ( date1Obj != null && date2Obj != null ) {

                if ( date1Obj > date2Obj ) {
                    retval = -1;
                } else if ( date1Obj < date2Obj ) {
                    retval = 1;
                } else {
                    retval = 0;
                }

            } else {}

            return retval;
        };

        /** 
         * Check date of past date.
         * 
         * @param checkDate check date
         * @return true: past date, false
         */
        this.isPastDate = function( checkDate ) {

            var retval = false;

            var today = _createToday();
            var check = this.createDate( checkDate );
            if ( check < today ) {
                // past date
                retval = true;
            } else {
                // future date
                retval = false;
            }

            return retval;
        };

        /** 
         * Check date of past date.
         * 
         * @param checkDate check date
         * @return true: past date, false
         */
        this.isFutureDate = function( checkDate ) {

            var retval = false;

            var today = _createToday();
            var check = this.createDate( checkDate );
            if ( today < check ) {
                // future date
                retval = true;
            } else {
                // past date or same date
                retval = false;
            }

            return retval;
        };

        /** 
         * Check date of nearly date.
         * 
         * @param checkDate check date
         * @return true: past date, false
         */
        this.isNearlyDate = function( checkDate, offset ) {

            var retval = false;

            var check = this.createDate( checkDate );
            var nearly = this.createOffsetDate2( _createToday(), offset );
            if ( check < nearly ) {
                // nearly date
                retval = true;
            } else {
                // not nearly date
                retval = false;
            }

            return retval;
        };

        /** 
         * Check enable date or not
         * If invalid date is specified, date is adjust of offset.
         * (EX) 2/31 => 3/3 (offset = 3day)
         *
         * @param yy year
         * @param mm month
         * @param dd date
         * @return true:OK, 
         *         false:Error (ex)2099/02/31
         */
        this.isEnableDate = function( yy, mm, dd ) {

            var retval = true;
            var srcYY = parseInt(yy);
            var srcMM = parseInt(mm - 1);
            var srcDD = parseInt(dd);
            
            var checkDate = new Date( srcYY, srcMM, srcDD );

            var checkYY = checkDate.getFullYear();
            var checkMM = checkDate.getMonth();
            var checkDD = checkDate.getDate();
            if ( srcYY !=  checkYY) {
                retval = false;
            } else if ( srcMM != checkMM ) {
                retval = false;
            } else if ( srcDD != checkDD ) {
                retval = false;
            } else {}

            return retval;
        };

        /** 
         * Create offset date
         * 
         * @param offset
         */
        this.createOffsetDate = function( offset ) {
            var today = _createToday();
            var offsetDate = this.createOffsetDate2( today, offset );
            return offsetDate;
        };

        /** 
         * Date str to date class
         * 
         * @param date str
         * @return date object
         */
        this.createDate = function( date ) {

            var dateObj = null;
            if ( date != null && date.length == 8 ) {

                var yy = parseInt( date.substr( 0, 4 ) );
                var mm = parseInt( date.substr( 4, 2 ) ) - 1;
                var dd = parseInt( date.substr( 6, 2 ) );
    
                dateObj = new Date( yy, mm, dd );

            } else {}
        
            return dateObj;
        };

        /** 
         * Date class to date str(yyyyMMdd)
         */
        this.createDateStr = function( date ) {

            var retval = null;
            if ( date != null ) {

                var yy = date.getFullYear();
                var mm = date.getMonth() + 1;
                var dd = date.getDate();

                var yyStr = ('0000' + yy).slice(-4);
                var mmStr = ('00' + mm).slice(-2);
                var ddStr = ('00' + dd).slice(-2);

                retval = yyStr + mmStr + ddStr;

            } else {}

            return retval;
        };

        //-----------------------------------------------------------------
        // private
        //-----------------------------------------------------------------
        /** 
         * Create today(2014/12/31 00:00:00) object
         * 
         */
        var _createToday = function() {
            var current = new Date();
            var today = new Date( current.getFullYear(), current.getMonth(), current.getDate(), 0, 0, 0 );
            return today;
        };

        /** 
         * create offset date.
         * 
         * @param offset offset date
         */
        this.createOffsetDate2 = function( date, offset ) {
            var basetime = date.getTime();
            var offsettime = offset * 1000 * 60 * 60 * 24;
            return new Date( offsettime + basetime );
        };

    };

}) (window);

