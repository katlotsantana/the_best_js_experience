(function( window ) {

    //-----------------------------------------------------------------
    // Class info
    //-----------------------------------------------------------------
    window.com = window.com || {};
    window.com.utils = window.com.utils || {};

    com.utils.RegexUtils = new function() {

        //-----------------------------------------------------------------
        // method
        //-----------------------------------------------------------------
        /**
         * Check Email.
         */
        this.isEmail = function( text ) {
             /*Below is the regex expression is from BootstrapValidator*/
//            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(text);
            return /^([A-Za-z0-9\-\_\.]+@[A-Za-z0-9]+((\.|\-)[A-Za-z0-9\-\_]+)*\.[A-Za-z0-9]{2,}$)/.test(text);
        };
    
        /**
         * Check number.
         */
        this.isNum = function( text ) {
            return /^[0-9]+$/.test(text);
        };
        /**
         * Check alphabet number.
         */
        this.isAlphabetNum = function( text ) {
            return /^[a-zA-Z0-9]*$/.test(text);
        };

        /** 
         * Check argument text is upper case alphabet?
         */
        this.isUpperCaseAlphabet = function( text ) {
            return /^[A-Z]*$/.test(text);
        };

        /**
         * Check argument text is upper case alphabet plus space?
         */
        this.isUpperCaseAlphabetPlusSpace = function( text ) {
            return /^[A-Z\s]*$/.test(text);
        };

        /** 
         * Check argument text is lower case alphabet?
         */
        this.isLowerCaseAlphabet = function( text ) {
            return /^[a-z]*$/.test(text);
        };

        /**
         * Check Two Space In Japanese
         */
        this.checkTwoSpaceInJapanese = function( text ) {
            if (text.indexOf('\u3000') != -1 ){
                return true;
            }
            return false;
        };

        /**
         * Split a String for auto complete suggestion.
         * @param text
         * @returns {Array}
         */
        this.splitNameSearch = function(text) {
            return text.split(/[\s\W]+/);
        };

    };

}) (window);
