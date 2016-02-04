# toaster.js
The javascript client library for showing simple messages (toasts) to user

## Installation
Just run `npm install toaster.js` in your project root to install toaster.js via npm.

## Usage
Include the both javascript and the css file in to your web page.

    <!DOCTYPE html>
    
    <html>
    
    <head>
    <link rel="stylesheet" type="text/css" href="toaster_folder/toaster.css"/>
    </head>
    
    <body>
    <button onclick="makeMyToast()">Click me!</button>
    </body>
    
    <script src="toaster_folder/toaster.js"></script> <!-- toaster script -->
    <script src="index.js"></script> <!-- your own scripts -->
    </html>

In your `index.js` define the `makeMyToast()` function to do something wild.

    function makeMyToast () {
        var text = 'This will be your wild toast!';
        toaster.makeText(text, toaster.error, toaster.short);
    }

You can also define callbacks for `onShow` and `onHide` events.

    toaster.on('show', function () {
        console.log('Toast is now visible.');
    });
    
    toaster.on('hide', function () {
        console.log('Toast is now hidden.');
    });
    
Of course you can also show and hide the toast manually using `toaster.show()` and `toaster.hide()` functions.

    window.addEventListener('keydown', function () {
        toaster.hide();
    });

### All methods

#### toaster.setup (opts)
Sets all the parameters given in the `opts` object to toaster´s parameters.

#### toaster.makeText (text, type, duration, callback)
Creates the toast where the text is the `text`. Type variable is actually a function which will be ran after the `toaster-visible` class is 
added to the element. There you can define what will be done to the elements (for maybe styling them by adding classes). 
`Duration` is just a plain number which represents the toast length in milliseconds. `Callback` will be called after the toast is gone.

You can define `type` variables to the toaster.js for easier use by using the `toaster.defineMessageType (type, term)` function.

#### toaster.reset ()
Sets all the parameters to the default values. Is automatically called after every toast if `toaster.opts.remember` flag is set to false.

#### toaster.show ()
Sets the toaster visible.

#### toaster.hide ()
Sets the toaster invisible.

#### toaster.error ()
Predefined message type representing the message type error. Is used in the `toaster.makeText (text, type, duration, callback)` as the `type` parameter.

#### toaster.short
It's just an ugly plain property `2000` and is used as a `duration` parameter in the `toaster.makeText (text, type, duration, callback)` function.

#### toaster.long
Another toaster's predefined property representing the value `5000`. Is used just to make 5 seconds long toasts.

#### toaster.defineMessageType (type, term)
Is used to define message type for the toaster for later simpler usage. See the example below.

Define in your `index.js` ...

    toaster.defineMessageType('myOwnMessageType', function () {
      this.textnode.class += ' myCssClass';
    });
    
    toaster.makeText('This is my toast!', toaster.myOwnMessageType, toaster.short);
    
... and in your own css file add the following rule.

    .myCssClass {
      width: 100%;
      height: 100%;
      padding: 100000px;
      color: rgba(14, 67, 45, 0.25);
    }
    
#### toaster.defineMessageLength (name, length)
Is used to define message length for the toaster for later simpler usage. See the example below.

Define in your `index.js` following lines

    toaster.defineMessageLength('mySuperLongMessage', 1000000);
    
    toaster.makeText('This is my toast!', toaster.success, toaster.mySuperLongMessage);
    
