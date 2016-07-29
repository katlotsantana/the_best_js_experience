(function( window, undefined ) {

    //-----------------------------------------------------------------
    // Class info
    //-----------------------------------------------------------------
    window.com = window.com || {};
    window.com.utils = window.com.utils || {};

    com.utils.CommonUtils = new function() {

        //-----------------------------------------------------------------
        // Property
        //-----------------------------------------------------------------
        /**
         * Get context path
         *
         * @return context path
         */
        Object.defineProperty( this, "serverRoot", {
            get: function() {
                return _createPath();
            }
        });

        /**
         * Get context path of ssl
         *
         * @return context path of ssl
         */
        Object.defineProperty( this, "secureServerRoot", {
            get: function() {
                return _createPath( true );
            }
        });

        /**
         * Create context path
         *
         * @param secureF SSL?
         * @return context path
         */
        var _createPath = function( secureF ) {
            var ll = window.location;
            var host = ll.host;
            var protocol = (secureF) ? 'https:' : ll.protocol;
            retval = protocol + "//" + host;
            return retval;
        };

        //-----------------------------------------------------------------
        // method
        //-----------------------------------------------------------------

        this.detectIE = function() {
            var ua = window.navigator.userAgent;

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
               // Edge (IE 12+) => return version number
               return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        };

        /**
         *
         * @returns userAgent is iPhone, iPad ?
         */
        this.isAppleDevice = function() {
            return navigator.userAgent.match(/(iPod|iPhone|iPad)/i);
        };

        /**
         * Check mobile device.
         */
        this.isMobile = function() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        };

        /**
         * Append cooma to str(numeric)
         */
        this.appendComma = function( str ) {
            if ( str == null || isNaN( str ) ) { return "0"; };
            return String(str).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        };

        /**
         * Create query map from url
         *
         * @return url query map
         */
        this.getURLQueryMap = function() {

            var retMap = null;
            var href = window.location.href;
            if ( href.indexOf('?') != -1 ) {
                var hrefArray = href.split('?');
                retMap = this.createQueryMap( hrefArray[1] );
            } else {
                retMap = {};
            }

            return retMap
        };

        /**
         * Create query map
         *
         * @param query object
         * @return map
         */
        this.createQueryMap = function( query ) {

            var map = {};

            var key = 0;
            var splitQuery = query.split('&');
            for ( key in splitQuery ) {

                var qq = splitQuery[key];
                var pp = qq.split('=');
                if ( pp.length == 1 ) {

                    if ( pp[0] != null && pp[0] != '' ) {
                        map[ pp[0] ] = null;
                    } else {}

                } else if ( pp.length == 2 ) {
                    map[ pp[0] ] = pp[1];
                } else {}

            }

            return map;
        },

        /**
         *
         */
        this.slice = function( items, sliceNum ) {

            var retval = [];
            if ( items != null && sliceNum <= items.length ) {

                var ii = sliceNum;
                var ll = items.length;
                for ( ii ; ii < ll ; ii++ ) {
                    retval.push( items[ii] );
                }

            } else {}

            return retval;
        };

        /**
         * create wrapper function of event handler.
         *
         * @param methodName method name
         * @param targetObj target of method owner
         * @return wrapper function
         */
        this.bind = function( methodName, targetObj ) {
            var t = targetObj;
            var f = targetObj[methodName];
            var retFunc = function() {
                return f.apply( t, arguments );
            };
            return retFunc;
        };

        /**
         * Deep copy Object
         *
         * @param source data source
         * @return copy object
         */
        this.deepCopyObject = function( source ) {
            return $.extend( true, {}, source );
        };

        /**
         * Deep copy Array
         *
         * @param source data source
         * @return copy object
         */
        this.deepCopyArray = function( source ) {
            return $.extend( true, [], source );
        };

        /**
         * Copy Object
         *
         * @param origin to copy
         * @param source data source
         */
        this.copyObject = function( origin, source ) {
            return $.extend( true, origin, source );
        };

        /**
         * Get int value.
         *
         * @param source data source
         * @return copy object
         */
        this.getIntValue = function( value ) {

            var retval = 0;
            if ( com.utils.StringUtils.hasValue(value) ) {
                value = value.replace( /,/g, '' );
                retval = parseInt(value);
            } else {}

            return retval;
        };

        /**
         * Append namespace and instance to window(=global variable).
         *
         * @param classRef class reference
         */
        this.createClassNamespace = function( classRef ) {

            var namespace = classRef.NAMESPACE || classRef.prototype.NAMESPACE;
            if ( namespace != null ) {
                var nsObj = this.createNamespace( namespace );
                var nn = classRef.NAME || classRef.prototype.NAME;
                nsObj[ nn ] = classRef;
            } else {}

        };

        /**
         * Create name space.
         *
         * @param namespace name space
         */
        this.createNamespace = function( namespace ) {

            var ns = null;
            var nsRef = null;
            var namespaces = (namespace) ? namespace.split(".") : [];
            var namespaceCount = namespaces.length;
            for ( var ii = 0 ; ii < namespaceCount ; ii++ ) {

                ns = namespaces[ii];
                if ( ii == 0 ) {
                    // root namespace
                    window[ns] = window[ns] || {};
                    nsRef = window[ns];
                } else {
                    // nest namespace
                    nsRef[ns] = nsRef[ns] || {};
                    nsRef = nsRef[ns];
                }

            }

            return nsRef;
        };

        /**
         * Create error object
         *
         * @param level
         * @param target component
         * @param message error message
         */
        this.createErrorObject = function( level, target, message ) {

            var retval = {};

            retval.level = level;
            retval.targetRef = target;
            retval.message = message;

            return retval;
        };

        /**
         *
         *
         */
        this.valueTo24Time = function( value ) {

            var mm = value % 60;
            var hh = Math.round( value / 60 - 0.5 );

            hh = ('00' + hh).slice(-2);
            mm = ('00' + mm).slice(-2);

            return hh + mm;
        };

        /**
         * For cushion function.
         * Candidate function is JSON.parse or $.parseJSON,
         * but we want to unify the function.
         */
        this.toJSON = function( str ) {
            return JSON.parse( str );
        };

        /**
         * For cushion function.
         * Candidate function is JSON.parse or $.parseJSON,
         * but we want to unify the function.
         */
        this.toStr = function( json ) {
            return JSON.stringify( json );
        };


        /**
         * Call copy command
         */
        this.executeCopy = function(){
            document.execCommand('copy');
        };

        /**
         * set pricing data to copy to clipboard, \t means tab key for pasting to excel
         * @param event: event when press button
         * @param selector: selector of tag contain data for copying
         */
        this.copyPricingToClipboard = function (event, selector) {
            var gross_amount = $(selector + " [copy_data_name='gross_amount']").attr('copy_data_value');
            var basic_fare = $(selector + " [copy_data_name='basic_fare']").attr('copy_data_value');
            var surcharge_yq = $(selector + " [copy_data_name='surcharge_yq']").attr('copy_data_value');
            var surcharge_yr = $(selector + " [copy_data_name='surcharge_yr']").attr('copy_data_value');
            var handling_fee = $(selector + " [copy_data_name='handling_fee']").attr('copy_data_value');
            var discount = $(selector + " [copy_data_name='discount']").attr('copy_data_value');
            var pricingData = gross_amount + '\t' + basic_fare + '\t' + surcharge_yq + '\t' + surcharge_yr + '\t' + handling_fee + '\t' + discount;
            this.copyToClipboard(event, pricingData);
        };

        /**
         * copy to clipboard function. support Chrome 42, Firefox 41, IE 9
         * @param event
         * @param text
         */
        this.copyToClipboard = function (event, text) {
            event.clipboardData.setData('text/plain', text);
        };

        this.getLocation = function(secureF) {
            var __path_filter__ = $('#__path_filter__').val() || '';
            return _createPath(secureF) + __path_filter__;
        };

        /**
         * convert a object to query Params that remove empty properties
         * and convert a not empty array to a string.
         * @param jsonObj
         * @param separator
         * @return url query string
         */
        this.toQueryParameters = function(jsonObj, separator) {
            var sep = separator ? separator : ',';
            var params = _.reduce(_.keys(jsonObj), function(memo, key) {
                if (_.isArray(memo[key])) {
                    memo[key] = memo[key].join(sep);
                }
                if (!_.isNumber(memo[key]) && _.isEmpty(memo[key]))
                    delete memo[key];
                return memo;
            }, $.extend(true, {}, jsonObj));
            return $.param(params);
        }

    };

})(window, undefined);
