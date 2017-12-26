//PLAYER

class Player {
  parse() {

    const appearancePlayer = () => {
      $mainInterface.classList.remove("hidden")
      $introductiveText.style.display = "none" //Make the text disappear after the smooth transition
    }

    //A loader gif every time a song stop for loading 
    let musicLoading = () => {
      for (let i = 0; i < $sounds.length; i++) {
        $sounds[i].addEventListener(
          "waiting",
          () => {
            $musicLoader.style.display = "block"
            console.log("waiting")
          }
        )
      }

      for (let i = 0; i < $sounds.length; i++) {
        $sounds[i].addEventListener(
          "playing",
          () => {
            $musicLoader.style.display = "none"
            console.log("loaded")
          }
        )
      }
    }
    musicLoading()


    //Click on the compositer's picture to play a song
    if (Modernizr.touchevents) {
      $covers[0].addEventListener(
        "touchstart",
        () => {
          $artisticName.textContent = "Mozart"
          $musicTitle.textContent = "Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
          $sounds[0].play()
          $sounds[0].classList.add("selected")
          $sounds[1].classList.remove("selected")
          $sounds[2].classList.remove("selected")
          $sounds[1].pause()
          $sounds[2].pause()
          $sounds[0].currentTime = 0 //Start the track from the beginning
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
          currentSound = $sounds[0]
        }
      )
    } else {
      $covers[0].addEventListener(
        "click",
        () => {
          $artisticName.textContent = "Mozart"
          $musicTitle.textContent = "Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
          $sounds[0].play()
          $sounds[0].classList.add("selected")
          $sounds[1].classList.remove("selected")
          $sounds[2].classList.remove("selected")
          $sounds[1].pause()
          $sounds[2].pause()
          $sounds[0].currentTime = 0 //Start the track from the beginning
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
          currentSound = $sounds[0]
        }
      )
    }

    if (Modernizr.touchevents) {
      $covers[1].addEventListener(
        "touchstart",
        () => {
          $artisticName.textContent = "Beethov."
          $musicTitle.textContent = "Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
          $sounds[1].play()
          $sounds[1].classList.add("selected")
          $sounds[0].classList.remove("selected")
          $sounds[2].classList.remove("selected")
          $sounds[0].pause()
          $sounds[2].pause()
          $sounds[1].currentTime = 0 //Start the track from the beginning
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
          currentSound = $sounds[1]
        }
      )
    } else {
      $covers[1].addEventListener(
        "click",
        () => {
          $artisticName.textContent = "Beethov."
          $musicTitle.textContent = "Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
          $sounds[1].play()
          $sounds[1].classList.add("selected")
          $sounds[0].classList.remove("selected")
          $sounds[2].classList.remove("selected")
          $sounds[0].pause()
          $sounds[2].pause()
          $sounds[1].currentTime = 0 //Start the track from the beginning
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
          currentSound = $sounds[1]
        }
      )
    }

    if (Modernizr.touchevents) {
      $covers[2].addEventListener(
        "touchstart",
        () => {
          $artisticName.textContent = "Bach"
          $musicTitle.textContent = "Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
          $sounds[2].play()
          $sounds[2].classList.add("selected")
          $sounds[1].classList.remove("selected")
          $sounds[0].classList.remove("selected")
          $sounds[0].pause()
          $sounds[1].pause()
          $sounds[2].currentTime = 0 //Start the track from the beginning 
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
          currentSound = $sounds[2]
        }
      )
    } else {
      $covers[2].addEventListener(
        "click",
        () => {
          $artisticName.textContent = "Bach"
          $musicTitle.textContent = "Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
          $sounds[2].play()
          $sounds[2].classList.add("selected")
          $sounds[1].classList.remove("selected")
          $sounds[0].classList.remove("selected")
          $sounds[0].pause()
          $sounds[1].pause()
          $sounds[2].currentTime = 0 //Start the track from the beginning 
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
          currentSound = $sounds[2]
        }
      )
    }

    //Press the spacebar to play/pause
    document.addEventListener(
      "keypress",
      (e) => {
        if (e.keyCode === 0 || e.keyCode === 32) {
          e.preventDefault()
          $body.style.cursor = "default"
          $introductiveText.classList.add("smoothTransition")
          $warningText.style.display = "none"
          playAndPause()
          setTimeout(appearancePlayer, 500)
        }
      }
    )

    //Keypress arrows to go back or further
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.keyCode === 39) { //Right key to go further
          console.log(currentSound.currentTime)
          e.preventDefault()
          currentSound.currentTime = currentSound.currentTime + 1
          console.log(currentSound.currentTime)
          const minutes = Math.floor((currentSound.currentTime) / 60)
          const seconds = Math.floor((currentSound.currentTime) % 60)
          if (seconds < 10) {
            $currentDuration.innerHTML = `${String(minutes)}:0${String(seconds)}`
          } else {
            $currentDuration.innerHTML = `${String(minutes)}:${String(seconds)}`
          }
        } else if (e.keyCode === 37) { //Left key to go back
          e.preventDefault()
          currentSound.currentTime = currentSound.currentTime - 1
          console.log(currentSound.currentTime)
          const minutes = Math.floor((currentSound.currentTime) / 60)
          const seconds = Math.floor((currentSound.currentTime) % 60)
          if (seconds < 10) {
            $currentDuration.innerHTML = `${String(minutes)}:0${String(seconds)}`
          } else {
            $currentDuration.innerHTML = `${String(minutes)}:${String(seconds)}`
          }
        }
      }
    )


    //Get the total duration of the track
    let refreshDurate = () => {
      for (let i = 0; i < $sounds.length; i++) {
        $sounds[i].addEventListener(
          "playing", //When the media begins to play to prevent a "NaN"
          () => {
            const minutes = Math.floor(($sounds[i].duration) / 60)
            const seconds = Math.floor(($sounds[i].duration) % 60)
            $totalDuration.textContent = `${String(minutes)}:${String(seconds)}`
          }
        )
      }
    }

    refreshDurate()


    //The current timer refreshing during the lecture 
    let durate = () => {
      for (let i = 0; i < $sounds.length; i++) {
        if (!($sounds[i].paused)) {
          let minutes = Math.floor(($sounds[i].currentTime) / 60)
          let seconds = Math.floor(($sounds[i].currentTime) % 60)
          $seekBar.addEventListener(
            "click", //Refreshing with a click
            () => {
              const minutes = Math.floor(($sounds[i].currentTime) / 60)
              const seconds = Math.floor(($sounds[i].currentTime) % 60)
              if (seconds < 10) {
                $currentDuration.textContent = `${String(minutes)}:0${String(seconds)}`
              } else {
                $currentDuration.textContent = `${String(minutes)}:${String(seconds)}`
              }
            }
          )
          if (seconds < 10) { //Refreshing without a click
            $currentDuration.textContent = `${String(minutes++)}:0${String(seconds++)}`
          } else {
            $currentDuration.textContent = `${String(minutes++)}:${String(seconds++)}`
          }
        }
      }
    }

    setInterval(durate, 1000)
    durate()


    //Progression of the sick bar
    for (let i = 0; i < $sounds.length; i++) {
      $sounds[i].addEventListener(
        "timeupdate",
        () => {
          const ratio = $sounds[i].currentTime / $sounds[i].duration
          $fillBar.style.transform = `scaleX(${ratio})`
        }
      )
    }


    //Click on the seekbar 
    if (Modernizr.touchevents) {
      $seekBar.addEventListener(
        "touchstart",
        (event) => {
          event.touches[0].preventDefault()
          const ratio = (event.touches[0].clientX - $seekBar.offsetLeft + ($seekBar.offsetWidth / 2)) / $seekBar.offsetWidth
          /*clientX gives a value relative to where you click. But this valeur is offset compared to original margin. OffsetLeft allows to get the value of the offset relative to the page*/
          for (let i = 0; i < $sounds.length; i++) {
            const audioTime = ratio * $sounds[i].duration
            $sounds[i].currentTime = audioTime
            console.log(audioTime)
          }
        }
      )
    } else {
      $seekBar.addEventListener(
        "mousedown",
        (event) => {
          event.preventDefault()
          const ratio = (event.clientX - $seekBar.offsetLeft + ($seekBar.offsetWidth / 2)) / $seekBar.offsetWidth
          /*clientX gives a value relative to where you click. But this valeur is offset compared to original margin. OffsetLeft allows to get the value of the offset relative to the page*/
          for (let i = 0; i < $sounds.length; i++) {
            const audioTime = ratio * $sounds[i].duration
            $sounds[i].currentTime = audioTime
            console.log(audioTime)
          }
        }
      )
    }

    //Detect the mousedown on the volume button
    let isMousedown = false

    $volume.addEventListener(
      "mousedown",
      () => {
        isMousedown = true
      }
    )

    $volume.addEventListener(
      "mouseup",
      () => {
        isMousedown = false
        console.log(isMousedown)
      })


    //Make the big button movable according to the mousedown
    $volume.addEventListener(
      "mousemove",
      (event) => {
        event.preventDefault()
        const ratioX = event.clientX - $volume.offsetLeft
        const ratioY = event.clientY - $volume.offsetTop

        if (isMousedown && ratioX < 70 && ((ratioX - ratioY) > -50)) {
          $volume.style.transform = `rotate(${(ratioX-ratioY)}deg)`
          console.log(ratioX - ratioY)
          volumeDown()
        } else if (isMousedown && ratioX > 70 && ((ratioX + ratioY) < 180)) {
          $volume.style.transform = `rotate(${(ratioX+ratioY)}deg)`
          volumeUp()
        }
      }
    )


    //How to get the rotate value from a getPropertyValue [https://css-tricks.com/get-value-of-css-rotation-through-javascript/]
    let volumeUp = () => {
      for (let i = 0; i < $sounds.length; i++) {
        let getRotate = window.getComputedStyle($volume).getPropertyValue("transform")

        let values = getRotate.split('(')[1]
        values = values.split(')')[0]
        values = values.split(',')

        const a = values[0]
        const b = values[1]
        const c = values[2]
        const d = values[3]

        const scale = Math.sqrt(a * a + b * b)

        const sin = b / scale
        const angle = Math.round(Math.asin(sin) * (180 / Math.PI))

        $sounds[i].volume = (-angle) / 186 + .9
        if ($sounds[i].volume + .1 > 1) {
          $sounds[i].volume = 1
        }
      }
    }

    let volumeDown = () => {
      for (let i = 0; i < $sounds.length; i++) {
        let getRotate = window.getComputedStyle($volume).getPropertyValue("transform")

        let values = getRotate.split('(')[1]
        values = values.split(')')[0]
        values = values.split(',')

        const a = values[0]
        const b = values[1]
        const c = values[2]
        const d = values[3]

        const scale = Math.sqrt(a * a + b * b)

        const sin = b / scale
        const angle = Math.round(Math.asin(sin) * (180 / Math.PI))

        $sounds[i].volume = (angle + 49) / 186
        if ($sounds[i].volume - .1 < 0) {
          $sounds[i].volume = 0
        }
      }
    }


    //Click on the big play button
    if (Modernizr.touchevents) {
      $playButton.addEventListener(
        "touchstart",
        () => {
          playAndPause()
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
        }
      )
    } else {
      $playButton.addEventListener(
        "click",
        () => {
          playAndPause()
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
        }
      )
    }

    //Click on the pause button
    if (Modernizr.touchevents) {
      $pausedButton.addEventListener(
        "touchstart",
        () => {
          playAndPause()
          $pausedButton.classList.add("hide")
          $playButton.style.display = "block"
        }
      )
    } else {
      $pausedButton.addEventListener(
        "click",
        () => {
          playAndPause()
          $pausedButton.classList.add("hide")
          $playButton.style.display = "block"
        }
      )
    }

    //Click on the next button
    if (Modernizr.touchevents) {
      $nextButton.addEventListener(
        "touchstart",
        () => {
          nextTrack()
        }
      )
    } else {
      $nextButton.addEventListener(
        "click",
        () => {
          nextTrack()
        }
      )
    }

    //Click on the previous button
    if (Modernizr.touchevents) {
      $previousButton.addEventListener(
        "touchstart",
        () => {
          previousTrack()
        }
      )
    }
    $previousButton.addEventListener(
      "click",
      () => {
        previousTrack()
      }
    )


    //Play and pause according to which song is playing
    let playAndPause = () => {
      if (($track1.classList.contains("selected")) && (!($sounds[0].paused))) {
        $sounds[0].pause()
        $pausedButton.classList.add("hide")
        $playButton.style.display = "block"
      } else if (($track1.classList.contains("selected")) && (($sounds[0].paused))) {
        $sounds[0].play()
        $sounds[0].classList.add("selected")
        $sounds[1].classList.remove("selected")
        $sounds[2].classList.remove("selected")
        $pausedButton.classList.remove("hide")
        $playButton.style.display = "none"
      } else if (($track2.classList.contains("selected")) && (!($sounds[1].paused))) {
        $sounds[1].pause()
        $pausedButton.classList.add("hide")
        $playButton.style.display = "block"
      } else if (($track2.classList.contains("selected")) && (($sounds[1].paused))) {
        $sounds[1].play()
        $sounds[1].classList.add("selected")
        $sounds[0].classList.remove("selected")
        $sounds[2].classList.remove("selected")
        $pausedButton.classList.remove("hide")
        $playButton.style.display = "none"
      } else if (($track3.classList.contains("selected")) && (!($sounds[2].paused))) {
        $sounds[2].pause()
        $pausedButton.classList.add("hide")
        $playButton.style.display = "block"
      } else if (($track3.classList.contains("selected")) && (($sounds[2].paused))) {
        $sounds[2].play()
        $sounds[2].classList.add("selected")
        $sounds[0].classList.remove("selected")
        $sounds[1].classList.remove("selected")
        $pausedButton.classList.remove("hide")
        $playButton.style.display = "none"
      } else {
        $sounds[0].play()
        currentSound = $sounds[0]
        $sounds[0].classList.add("selected")
        $sounds[1].classList.remove("selected")
        $sounds[2].classList.remove("selected")
        $pausedButton.classList.remove("hide")
        $playButton.style.display = "none"
      }
    }


    //If you clicked on the next button
    const nextTrack = () => {
      if (($track1.classList.contains("selected")) && (!($sounds[0].paused))) {
        $sounds[0].pause()
        $sounds[1].play()
        $sounds[0].classList.remove("selected")
        $sounds[1].classList.add("selected")
        $sounds[1].currentTime = 0
        refreshDurate()
        $artisticName.textContent = "Beethov."
        $musicTitle.textContent = "Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
        $currentDuration.innerHTML = "0:00"
        currentSound = $sounds[1]
      } else if (($track1.classList.contains("selected")) && (($sounds[0].paused))) {
        $sounds[0].classList.remove("selected")
        $sounds[1].classList.add("selected")
        $sounds[1].currentTime = 0
        $currentDuration.innerHTML = "0:00"
        const minutes = Math.floor(($sounds[1].duration) / 60)
        const seconds = Math.floor(($sounds[1].duration) % 60)
        $totalDuration.innerHTML = `${String(minutes)}:${String(seconds)}`
        $artisticName.textContent = "Beethov."
        $musicTitle.textContent = "Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
        currentSound = $sounds[1]
      } else if (($track2.classList.contains("selected")) && (!($sounds[1].paused))) {
        $sounds[1].pause()
        $sounds[2].play()
        $sounds[1].classList.remove("selected")
        $sounds[2].classList.add("selected")
        $sounds[2].currentTime = 0
        $currentDuration.innerHTML = "0:00"
        refreshDurate()
        $artisticName.textContent = "Bach"
        $musicTitle.textContent = "Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
        currentSound = $sounds[2]
      } else if (($track2.classList.contains("selected")) && (($sounds[1].paused))) {
        $sounds[1].classList.remove("selected")
        $sounds[2].classList.add("selected")
        $sounds[2].currentTime = 0
        $currentDuration.innerHTML = "0:00"
        const minutes = Math.floor(($sounds[2].duration) / 60)
        const seconds = Math.floor(($sounds[2].duration) % 60)
        $totalDuration.innerHTML = `${String(minutes)}:${String(seconds)}`
        $artisticName.textContent = "Bach"
        $musicTitle.textContent = "Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
        currentSound = $sounds[2]
      } else if (($track3.classList.contains("selected")) && (!($sounds[2].paused))) {
        $sounds[2].pause()
        $sounds[0].play()
        $sounds[2].classList.remove("selected")
        $sounds[0].classList.add("selected")
        $sounds[0].currentTime = 0
        $currentDuration.innerHTML = "0:00"
        refreshDurate()
        $artisticName.textContent = "Mozart"
        $musicTitle.textContent = "Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
        currentSound = $sounds[0]
      } else if (($track3.classList.contains("selected")) && (($sounds[2].paused))) {
        $sounds[2].classList.remove("selected")
        $sounds[0].classList.add("selected")
        $sounds[0].currentTime = 0
        $currentDuration.innerHTML = "0:00"
        const minutes = Math.floor(($sounds[0].duration) / 60)
        const seconds = Math.floor(($sounds[0].duration) % 60)
        $totalDuration.innerHTML = `${String(minutes)}:${String(seconds)}`
        $artisticName.textContent = "Mozart"
        $musicTitle.textContent = "Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
        currentSound = $sounds[0]
      }
    }


    //If you clicked on the previous button
    const previousTrack = () => {
      if (($track1.classList.contains("selected")) && (!($sounds[0].paused))) {
        $sounds[0].pause()
        $sounds[2].play()
        $sounds[0].classList.remove("selected")
        $sounds[2].classList.add("selected")
        $sounds[2].currentTime = 0
        $currentDuration.innerHTML = "0:00"
        refreshDurate()
        $artisticName.textContent = "Bach"
        $musicTitle.textContent = "Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
        currentSound = $sounds[2]
      } else if (($track1.classList.contains("selected")) && (($sounds[0].paused))) {
        $sounds[0].classList.remove("selected")
        $sounds[2].classList.add("selected")
        $sounds[2].currentTime = 0
        $currentDuration.textContent = "0:00"
        const minutes = Math.floor(($sounds[2].duration) / 60)
        const seconds = Math.floor(($sounds[2].duration) % 60)
        $totalDuration.textContent = `${String(minutes)}:${String(seconds)}`
        $artisticName.textContent = "Bach"
        $musicTitle.textContent = "Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
        currentSound = $sounds[2]
      } else if (($track2.classList.contains("selected")) && (!($sounds[1].paused))) {
        $sounds[1].pause()
        $sounds[0].play()
        $sounds[1].classList.remove("selected")
        $sounds[0].classList.add("selected")
        $sounds[0].currentTime = 0
        $currentDuration.textContent = "0:00"
        $artisticName.textContent = "Mozart"
        $musicTitle.textContent = "Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
        refreshDurate()
        currentSound = $sounds[0]
      } else if (($track2.classList.contains("selected")) && (($sounds[1].paused))) {
        $sounds[1].classList.remove("selected")
        $sounds[0].classList.add("selected")
        $sounds[0].currentTime = 0
        $currentDuration.textContent = "0:00"
        const minutes = Math.floor(($sounds[0].duration) / 60)
        const seconds = Math.floor(($sounds[0].duration) % 60)
        $totalDuration.textContent = `${String(minutes)}:${String(seconds)}`
        $artisticName.textContent = "Mozart"
        $musicTitle.textContent = "Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
        currentSound = $sounds[0]
      } else if (($track3.classList.contains("selected")) && (!($sounds[2].paused))) {
        $sounds[2].pause()
        $sounds[1].play()
        $sounds[2].classList.remove("selected")
        $sounds[1].classList.add("selected")
        $sounds[1].currentTime = 0
        $currentDuration.textContent = "0:00"
        refreshDurate()
        $artisticName.textContent = "Beethov."
        $musicTitle.textContent = "Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
        currentSound = $sounds[1]
      } else if (($track3.classList.contains("selected")) && (($sounds[2].paused))) {
        $sounds[2].classList.remove("selected")
        $sounds[1].classList.add("selected")
        $sounds[1].currentTime = 0
        $currenttextContent = "0:00"
        const minutes = Math.floor(($sounds[1].duration) / 60)
        const seconds = Math.floor(($sounds[1].duration) % 60)
        $totalDuration.textContent = `${String(minutes)}:${String(seconds)}`
        $artisticName.textContent = "Beethov."
        $musicTitle.textContent = "Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
        currentSound = $sounds[1]
      }
    }


    //When each song ends
    $sounds[0].addEventListener(
      "ended",
      () => {
        $sounds[0].pause()
        $sounds[1].currentTime = 0
        $sounds[1].play()
        $sounds[0].classList.remove("selected")
        $sounds[1].classList.add("selected")
        $artisticName.textContent = "Beethov."
        $musicTitle.textContent = "Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
        $currentDuration.innerHTML = "0:00"
        currentSound = $sounds[1]
      }
    )

    $sounds[1].addEventListener(
      "ended",
      () => {
        $sounds[1].pause()
        $sounds[2].currentTime = 0
        $sounds[2].play()
        $sounds[1].classList.remove("selected")
        $sounds[2].classList.add("selected")
        $artisticName.textContent = "Bach"
        $musicTitle.textContent = "Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
        $currentDuration.innerHTML = "0:00"
        currentSound = $sounds[2]
      }
    )

    $sounds[2].addEventListener(
      "ended",
      () => {
        $sounds[2].pause()
        $sounds[0].currentTime = 0
        $sounds[0].play()
        $sounds[2].classList.remove("selected")
        $sounds[0].classList.add("selected")
        $artisticName.textContent = "Mozart"
        $musicTitle.textContent = "Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
        $currentDuration.innerHTML = "0:00"
        currentSound = $sounds[0]
      }
    )


    //When the mouse is on the "?" button
    $help.addEventListener(
      "mouseover",
      () => {
        TweenMax.to($indications, .2, {
          display: "block",
          scale: 1,
          opacity: 1,
          transformOrigin: "top right",
        })
      }
    )

    //When the mouse leaves the "?" button
    $help.addEventListener(
      "mouseleave",
      () => {
        TweenMax.to($indications, .2, {
          autoAlpha: 0, //autoAlpha only to remove an element
          scale: 0,
          onComplete: () => {
            TweenMax.to($indications, .2, {
              display: "none",
              clearProps: "all"
            })
          }
        })
      }
    )

  }
}