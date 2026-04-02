## Custom v0.4 - AB Preference Test ##

* New AB Preference Test mode: compare two models head-to-head with A/B/Equal selection
* Added `ABTest.html` page with bilingual (EN/CN) instructions
* Extended `generate_config.py` to support `AB` test type with model name specification
* Extended `organize_audio_files.py` with `selected_models` parameter for AB pair selection
* AB mode auto-enables `RandomizeFileOrder` to prevent position bias
* Updated `beaqle.js` with ABTest.html routing in submit handler
* Updated README with comprehensive AB test documentation

## BeaqleJS v0.3 ##

* Add auto return option on switching items
* New "Preference" test class (AB testing)
* Many fixes to the WebAudioAPI-based fading, now working on most browsers
* Cleanup and extend the docs
* Validate user name in web service upload script


## BeaqleJS v0.2 ##

* WebAudioAPI is used for smooth fade in/out with Chromium based browsers
* Test results can be saved locally with a download button
* Improved web service script with better error handling
* Configurable test sequence randomization
* Participants can add comments before submission
* New python script to evaluate and plot a set of test results
* More detailed documentation
* Many other small bug fixes and improvements


## BeaqleJS v0.1 ##

First release at the Linux Audio Conference 2014.
