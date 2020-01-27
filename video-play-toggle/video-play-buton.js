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

  this.setActiveState = function(val) {
    if(typeof val === 'boolean') {
      this._activeState = val;
    } else if(val == undefined){
      this._activeState = false;
    } else {
      console.error('\'playing\' only accepts a boolean value - please provide a boolean value - this error message came from the "VideoPlayButton" class');
    }
  };

  this.setMute = function(val) {
    if(typeof val === 'boolean') {
      this._mute = val;
    } else if(val == undefined) {
      this._mute = true;
    } else {
      console.error('\'mute\' only accepts a boolean value - please provide a boolean value - this error message came from the "VideoPlayButton" class');
    }
  };

  this.getMute = function() {
    return this._mute;
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
    this.toggleActiveState();
    }.bind(this)
  );

  this.init = function() {
    this.setActiveState(props.playing || false);
    this.mute(props.mute);
    this.togglePlayPause();
    console.log('VideoPlayButton class instantiated :)');
    console.log('muted', this.getMute());
    console.log('playing', this.getActiveState());
  };

  this.init();

  return {
    play: this.play,
    pause: this.pause,
    toggle: this.toggleActiveState,
    mute: this.mute
  };

}


var playCTA = new VideoPlayButton({
  button: "#play-btn",
  video: "#myVideo",
  playing: false,
  mute: true
});


console.log('playCTA: ', playCTA);

})();



  