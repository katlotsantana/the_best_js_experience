;(function( window ) {

    //-----------------------------------------------------------------
    // Class info
    //-----------------------------------------------------------------
    window.com = window.com || {};
    window.com.utils = window.com.utils || {};

    com.utils.SessionStorageUtils = new function() {

        var _storage = null;
        try {
//          _storage = window.sessionStorage;
            _storage = (function(){ return window.sessionStorage; })();
        } catch ( e ) {
            // security error.
            // some of browser trigger error of set sessionStorage to variable.
        }

        //-------------------------------------------------------------------
        // Consts
        //-------------------------------------------------------------------
        this.KEY_SEARCH_CONDITION = "SessionStorageKey_SearchCondition";

        //-------------------------------------------------------------------
        // Methods
        //-------------------------------------------------------------------
        /**
         * Store data to session storage
         *
         * @param key storage_key
         * @param value
         */
        this.storeData = function( key, value ) {

            if ( !_storage ) {
                return;
            } else {}

            var jsonStr = JSON.stringify( value );
            try {
                _storage.setItem( key, jsonStr );
            } catch ( e ) {

            }

        };

        /**
         * Get data from session storage.
         *
         * @param key storage_key
         * @return object
         */
        this.getData = function( key ) {

            var retval = null;
            if ( !_storage ) {
                return retval;
            } else {}

            try {
                var jsonStr = _storage.getItem( key );
                retval = JSON.parse( jsonStr );
            } catch ( e ) {
                retval = null;
            }

            return retval;
        };

        /**
         * Clear data from session storage.
         *
         * @param key storage_key
         */
        this.clearData = function( key ) {

            if ( !_storage ) {
                return;
            } else {}

            try {
                _storage.removeItem( key );
            } catch ( e ) {
                
            }

        };

    };

} )( window );
