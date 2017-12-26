//INTRODUCTIVE INTERFACE

class IntroductiveInterface {
  parse() {


    //The main loader disappears once the background is loaded
    const endLoading = () => {
      $loader.style.display = "none"
    }


    //Lazyloading of the background-image
    const newImg = document.createElement("img")
    const backgroundLoader = () => {
      newImg.addEventListener(
        "load",
        () => {
          $body.style.backgroundImage = "url('" + newImg.src + "')"
          $player.style.display = "block"
          document.querySelector(".loader").style.opacity = "0"
          setTimeout(endLoading, 600)
        }
      )
      newImg.src = $backgroundImage.src
    }

    backgroundLoader()


    //Make the player appear
    const appearancePlayer = () => {
      $mainInterface.classList.remove("hidden")
      $introductiveText.style.display = "none" //Make the text disappear after the smooth transition
    }


    //Animation on the name of the home page
    let i = 0
    let nameChange = () => {
      $artist.textContent = names[i]
      if (i < names.length) {
        i++
        const fadein = () => {
          $artist.classList.add("effect")
        }
        setTimeout(fadein, 0)
        const fadeout = () => {
          $artist.classList.remove("effect")
        }
        setTimeout(fadeout, 1000)
      } else {
        i = 0
        $artist.textContent = names[i]
        i++
        const fadein = () => {
          $artist.classList.add("effect")
        }
        setTimeout(fadein, 0)
        const fadeout = () => {
          $artist.classList.remove("effect")
        }
        setTimeout(fadeout, 1000)
      }
    }
    setInterval(nameChange, 1200)
    nameChange()


    //Skip the vocal experience by clicking anywhere on the page
    if (Modernizr.touchevents) {
      $body.addEventListener(
        "touchstart",
        () => {
          $body.style.cursor = "default"
          $introductiveText.classList.add("smoothTransition")
          $warningText.style.display = "none"
          setTimeout(appearancePlayer, 500)
        }
      )
    } else {
      $body.addEventListener(
        "click",
        () => {
          $body.style.cursor = "default"
          $introductiveText.classList.add("smoothTransition")
          $warningText.style.display = "none"
          setTimeout(appearancePlayer, 500)
        }
      )
    }
  }
}