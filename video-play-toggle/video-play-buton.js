(function() {

  function VideoPlayButton(props) {

    try {

      this.errorMessage = function(el, passedVal) {
        console.error('Yo! make sure that the element for the '+ el +' is properly referenced - I can\'t find what you\'ve provided. Have you accidentally passed an id or class attribute instead? - check the elements provided in the "VideoPlayButton" function call - You passed the value: '+ passedVal +'' );
      };

      this._playButton = document.querySelector(props.button);
      this._video = document.querySelector(props.video);
    
      if(this._playButton === null) {
        throw new Error(this.errorMessage('\'button\'', props.button));
      } else if(this._video === null ) {
        throw new Error(this.errorMessage('\'video\'', props.video));
      } 

    } catch(err) {
      return err;
    }

    this.setterErrorMessage = function(property) {
      console.error(property + ' only accepts a boolean value - please provide a boolean value - you passed the value: '+property+' => typeof: '+typeof property+' - this error message came from the "VideoPlayButton" class');
    };

    this.setActiveState = function(val) {
      if(typeof val === 'boolean') {
        this._activeState = val;
      } else if(val == undefined){
        this._activeState = false;
      } else {
        this.setterErrorMessage('playing');
      }
    };

    this.setMute = function(val) {
      if(typeof val === 'boolean') {
        this._mute = val;
      } else if(val == undefined) {
        this._mute = true;
      } else {
        this.setterErrorMessage('mute');
      }
    };

    this.getMute = function() {
      return this._mute;
    };


    this.setControls = function(val) {
      if(typeof val === 'boolean') {
        this._controls = val;
      } else if(val == undefined) {
        this._controls = true;
      } else {
        this.setterErrorMessage('controls');
      }
    };

    this.getControls = function() {
      return this._controls;
    };

    this.setHideOnPlay = function(val) {

      if(typeof val === 'boolean') {
        this._hideOnPlay = val;
      } else if(val == undefined) {
        this._hideOnPlay = false;
      } else {
        this.setterErrorMessage('hideOnPlay');
      }

    };

    this.getActiveState = function() {
      return this._activeState;
    };

    this.play = function() {
      this._video.play();
      this._playButton.innerHTML = 'Pause';
      this._playButton.classList.remove('paused');
      this._playButton.classList.add('playing');
    }.bind(this);

    this.pause = function() {
      this._video.pause();
      this._playButton.innerHTML = 'Play';
      this._playButton.classList.remove('playing');
      this._playButton.classList.add('paused');
    }.bind(this);

    this.mute = function(val) {
        this.setMute(val);
        this._video.muted = this.getMute();
    }.bind(this);

    this.controls = function(val) {
      this.setControls(val);
      this._video.controls = this.getControls();
  }.bind(this);

    this.togglePlayPause = function() {
      if(this._activeState) {
        this.play();
      } else {
        this.pause();
      }
    }.bind(this);

    this.toggleActiveState = function() {
      this.setActiveState(!this.getActiveState());
      this.togglePlayPause();
    }.bind(this);


    this._playButton.addEventListener("click", function() {
      if(this._hideOnPlay && !this._playButton.classList.contains('activated')) {
        this._playButton.classList.add('activated');
      }
      this.toggleActiveState();
      }.bind(this)
    );

    // add seperate event handlers when video element is clicked - start

    this._video.addEventListener("play", function() {
      this.play();
      }.bind(this)
    );

    this._video.addEventListener("pause", function() {
      this.pause();
      }.bind(this)
    );

      // add seperate event handlers when video element is clicked - end

    this.init = function() {
      this.setActiveState(props.playing || false);
      this.mute(props.mute);
      this.controls(props.controls);
      this.setHideOnPlay(props.hideOnPlay);
      this.togglePlayPause();
      console.log('VideoPlayButton class instantiated :)');
      console.log('muted', this.getMute());
      console.log('controls', this.getControls());
      console.log('playing', this.getActiveState());
    };

    this.init();

    return {
      play: this.play,
      pause: this.pause,
      toggle: this.toggleActiveState,
      mute: this.mute,
      controls: this.controls
    };

  }


  var playCTA = new VideoPlayButton({
    button: "#play-btn",
    video: "#myVideo",
    playing: false,
    mute: true,
    controls: true,
    hideOnPlay: true
  });


  console.log('playCTA: ', playCTA);

})();



  