var toaster = (function () {
    function Toaster () {
        var that = this;

        function createDocuments () {
            var body = document.getElementsByTagName('body')[0];
            that.container = document.createElement('div');
            that.container.id = 'toaster-wrapper';
            body.appendChild(that.container);
            that.container = document.getElementById('toaster-wrapper');
        }

        function createTextNode () {
            that.textNode = document.createElement('p');
            that.textNode.innerHTML = 'Testidataa';
            that.textNode.id = 'toaster-textnode';
            that.container.appendChild(that.textNode);
            that.textNode = document.getElementById('toaster-textnode');
        }

        this.timeout = -1;
        this.opts = {};
        this.events = {};

        createDocuments();
        createTextNode();
        this.hide();
    }

    Toaster.prototype.setup = function (opts) {
        opts = opts || {};

        for (var parameter in opts) {
            if (opts.hasOwnProperty(parameter)) {
                this.opts[parameter] = opts[parameter];
            }
        }
    }

    Toaster.prototype.makeText = function (text, type, duration, callback) {
        var that = this;
        text = text || '';
        type = type || this.default;

        this.textNode.innerHTML = text;

        this.opts.duration = duration || this.opts.duration;
        this.show(callback);

        if (typeof type == 'function') {
            type.call(this);
        }

        if (typeof duration == 'function') {
            duration.call(this);
        } else if (typeof duration == 'number') {
            this.opts.duration = duration;
        }
    }

    Toaster.prototype.reset = function () {
        this.textNode.innerHTML = '';
        this.opts.duration = 2000;
        this.opts.type = this.success;
    }

    Toaster.prototype.show = function (callback) {
        var that = this;
        this.timeout = setTimeout(function () {
            that.hide();
            that.reset();
            that.emitEvent('hide');

            if (typeof callback == 'function') {
                callback.call(that);
            }
        }, that.opts.duration || 1000);

        this.textNode.className = 'toaster-visible';
        this.container.className = 'toaster-visible';
        this.emitEvent('show');
    }

    Toaster.prototype.hide = function () {
        if (this.timeout != -1) {
            clearTimeout(this.timeout);
            this.timeout = -1;
        }

        this.textNode.className = 'toaster-hidden';
        this.container.className = 'toaster-hidden';
    }

    Toaster.prototype.error = function () {
        this.textNode.className += ' error';
    }

    Toaster.prototype.success = function () {
        this.textNode.className += ' success';
    }

    Toaster.prototype.short = 2000;

    Toaster.prototype.long = 5000;

    Toaster.prototype.defineMessageType = function (type, term) {
        Toaster.prototype[type] = callback;
    }

    Toaster.prototype.defineMessageLength = function (name, length) {
        Toaster.prototype[name] = length;
    }

    Toaster.prototype.on = function (eventname, callback) {
        this.events[eventname] = this.events[eventname] || [];
        this.events[eventname].push(callback);
    }

    Toaster.prototype.emitEvent = function (eventname) {
        if (this.events[eventname]) {
            for (var i = 0; i < this.events[eventname].length; i++) {
                this.events[eventname][i].call(this);
            }
        }
    }

    return new Toaster();
}).call(this);
