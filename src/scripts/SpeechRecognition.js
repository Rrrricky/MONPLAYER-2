//ANNYANG: JavaScript SpeechRecognition library

class SpeechRecognition {
  parse() {

    if (annyang) {
      const commands = {
        'Mozart': () => {
          console.log("Mozart")
          $artisticName.textContent = "Mozart"
          $musicTitle.textContent = "Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
          $sounds[0].currentTime = 0
          $warningText.style.display = "none"
          $body.style.cursor = "default"
          $introductiveText.classList.add("smoothTransition")
          $sounds[0].classList.add("selected")
          $sounds[1].classList.remove("selected")
          $sounds[2].classList.remove("selected")
          $currentDuration.innerHTML = "0:00"
          setTimeout(appearancePlayer, 500)
          $sounds[0].play()
          $sounds[1].pause()
          $sounds[2].pause()
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
          currentSound = $sounds[0]
        },
        'Beethoven': () => {
          console.log("Beethoven")
          $artisticName.textContent = "Beethov."
          $musicTitle.textContent = "Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
          $sounds[1].currentTime = 0
          $warningText.style.display = "none"
          $body.style.cursor = "default"
          $introductiveText.classList.add("smoothTransition")
          $sounds[1].classList.add("selected")
          $sounds[0].classList.remove("selected")
          $sounds[2].classList.remove("selected")
          $currentDuration.innerHTML = "0:00"
          setTimeout(appearancePlayer, 500)
          $sounds[1].play()
          $sounds[0].pause()
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
          currentSound = $sounds[1]
        },
        'Bach': () => {
          console.log("Bach")
          $artisticName.textContent = "Bach"
          $musicTitle.textContent = "Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
          $sounds[2].currentTime = 0
          $warningText.style.display = "none"
          $body.style.cursor = "default"
          $introductiveText.classList.add("smoothTransition")
          $sounds[2].classList.add("selected")
          $sounds[0].classList.remove("selected")
          $sounds[1].classList.remove("selected")
          $currentDuration.innerHTML = "0:00"
          setTimeout(appearancePlayer, 500)
          $sounds[2].play()
          $sounds[0].pause()
          $sounds[1].pause()
          $pausedButton.classList.remove("hide")
          $playButton.style.display = "none"
          currentSound = $sounds[2]
        },
        'Pause': () => {
          console.log("Pause")
          for (let i = 0; i < $sounds.length; i++) {
            if (!($sounds[i].paused)) {
              playAndPause()
            }
          }
        },
        'Arrêt': () => {
          console.log("Arrêt")
          for (let i = 0; i < $sounds.length; i++) {
            if (!($sounds[i].paused)) {
              playAndPause()
            }
          }
        },
        'Play': () => {
          console.log("Play")
          if ($sounds[0].paused && $sounds[1].paused && $sounds[2].paused) {
            playAndPause()
            $body.style.cursor = "default"
            $introductiveText.classList.add("smoothTransition")
            $warningText.style.display = "none"
            setTimeout(appearancePlayer, 500)
          }
        },
        'Lecture': () => {
          console.log("Lecture")
          if ($sounds[0].paused && $sounds[1].paused && $sounds[2].paused) {
            playAndPause()
            $body.style.cursor = "default"
            $introductiveText.classList.add("smoothTransition")
            $warningText.style.display = "none"
            setTimeout(appearancePlayer, 500)
          }
        },
        'Précédent': () => {
          console.log("Précédent")
          previousTrack()
        },
        'Previous': () => {
          console.log("Previous")
          nextTrack()
        },
        'Suivant': () => {
          console.log("Suivant")
          nextTrack()
        },
        'Next': () => {
          console.log("Next")
          nextTrack()
        },
        'Fortissimo': () => {
          for (let i = 0; i < $sounds.length; i++) {
            $sounds[i].volume = 1
            $volume.style.transform = "rotate(180deg)"
          }
        },
        'Pianissimo': () => {
          for (let i = 0; i < $sounds.length; i++) {
            $sounds[i].volume = .2
            $volume.style.transform = "rotate(-35deg)"
          }
        }
      }


      //Add the commands to annyang
      annyang.addCommands(commands)


      //Start listening
      annyang.start()
    }


    //If speech recognition is not supported
    if (!annyang) {
      $title.textContent = "I could here you"
      $subtitle.textContent = "(if you used Chrome)"
      $subtitle.style.fontSize = "25px"
      document.querySelector(".warningText p").textContent = "Click anywhere to continue"
      $help.style.display = "none"
    }



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

    const appearancePlayer = () => {
      $mainInterface.classList.remove("hidden")
      $introductiveText.style.display = "none" //Make the text disappear after the smooth transition
    }

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
    
  }
}