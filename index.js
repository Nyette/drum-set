document.addEventListener("DOMContentLoaded", function() {
    
    let association = {
        "a": "tom1",
        "w": "tom3",
        "s": "tom4",
        "d": "tom2",
        "j": "crash",
        "k": "kick",
        "l": "snare"
    };

    class Drum {
        constructor(keyName, fileName) {
            this.keyName = keyName;
            this.fileName = fileName;
        }
    }

    // Create drum set

    function createSet(association) {
        let set = [];
        for (keyName in association) {
            let drum = new Drum(keyName, association[keyName]);
            set.push(drum);
        }
        return set;
    }

    let set = createSet(association);
    
    // Create buttons

    let setContainer = document.querySelector(".set");

    function createBtns(set) {
        for (drum of set) {
            // Set attributes
            let btn = document.createElement("button");
            btn.className = `${drum.keyName} drum`;
            btn.dataset.fileName = drum.fileName;
            btn.textContent = drum.keyName;
            btn.style.backgroundImage = `url('images/${drum.fileName}.png')`;
            // Add to the DOM
            setContainer.append(btn);
        }
    }

    createBtns(set);

    // Play audio

    function playAudio(fileName) {
        new Audio(`audio/${fileName}.mp3`).play();
    }

    // Animate button press

    function animateBtnPress(el) {
        el.classList.add("pressed");
    }

    function cancelAnimation(el) {
        el.classList.remove("pressed");
    }

    // Respond to mouse

    setContainer.addEventListener("click", function handleClick(e) {
        switch (e.target.tagName) {
            case "BUTTON":
                animateBtnPress(e.target);
                setTimeout(cancelAnimation, 100, e.target);
                playAudio(e.target.dataset.fileName);
                break;
            default:
                break;
        }
    })

    // Respond to keys

    document.addEventListener("keydown", function handleKeyDown(e) {
        let keyName = e.key;
        if (keyName in association) {
            let fileName = association[keyName];
            let pressedBtn = document.querySelector(`.${keyName}`);
            animateBtnPress(pressedBtn);
            setTimeout(cancelAnimation, 100, pressedBtn);
            playAudio(fileName);
        }
    })

})
