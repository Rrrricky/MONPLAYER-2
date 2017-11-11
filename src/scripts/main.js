let $player = document.querySelector(".player")
const $introductiveText = $player.querySelector(".introductiveText")
const $artist = $player.querySelector(".introductiveText .subtitle .artistName")
const names = ['"Mozart"', '"Bach"', '"Beethoven"']
const $body = document.querySelector("body")
const $mainInterface = $player.querySelector(".mainInterface")
const $sounds = $player.querySelectorAll(".sounds audio")
const $track1 = $player.querySelector(".mozart")
const $track2 = $player.querySelector(".beethoven")
const $track3 = $player.querySelector(".bach")
const $artistList = $player.querySelector(".artistList")
const $seekBar = $player.querySelector(".seekBar")
const $covers = $player.querySelectorAll(".artistList div")
const $fillBar = $player.querySelector(".seekBar .fillBar")
const $volumeContainer = $player.querySelector(".volume")
const $volume = $volumeContainer.querySelector(".volumeButton")
const $totalDuration = $player.querySelector(".controls .totalDuration")
const $currentDuration = $player.querySelector(".controls .currentDuration")
const $warningText = document.querySelector(".warningText")
const $lectureControl = $player.querySelector(".mainButtons")
const $playButton = $lectureControl.querySelector(".playButton")
const $pausedButton = $lectureControl.querySelector(".pausedButton")
const $previousButton = $lectureControl.querySelector(".previousButton")
const $nextButton = $lectureControl.querySelector(".nextButton")
const $description = $player.querySelector(".controls .description")
const $artisticName = $description.querySelector(".artist")
const $musicTitle = $description.querySelector(".musicTitle")
const $help = $player.querySelector(".help")
const $indications = document.querySelector(".indications")
let $title = $introductiveText.querySelector(".title")
let $subtitle = $introductiveText.querySelector(".subtitle")
let currentSound = 0



//document.addEventListener( 
//  "DOMContentLoaded",//Ne prend pas encore le chargement d'images, donc à modifier.
//  ()=>{
//    $player.style.display="block"
//    document.querySelector(".loader").style.opacity="0"
//    setTimeout(disa, 600)
//  }
//)

const img = document.querySelector(".backgroundImage")
const newImg = document.createElement("img")

const endLoading=()=>{
  document.querySelector(".loader").style.display="none"
}
  
const backgroundLoader=()=>{
  newImg.addEventListener(
    "load",
    ()=>{
      $body.style.backgroundImage="url('"+newImg.src+"')"
      $player.style.display="block"
      document.querySelector(".loader").style.opacity="0"
      setTimeout(endLoading, 600)
    }
  )
  newImg.src=img.src
}

backgroundLoader()


let musicLoader = document.querySelector(".musicLoader")

for(let i=0;i<$sounds.length;i++){
  $sounds[i].addEventListener(
    "waiting",
    ()=>{
      musicLoader.style.display="block"
      console.log("waiting")
    }
  ) 
}

for(let i=0;i<$sounds.length;i++){
  $sounds[i].addEventListener(
    "playing",
    ()=>{
      musicLoader.style.display="none"
      console.log("done")
    }
  )
}



let appearanceMenu = () => {
  $mainInterface.classList.remove("hidden")
  $introductiveText.style.display = "none" //Make the text disappear after the smooth transition
}

//Skip the vocal experience by clicking anywhere on the page
$body.addEventListener(
  "click",
  ()=>{
      $body.style.cursor="default"
      $introductiveText.classList.add("smoothTransition")
      $warningText.style.display="none"
      setTimeout(appearanceMenu, 500)
  }
)


$body.addEventListener(
  "keypress",
  (e)=>{
      if (e.keyCode === 0 || e.keyCode === 32) {
      $body.style.cursor="default"
      $introductiveText.classList.add("smoothTransition")
      $warningText.style.display="none"
      setTimeout(appearanceMenu, 500)
    }
  }
)


//Animation when hover on an artist
let i=0
let nameChange=()=>{ 

  $artist.textContent=names[i]
      
  if(i<names.length){
      i++
      const fadein=()=>{$artist.classList.add("effect")}
      setTimeout(fadein, 0)
      const fadeout=()=>{$artist.classList.remove("effect")}
      setTimeout(fadeout, 1000)
  }else{
      i=0
      $artist.textContent=names[i]
      i++
      const fadein=()=>{$artist.classList.add("effect")}
      setTimeout(fadein, 0)
      const fadeout=()=>{$artist.classList.remove("effect")}
      setTimeout(fadeout, 1000)
    }
  }

setInterval(nameChange, 1200)
nameChange()



//Click on the compositer to play a song
$covers[0].addEventListener(
    "click",
    ()=>{
      $artisticName.textContent="Mozart"
      $musicTitle.textContent="Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
      $sounds[0].play()
      $sounds[0].classList.add("selected")
      $sounds[1].classList.remove("selected")
      $sounds[2].classList.remove("selected")
      $sounds[1].pause()
      $sounds[2].pause()
      $sounds[0].currentTime=0 //Start the track from the beginning
      $pausedButton.classList.remove("hide")
      $playButton.style.display="none"
      currentSound=$sounds[0]
  }
)

$covers[1].addEventListener(
    "click",
    ()=>{
      $artisticName.textContent="Beethov."
      $musicTitle.textContent="Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
      $sounds[1].play()
      $sounds[1].classList.add("selected")
      $sounds[0].classList.remove("selected")
      $sounds[2].classList.remove("selected")
      $sounds[0].pause()
      $sounds[2].pause()
      $sounds[1].currentTime=0 //Start the track from the beginning
      $pausedButton.classList.remove("hide")
      $playButton.style.display="none"
      currentSound=$sounds[1]
  }
)

$covers[2].addEventListener(
    "click",
    ()=>{
      $artisticName.textContent="Bach"
      $musicTitle.textContent="Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
      $sounds[2].play()
      $sounds[2].classList.add("selected")
      $sounds[1].classList.remove("selected")
      $sounds[0].classList.remove("selected")
      $sounds[0].pause()
      $sounds[1].pause()
      $sounds[2].currentTime=0 //Start the track from the beginning 
      $pausedButton.classList.remove("hide")
      $playButton.style.display="none"
      currentSound=$sounds[2]
  }
)

let playAndPause=()=>{
      if (($track1.classList.contains("selected")) && (!($sounds[0].paused))) {
        $sounds[0].pause()
        $pausedButton.classList.add("hide")
        $playButton.style.display="block"
      } else if (($track1.classList.contains("selected")) && (($sounds[0].paused))){
        $sounds[0].play()
        $sounds[0].classList.add("selected")
        $sounds[1].classList.remove("selected")
        $sounds[2].classList.remove("selected")
        $pausedButton.classList.remove("hide")
        $playButton.style.display="none"
      } else if (($track2.classList.contains("selected")) && (!($sounds[1].paused))) {
        $sounds[1].pause()
        $pausedButton.classList.add("hide")
        $playButton.style.display="block"
      } else if (($track2.classList.contains("selected")) && (($sounds[1].paused))) {
        $sounds[1].play()
        $sounds[1].classList.add("selected")
        $sounds[0].classList.remove("selected")
        $sounds[2].classList.remove("selected")
        $pausedButton.classList.remove("hide")
        $playButton.style.display="none"
      } else if (($track3.classList.contains("selected")) && (!($sounds[2].paused))) {
        $sounds[2].pause()
        $pausedButton.classList.add("hide")
        $playButton.style.display="block"
      } else if (($track3.classList.contains("selected")) && (($sounds[2].paused))) {
        $sounds[2].play()
        $sounds[2].classList.add("selected")
        $sounds[0].classList.remove("selected")
        $sounds[1].classList.remove("selected")
        $pausedButton.classList.remove("hide")
        $playButton.style.display="none"
      } else{
        $sounds[0].play()
        currentSound=$sounds[0]
        $sounds[0].classList.add("selected")
        $sounds[1].classList.remove("selected")
        $sounds[2].classList.remove("selected")
        $pausedButton.classList.remove("hide")
        $playButton.style.display="none"
      }
    }   

//Keybord
document.addEventListener(
  "keypress",
  (e) => {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault()
      playAndPause()}})
      






/***ANNYANG***/

if (annyang) {
var commands = {
    'Mozart': ()=>{
      console.log("Mozart")
      $artisticName.textContent="Mozart"
      $musicTitle.textContent="Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
      $sounds[0].currentTime=0
      $warningText.style.display="none"
      $body.style.cursor="default"
      $introductiveText.classList.add("smoothTransition")
      $sounds[0].classList.add("selected")
      $sounds[1].classList.remove("selected")
      $sounds[2].classList.remove("selected")
      $currentDuration.innerHTML = "0:00"
      setTimeout(appearanceMenu, 500)
      $sounds[0].play()
      $sounds[1].pause()
      $sounds[2].pause() 
      $pausedButton.classList.remove("hide")
      $playButton.style.display="none"
      currentSound=$sounds[0]
      },
    'Beethoven': ()=>{
      console.log("Beethoven")
      $artisticName.textContent="Beethov."
      $musicTitle.textContent="Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
      $sounds[1].currentTime=0
      $warningText.style.display="none"
      $body.style.cursor="default"
      $introductiveText.classList.add("smoothTransition")
      $sounds[1].classList.add("selected")
      $sounds[0].classList.remove("selected")
      $sounds[2].classList.remove("selected")
      $currentDuration.innerHTML = "0:00"
      setTimeout(appearanceMenu, 500)
      $sounds[1].play()
      $sounds[0].pause()
      $pausedButton.classList.remove("hide")
      $playButton.style.display="none"
      currentSound=$sounds[1]
      },
    'Bach': ()=>{
      console.log("Bach")
      $artisticName.textContent="Bach"
      $musicTitle.textContent="Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
      $sounds[2].currentTime=0
      $warningText.style.display="none"
      $body.style.cursor="default"
      $introductiveText.classList.add("smoothTransition")
      $sounds[2].classList.add("selected")
      $sounds[0].classList.remove("selected")
      $sounds[1].classList.remove("selected")
      $currentDuration.innerHTML = "0:00"
      setTimeout(appearanceMenu, 500)
      $sounds[2].play()
      $sounds[0].pause()
      $sounds[1].pause()
      $pausedButton.classList.remove("hide")
      $playButton.style.display="none"
      currentSound=$sounds[2]
      },
    'Pause': ()=>{
      console.log("Pause")
      for(let i=0;i<$sounds.length;i++){
        if(!($sounds[i].paused)){
          playAndPause()
          }
        }
      },
    'Arrêt': ()=>{
      console.log("Arrêt")
        for(let i=0;i<$sounds.length;i++){
          if(!($sounds[i].paused)){
            playAndPause()
          }
        }
      },
    'Play': ()=>{
      console.log("Play")
        if($sounds[0].paused&&$sounds[1].paused&&$sounds[2].paused){
          playAndPause()
          $body.style.cursor="default"
          $introductiveText.classList.add("smoothTransition")
          $warningText.style.display="none"
          setTimeout(appearanceMenu, 500)
        }
      },
    'Lecture': ()=>{
      console.log("Lecture")
        if($sounds[0].paused&&$sounds[1].paused&&$sounds[2].paused){
          playAndPause()
          $body.style.cursor="default"
          $introductiveText.classList.add("smoothTransition")
          $warningText.style.display="none"
          setTimeout(appearanceMenu, 500)
        }
      },
    'Précédent': ()=>{
      console.log("Précédent")
      previousTrack()
      },
    'Previous': ()=>{
      console.log("Previous")
      nextTrack()
      },
    'Suivant': ()=>{
      console.log("Suivant")
      nextTrack()
      },
    'Next': ()=>{
      console.log("Next")
      nextTrack()
      }, 
    'Fortissimo': ()=>{
      for(i=0;i<$sounds.length;i++){
        $sounds[i].volume=1      
        $volume.style.transform="rotate(180deg)"
        }
      },
    'Pianissimo': ()=>{
      for(i=0;i<$sounds.length;i++){
        $sounds[i].volume=.2      
        $volume.style.transform="rotate(-35deg)"
          }
      }
}
// Add our commands to annyang
annyang.addCommands(commands)

// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start()
};



//Speech recognition is not supported
if(!annyang){
  $title.textContent="I could here you"
  $subtitle.textContent="(if you use Chrome)" 
  $subtitle.style.fontSize="25px"
//  const clickToUse = document.createElement("p")
//  clickToUse.classList.add("clickToUse")
//  clickToUse.textContent="Click anywhere to continue"
//  $body.appendChild(clickToUse)
  document.querySelector(".warningText p").textContent="Click anywhere to continue"
  $help.style.display="none"
}

















//PLAYER

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



 document.addEventListener(
        "keydown",
        (e) => {
          if (e.keyCode === 39) {
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
          }else if(e.keyCode === 37) {
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



$sounds[0].addEventListener(
  "ended",
  ()=>{
      $sounds[0].pause()
      $sounds[1].currentTime=0
      $sounds[1].play()
      $sounds[0].classList.remove("selected")
      $sounds[1].classList.add("selected")  
      $artisticName.textContent="Beethov."
      $musicTitle.textContent="Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
      $currentDuration.innerHTML = "0:00"
      currentSound=$sounds[1]
    } 
  )

$sounds[1].addEventListener(
  "ended",
  ()=>{
      $sounds[1].pause()
      $sounds[2].currentTime=0
      $sounds[2].play()
      $sounds[1].classList.remove("selected")
      $sounds[2].classList.add("selected")  
      $artisticName.textContent="Bach"
      $musicTitle.textContent="Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
      $currentDuration.innerHTML = "0:00"
      currentSound=$sounds[2]
    } 
)

$sounds[2].addEventListener(
  "ended",
  ()=>{
      $sounds[2].pause()
      $sounds[0].currentTime=0
      $sounds[0].play()
      $sounds[2].classList.remove("selected")
      $sounds[0].classList.add("selected")  
      $artisticName.textContent="Mozart"
      $musicTitle.textContent="Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
      $currentDuration.innerHTML = "0:00"
      currentSound=$sounds[0]
    } 
)





//Click on the seekbar 
$seekBar.addEventListener(
  "mousedown",
  (event)=>{
    event.preventDefault()
    const ratio = (event.clientX-$seekBar.offsetLeft+($seekBar.offsetWidth/2)) / $seekBar.offsetWidth//voir les meta dans la console juste avec (event) > clientX donne la valeur où on clique. Mais valeur décalée par la marge de base > 
    //offsetLeft Renvoie le décalage de la seekbar par rapport à la page
    //diviser par la largeur de la page
    for(i=0;i<$sounds.length;i++){
      const audioTime = ratio*$sounds[i].duration
      $sounds[i].currentTime = audioTime
      console.log(audioTime)
    }
  }
)


//Volume
let isMousedown=false

$volume.addEventListener(
  "mousedown",
  () => {
    isMousedown = true
    console.log("appuie")
  }
)

$volume.addEventListener(
  "mouseup",
  () => {
    isMousedown = false
    console.log(isMousedown)
  })



//Make the big button movable
$volume.addEventListener(
  "mousemove",
  (event) => {
    event.preventDefault()
    ratioX = event.clientX - $volume.offsetLeft
    ratioY = event.clientY - $volume.offsetTop

    if (isMousedown && ratioX < 70 && ((ratioX - ratioY) > -50)) { 
      $volume.style.transform = `rotate(${(ratioX-ratioY)}deg)`
      console.log(ratioX-ratioY)
      volumeDown()
    } else if (isMousedown && ratioX > 70 && ((ratioX + ratioY) < 180)) {
      $volume.style.transform = `rotate(${(ratioX+ratioY)}deg)`
      volumeUp()
    }
  }
)



let volumeUp = () => {
  for (let i = 0; i < $sounds.length; i++) {
      let getRotate = window.getComputedStyle($volume).getPropertyValue("transform")
      
      var values = getRotate.split('(')[1]
      values = values.split(')')[0];
      values = values.split(',');
      
      var a = values[0];
      var b = values[1];
      var c = values[2];
      var d = values[3];

      var scale = Math.sqrt(a*a + b*b);

      var sin = b/scale;
      var angle = Math.round(Math.asin(sin) * (180/Math.PI))
      
      $sounds[i].volume=(-angle)/186+.9
      if($sounds[i].volume+.1>1){
        $sounds[i].volume=1
    }
  }
}


let volumeDown = () => {
  for (let i = 0; i < $sounds.length; i++) {
    let getRotate = window.getComputedStyle($volume).getPropertyValue("transform")
      
      var values = getRotate.split('(')[1]
      values = values.split(')')[0];
      values = values.split(',');
      
      var a = values[0];
      var b = values[1];
      var c = values[2];
      var d = values[3];

      var scale = Math.sqrt(a*a + b*b);

      // arc sin, convert from radians to degrees, round
      // DO NOT USE: see update below
      var sin = b/scale;
      var angle = Math.round(Math.asin(sin) * (180/Math.PI));

      $sounds[i].volume=(angle+49)/186
      if($sounds[i].volume-.1<0){
        $sounds[i].volume=0
        
      }
    }
  }


//The total duration of the track
let refreshDurate=()=>{ 
for(let i=0;i<$sounds.length;i++){
$sounds[i].addEventListener(
  "play", //event
  ()=>{
      const minutes=Math.floor(($sounds[i].duration)/60)
      const seconds=Math.floor(($sounds[i].duration)%60)
      $totalDuration.textContent=`${String(minutes)}:${String(seconds)}`
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
        "click",
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
      if (seconds < 10) {
        $currentDuration.textContent = `${String(minutes++)}:0${String(seconds++)}`
      } else {
        $currentDuration.textContent = `${String(minutes++)}:${String(seconds++)}`
      }
    }
  }
}

setInterval(durate, 1000)
durate()


$playButton.addEventListener(
  "click",
  ()=>{
    playAndPause()
    $pausedButton.classList.remove("hide")
    $playButton.style.display="none"
  }
)


$pausedButton.addEventListener(
  "click",
  ()=>{
    playAndPause()
    $pausedButton.classList.add("hide")
    $playButton.style.display="block"
  }
)


$nextButton.addEventListener(
  "click",
  ()=>{
    nextTrack() 
  }
)

$previousButton.addEventListener(
  "click",
  ()=>{
    previousTrack()
  }
)





const nextTrack=()=>{
        if (($track1.classList.contains("selected")) && (!($sounds[0].paused))) {
        $sounds[0].pause()
        $sounds[1].play()
        $sounds[0].classList.remove("selected")
        $sounds[1].classList.add("selected")
        $sounds[1].currentTime=0
        refreshDurate()
        $artisticName.textContent="Beethov."
        $musicTitle.textContent="Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
        $currentDuration.innerHTML = "0:00"
        currentSound=$sounds[1]
      } else if (($track1.classList.contains("selected")) && (($sounds[0].paused))){
        $sounds[0].classList.remove("selected")
        $sounds[1].classList.add("selected")
        $sounds[1].currentTime=0
        $currentDuration.innerHTML = "0:00"
        const minutes=Math.floor(($sounds[1].duration)/60)
        const seconds=Math.floor(($sounds[1].duration)%60)
        $totalDuration.innerHTML=`${String(minutes)}:${String(seconds)}`
        $artisticName.textContent="Beethov."
        $musicTitle.textContent="Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
        currentSound=$sounds[1]
      } else if (($track2.classList.contains("selected")) && (!($sounds[1].paused))) {
        $sounds[1].pause()
        $sounds[2].play()
        $sounds[1].classList.remove("selected")
        $sounds[2].classList.add("selected")
        $sounds[2].currentTime=0
        $currentDuration.innerHTML = "0:00"
        refreshDurate()
        $artisticName.textContent="Bach"
        $musicTitle.textContent="Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
        currentSound=$sounds[2]
      } else if (($track2.classList.contains("selected")) && (($sounds[1].paused))) {
        $sounds[1].classList.remove("selected")
        $sounds[2].classList.add("selected")
        $sounds[2].currentTime=0
        $currentDuration.innerHTML = "0:00"
        const minutes=Math.floor(($sounds[2].duration)/60)
        const seconds=Math.floor(($sounds[2].duration)%60)
        $totalDuration.innerHTML=`${String(minutes)}:${String(seconds)}`
        $artisticName.textContent="Bach"
        $musicTitle.textContent="Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
        currentSound=$sounds[2]
      } else if (($track3.classList.contains("selected")) && (!($sounds[2].paused))) {
        $sounds[2].pause()
        $sounds[0].play()
        $sounds[2].classList.remove("selected")
        $sounds[0].classList.add("selected")
        $sounds[0].currentTime=0
        $currentDuration.innerHTML = "0:00"
        refreshDurate()
        $artisticName.textContent="Mozart"
        $musicTitle.textContent="Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
        currentSound=$sounds[0]
      } else if (($track3.classList.contains("selected")) && (($sounds[2].paused))) {
        $sounds[2].classList.remove("selected")
        $sounds[0].classList.add("selected")
        $sounds[0].currentTime=0
        $currentDuration.innerHTML = "0:00"
        const minutes=Math.floor(($sounds[0].duration)/60)
        const seconds=Math.floor(($sounds[0].duration)%60)
        $totalDuration.innerHTML=`${String(minutes)}:${String(seconds)}`
        $artisticName.textContent="Mozart"
        $musicTitle.textContent="Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
        currentSound=$sounds[0]
      }
  }

    
const previousTrack=()=>{
  if (($track1.classList.contains("selected")) && (!($sounds[0].paused))) {
        $sounds[0].pause()
        $sounds[2].play()
        $sounds[0].classList.remove("selected")
        $sounds[2].classList.add("selected")
        $sounds[2].currentTime=0
        $currentDuration.innerHTML = "0:00"
        refreshDurate()
        $artisticName.textContent="Bach"
        $musicTitle.textContent="Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
        currentSound=$sounds[2]
      } else if (($track1.classList.contains("selected")) && (($sounds[0].paused))){
        $sounds[0].classList.remove("selected")
        $sounds[2].classList.add("selected")
        $sounds[2].currentTime=0
        $currentDuration.textContent = "0:00"
        const minutes=Math.floor(($sounds[2].duration)/60)
        const seconds=Math.floor(($sounds[2].duration)%60)
        $totalDuration.textContent=`${String(minutes)}:${String(seconds)}`
        $artisticName.textContent="Bach"
        $musicTitle.textContent="Concerto for Two Violins in D Minor, BWV 1043: I. Vivace"
        currentSound=$sounds[2]
      } else if (($track2.classList.contains("selected")) && (!($sounds[1].paused))) {
        $sounds[1].pause()
        $sounds[0].play()
        $sounds[1].classList.remove("selected")
        $sounds[0].classList.add("selected")
        $sounds[0].currentTime=0
        $currentDuration.textContent = "0:00"
        $artisticName.textContent="Mozart"
        $musicTitle.textContent="Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
        refreshDurate()
        currentSound=$sounds[0]
      } else if (($track2.classList.contains("selected")) && (($sounds[1].paused))) {
        $sounds[1].classList.remove("selected")
        $sounds[0].classList.add("selected")
        $sounds[0].currentTime=0
        $currentDuration.textContent = "0:00"
        const minutes=Math.floor(($sounds[0].duration)/60)
        const seconds=Math.floor(($sounds[0].duration)%60)
        $totalDuration.textContent=`${String(minutes)}:${String(seconds)}`
        $artisticName.textContent="Mozart"
        $musicTitle.textContent="Requiem Mass in D Minor, K. 626: VII. Lacrimosa"
        currentSound=$sounds[0]
      } else if (($track3.classList.contains("selected")) && (!($sounds[2].paused))) {
        $sounds[2].pause()
        $sounds[1].play()
        $sounds[2].classList.remove("selected")
        $sounds[1].classList.add("selected")
        $sounds[1].currentTime=0
        $currentDuration.textContent = "0:00"
        refreshDurate()
        $artisticName.textContent="Beethov."
        $musicTitle.textContent="Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
        currentSound=$sounds[1]
      } else if (($track3.classList.contains("selected")) && (($sounds[2].paused))) {
        $sounds[2].classList.remove("selected")
        $sounds[1].classList.add("selected")
        $sounds[1].currentTime=0
        $currenttextContent = "0:00"
        const minutes=Math.floor(($sounds[1].duration)/60)
        const seconds=Math.floor(($sounds[1].duration)%60)
        $totalDuration.textContent=`${String(minutes)}:${String(seconds)}`
        $artisticName.textContent="Beethov."
        $musicTitle.textContent="Symphony No. 5 in C Minor, Op. 67: I. Allegro con brio"
        currentSound=$sounds[1]
      }
}



$help.addEventListener(
  "mouseover",
  () => {
    TweenMax.to($indications, .2, {
      display: "block",
      scale: 1,
      opacity: 1,
      transformOrigin:"top right",
    })
  }
)

$help.addEventListener(
  "mouseleave",
  () => {
    TweenMax.to($indications, .2, {
      autoAlpha: 0, //autoAlpha only to remove an element
      scale:0,
      onComplete: () => {
        TweenMax.to($indications, .2, {
          display: "none",
          clearProps: "all"
        })
      }
    })
  }
)

//Bug NaN sur la Duration 
//Commentaires
//JS Propre