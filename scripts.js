const btnFontsDropDown = document.getElementById('button-fonts');
const dropDownFonts = document.getElementById('fonts-dropdown');
const fontsContainer = document.getElementById('fonts-container');
const initialValue = document.getElementById('Arial');
const fonts = document.querySelectorAll('.fonts > li');
const searchFonts = document.getElementById('search-fonts');
const dropDownSize = document.getElementById('size-dropdown')
const btnSizeDropDown = document.getElementById('button-size');
const searchSize = document.getElementById('search-size');
const sizeContainer = document.getElementById('size-container');
const size = document.querySelectorAll('.size > li');
const musicDropDown = document.getElementById('music-dropdown')
const playList = document.querySelectorAll('.music > audio')
const music = document.querySelectorAll('.music-head')
const musicImg = document.getElementById('music-play-img')
const volumeControl = document.getElementById('volume');
const page = document.querySelector('.page');

//!
//* set initial settings
function basicSettings() {
      searchFonts.value = initialValue.textContent;
      searchSize.value = 3
      searchFonts.style.fontFamily = initialValue.textContent;
      page.focus();
      fonts.forEach(font => {
            font.classList.remove('hide');
      });
}

document.addEventListener("DOMContentLoaded", basicSettings);

//!
//* font and size logic
function toggleDropdownFonts(show) {
      const arrow = document.getElementById('fonts-arrow');
      dropDownFonts.style.display = show ? 'block' : 'none';
      arrow.style.transform = show ? 'rotate(45deg)' : 'rotate(-135deg)';
      fontsContainer.style.borderColor = show ? '#143c21' : '#9cd08d';
}

function toggleDropdownSize(show) {
      const arrow = document.getElementById('size-arrow');
      dropDownSize.style.display = show ? 'block' : 'none';
      arrow.style.transform = show ? 'rotate(45deg)' : 'rotate(-135deg)';
      sizeContainer.style.borderColor = show ? '#143c21' : '#9cd08d';
}

btnFontsDropDown.addEventListener('click', function () {
      const isHiddenFonts = dropDownFonts.style.display === 'none';
      toggleDropdownFonts(isHiddenFonts);
});

btnSizeDropDown.addEventListener('click', function () {
      const isHiddenSize = dropDownSize.style.display === 'none';
      toggleDropdownSize(isHiddenSize)
});

searchFonts.oninput = function () {
      const val = this.value.trim().toLowerCase();
      const fontsItem = document.querySelectorAll('.fonts li');

      if (val !== '') {
            toggleDropdownFonts(true);
            fontsItem.forEach(function (elem) {
                  if (elem.textContent.toLowerCase().includes(val)) {
                        elem.classList.remove('hide');
                  } else {
                        elem.classList.add('hide');
                  }
            });
      } else {
            fontsItem.forEach(function (elem) {
                  elem.classList.remove('hide');
            });
            toggleDropdownFonts(true);
      }
};

searchFonts.addEventListener('click', function () {
      this.select();
      toggleDropdownFonts(true);
});

searchSize.addEventListener('click', function () {
      this.select()
      toggleDropdownSize(true)
})

searchFonts.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
            let val = event.target.value.toLowerCase().trim();
            fonts.forEach(li => {
                  if (li.textContent.toLowerCase().trim() === val) {
                        searchFonts.value = li.textContent;
                        searchFonts.style.fontFamily = li.textContent;
                        toggleDropdownFonts(false);
                  }
            });
      }
});

searchSize.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
            toggleDropdownSize(false)
      }
})


searchFonts.addEventListener('input', function () {
      if (this.value.trim() === '') {
            searchFonts.style.fontFamily = 'Arial';
      }
});

fonts.forEach(font => {
      font.addEventListener('click', function () {
            searchFonts.value = this.textContent;
            searchFonts.style.fontFamily = this.textContent;
            toggleDropdownFonts(false);
      });
});

size.forEach(size => {
      size.addEventListener('click', function () {
            searchSize.value = this.textContent;
            toggleDropdownSize(false)
      })
})

function checkFonts(event) {
      const val = searchFonts.value.trim().toLowerCase();
      if (val === '') {
            alert('Пожалуйста, выберите шрифт!');
            searchFonts.value = initialValue.textContent;
            searchFonts.style.fontFamily = initialValue.textContent;
      }
      if (event && event.type === 'blur') {
            return;
      }
}
searchFonts.addEventListener('blur', checkFonts);


function checkSize(event) {
      const val = searchSize.value.trim();
      if (val === '') {
            alert('ВВеденное число некоректно.\nВведите числовое значение от 1 до 300.');
            searchSize.value = 1
      }
      if (event && event.type === 'blur' && size.contains(event.relatedTarget)) {
            return;
      }
}
searchSize.addEventListener('blur', checkSize)


document.addEventListener('click', function (event) {
      const clickedInsideDropdown = dropDownFonts.contains(event.target) || event.target === searchFonts || event.target === btnFontsDropDown;
      if (!clickedInsideDropdown) {
            toggleDropdownFonts(false);
      }
});


document.addEventListener('click', function (event) {
      const clickedInsideDropdown = dropDownSize.contains(event.target) || event.target === searchSize || event.target === btnSizeDropDown;
      if (!clickedInsideDropdown) {
            toggleDropdownSize(false);
      }
})


//*
function changeColor() {
      const pB = document.getElementById('page-background')
      pB.value = '#DEF0EB'
      pB.addEventListener('change', () => {
            let body = document.body
            body.style.backgroundColor = pB.value
      });
      const pIB = document.getElementById('page-input-background')
      pIB.value = '#D3D3D3'
      pIB.addEventListener('change', () => {
            page.style.backgroundColor = pIB.value
      });
      const pIC = document.getElementById('page-input-color')
      pIC.value = '#044d96'
      pIC.addEventListener('change', () => {
            page.style.color = pIC.value
            page.style.borderColor = pIC.value
      });
}
changeColor()

//!
//* playlist logic and sound settings
function start() {
      const stop = document.querySelector('[data-music="stop"]')
      musicImg.style.backgroundImage = getComputedStyle(stop).backgroundImage;
}

function changeMusic(show) {
      musicDropDown.style.display = show ? 'block' : 'none'
}
musicImg.addEventListener('click', function () {
      const isHiddenMusic = musicDropDown.style.display === 'none'
      changeMusic(isHiddenMusic)

})
music.forEach((music => {
      music.addEventListener('click', function () {
            const musicName = this.dataset.music;
            playList.forEach((play) => {
                  if (play.dataset.music === musicName) {
                        playList.forEach(a => a.pause());
                        play.play()
                        console.log('Playing:', play);
                  } else {
                        play.pause()
                        console.log('Paused:', play);
                  }
            })
            musicImg.style.backgroundImage = getComputedStyle(music).backgroundImage;
            changeMusic(false)
      });
}));
//*sound settings
volumeControl.addEventListener("input", () => {
      playList.forEach(play => {
            play.volume = volumeControl.value / 100;
      })
})
function updateProgress() {
      const val = (volumeControl.value - volumeControl.min) / (volumeControl.max - volumeControl.min) * 100;
      volumeControl.style.background = `linear-gradient(to right,rgb(43, 109, 179) ${val}%, lightpink ${val}%)`;
}
volumeControl.addEventListener('input', updateProgress);
window.addEventListener('load', updateProgress);
window.addEventListener('load', start)

//!
//* text design logic
const modifyText = (command, defaultUi, value) => {
      document.execCommand(command, defaultUi, value);
};

function toggleState(button) {
      const isActive = button.dataset.active === "true";
      const newState = !isActive;
      button.dataset.active = newState;
      button.style.background = newState ? "green" : "lightgrey";
}

const button = document.querySelectorAll('.button')
button.forEach((button) => {
      button.dataset.active = "false";
      button.addEventListener('click', function () {
            modifyText(button.id, false, null)
            toggleState(button);
      })
})

page.addEventListener('click', function () {
      modifyText('fontName', false, searchFonts.value)
      modifyText('fontSize', false, searchSize.value)
})






