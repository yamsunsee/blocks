function creatBlocks(size, disable) {
    let blocksDisable = [];
    for (let index = 0; index < disable; index++) {
        let value = Math.floor(Math.random() * size ** 2);
        while (blocksDisable.includes(value)) {
            value = Math.floor(Math.random() * size ** 2);
        }
        blocksDisable.push(value);
    }
    for (let index = 1; index <= size ** 2; index++) {
        let block = document.createElement("div");
        block.id = index;
        block.style.padding = sizeStandard[size]["padding"];
        if (blocksDisable.includes(index)) {
            block.className = "block clicked disable";
            block.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
            <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z"/>
            </svg>`;
        } else {
            block.classList = "block";
        }
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        container.appendChild(block);
    }
}

function randomChoose(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function hover() {
    for (const block of blocks) {
        const id = block.id;
        const direction = block.classList[2];
        const level = block.innerText ? parseInt(block.innerText) : 1;
        const levelUpgrade = blockLevelUpgrade(block);
        const previous = block.innerHTML;
        block.onmouseenter = function () {
            switch (blockType(id)) {
                case "empty":
                    if (blocksPicked["id"].length == 5) {
                        block.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                        <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z"/></svg>`;
                    } else {
                        block.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                        <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm80,224H272v64a16,16,0,0,1-32,0V272H176a16,16,0,0,1,0-32h64V176a16,16,0,0,1,32,0v64h64a16,16,0,0,1,0,32Z" /></svg>`;
                    }
                    break;
                case "picked":
                    if (
                        (blocksPicked["id"].length == 5) &
                        blocksPicked["id"].includes(id)
                    ) {
                        block.innerHTML = `<div class="number"
                        style="width: ${sizeStandard[size]["size"]};height: ${
                            sizeStandard[size]["size"]
                        };font-size: ${
                            sizeStandard[size]["fontSize"]
                        };">${countPickedBlocks(direction)}</div>`;
                        hoverEffect(
                            id,
                            countPickedBlocks(direction),
                            direction
                        );
                    }
                    break;
                case "active":
                    resetBoxShadow();
                    if (levelUpgrade > level || level == maxLevel) {
                        hoverEffect(id, blockLevelUpgrade(block), direction);
                    }
                    groupEffect(countAllBlocks(block), direction);
                    break;
            }
        };
        block.onmouseleave = function () {
            block.innerHTML = previous;
            resetBoxShadow();
        };
    }
}

function resetBoxShadow() {
    for (const block of blocks) {
        block.style.boxShadow = "";
    }
}

function resetBlocksPicked() {
    blocksPicked = { id: [], direction: [] };
}

function groupBlocks(group) {
    for (const element of group) {
        console.log(element);
    }
}

function groupEffect(blocksTarget, direction) {
    for (const blockTarget of blocksTarget) {
        toBlock(
            blockTarget
        ).style.boxShadow = `0 0 0 1px #fff, 0 0 6px 3px ${color[direction]}`;
    }
}

function hoverEffect(id, step, direction) {
    let blocksTarget = [];
    switch (direction) {
        case "up":
            blocksTarget = up(id, step);
            break;
        case "down":
            blocksTarget = down(id, step);
            break;
        case "back":
            blocksTarget = back(id, step);
            break;
        case "forward":
            blocksTarget = forward(id, step);
            break;
    }
    for (const blockTarget of blocksTarget) {
        toBlock(
            blockTarget
        ).style.boxShadow = `0 0 0 1px #fff, 0 0 0 3px ${color[direction]}`;
    }
}

function clickEffect(id, step, direction) {
    let blocksTarget = [];
    switch (direction) {
        case "up":
            blocksTarget = up(id, step);
            break;
        case "down":
            blocksTarget = down(id, step);
            break;
        case "back":
            blocksTarget = back(id, step);
            break;
        case "forward":
            blocksTarget = forward(id, step);
            break;
    }
    for (const blockTarget of blocksTarget) {
        toBlock(blockTarget).className = "block";
        toBlock(blockTarget).innerHTML = "";
    }
    playAudio("./assets/audios/Effect.mp3");
    countDisableBlocks();
    checkWin();
}

function up(idStr, stepStr) {
    let blocksTarget = [];
    const id = parseInt(idStr);
    const step = parseInt(stepStr);
    for (let index = 1; index <= step; index++) {
        if (id - index * size > 0) {
            blocksTarget.push(id - index * size);
        }
    }
    return blocksTarget;
}

function down(idStr, stepStr) {
    let blocksTarget = [];
    const id = parseInt(idStr);
    const step = parseInt(stepStr);
    for (let index = 1; index <= step; index++) {
        if (id + index * size <= size ** 2) {
            blocksTarget.push(id + index * size);
        }
    }
    return blocksTarget;
}

function back(idStr, stepStr) {
    let blocksTarget = [];
    const id = parseInt(idStr);
    const step = parseInt(stepStr);
    for (let index = 1; index <= step; index++) {
        if (id - index > (Math.ceil(id / size) - 1) * size) {
            blocksTarget.push(id - index);
        }
    }
    return blocksTarget;
}

function forward(idStr, stepStr) {
    let blocksTarget = [];
    const id = parseInt(idStr);
    const step = parseInt(stepStr);
    for (let index = 1; index <= step; index++) {
        if (id + index <= Math.ceil(id / size) * size) {
            blocksTarget.push(id + index);
        }
    }
    return blocksTarget;
}

function toBlock(id) {
    return document.getElementById(id);
}

function chooseBlock(array, blockID, direction) {
    for (const block of array["id"]) {
        if (block == blockID) {
            if (countPickedBlocks(direction) == maxLevel) {
                toBlock(block).innerHTML = `<div class="number" style="width: ${
                    sizeStandard[size]["size"]
                };height: ${sizeStandard[size]["size"]};font-size: ${
                    sizeStandard[size]["fontSize"]
                };box-shadow: 0 0 0 3px ${
                    color[direction]
                }, 0 0 0 6px #ecf0f1;">${countPickedBlocks(direction)}</div>`;
            } else {
                toBlock(block).innerHTML = `<div class="number" style="width: ${
                    sizeStandard[size]["size"]
                };height: ${sizeStandard[size]["size"]};font-size: ${
                    sizeStandard[size]["fontSize"]
                };">${countPickedBlocks(direction)}</div>`;
            }
        } else {
            toBlock(
                block
            ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
            <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z"/>
            </svg>`;
            toBlock(block).className = "block clicked disable";
        }
    }
}

function click() {
    for (const block of blocks) {
        block.onclick = function () {
            const id = block.id;
            const direction = block.classList[2];
            const level = block.innerText ? parseInt(block.innerText) : 1;
            const levelUpgrade = blockLevelUpgrade(block);

            if (blockType(id) == "disable") {
                playAudio("./assets/audios/Cannot.mp3");
            } else if (blocksPicked["id"].length < 5) {
                if (
                    (blocksPicked["id"].length == 0) &
                    (blockType(id) == "active")
                ) {
                    if (levelUpgrade > level || level == maxLevel) {
                        if (levelUpgrade == maxLevel) {
                            block.innerHTML = `<div class="number" style="width: ${sizeStandard[size]["size"]};height: ${sizeStandard[size]["size"]};font-size: ${sizeStandard[size]["fontSize"]};box-shadow: 0 0 0 3px ${color[direction]}, 0 0 0 6px #ecf0f1;">${levelUpgrade}</div>`;
                        } else {
                            block.innerHTML = `<div class="number" style="width: ${sizeStandard[size]["size"]};height: ${sizeStandard[size]["size"]};font-size: ${sizeStandard[size]["fontSize"]};">${levelUpgrade}</div>`;
                        }
                        clickEffect(id, levelUpgrade, direction);
                    } else {
                        playAudio("./assets/audios/Cannot.mp3");
                    }
                } else if (
                    !blocksPicked["id"].includes(id) &
                    (blockType(id) == "empty")
                ) {
                    playAudio("./assets/audios/Choose.mp3");
                    gameStart = true;
                    timerFlag = true;
                    block.classList.add("clicked");
                    let random = randomChoose(paths);
                    block.classList.add(random[0]);
                    blocksPicked["id"].push(id);
                    blocksPicked["direction"].push(random[0]);
                    block.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                    ${random[1]}
                    </svg>`;
                } else {
                    playAudio("./assets/audios/Cannot.mp3");
                }
            } else {
                if (
                    blocksPicked["id"].includes(id) &
                    (blockType(id) == "picked")
                ) {
                    chooseBlock(blocksPicked, id, direction);
                    clickEffect(id, countPickedBlocks(direction), direction);
                    resetBlocksPicked();
                } else {
                    playAudio("./assets/audios/Cannot.mp3");
                }
            }
            hover();
            checkLose();
        };
    }
}

function countPickedBlocks(direction) {
    return (
        Math.floor(
            blocksPicked["direction"].filter((x) => x == direction).length / 2
        ) + 1
    );
}

function countAllBlocks(standard) {
    let valueList = [];
    for (const block of blocks) {
        if (
            (block.innerHTML == standard.innerHTML) &
            (block.className == standard.className)
        ) {
            valueList.push(block.id);
        }
    }
    return valueList;
}

function blockLevelUpgrade(standard) {
    let level = standard.innerText ? parseInt(standard.innerText) : 1;
    return Math.min(
        maxLevel,
        Math.floor(countAllBlocks(standard).length / 2) + level
    );
}

function blockType(id) {
    let block = toBlock(id);
    if (block.className == "block") {
        return "empty";
    } else if (block.className.includes("disable")) {
        return "disable";
    } else if (
        block.className.includes("clicked") &
        !block.className.includes("disable")
    ) {
        if (blocksPicked["id"].length == 0) {
            return "active";
        } else {
            return "picked";
        }
    }
}

function checkWin() {
    let disableBlocks = 0;
    for (const block of blocks) {
        if (blockType(block.id) == "disable") {
            disableBlocks++;
        }
    }
    if (disableBlocks == 0) {
        gameStart = false;
        timerFlag = false;
        hideTimer();
        hideTaskbar();
        pauseContainer.classList.toggle("hidden");
        recordContainer.className = "recordContainer win";
        recordContainerIcon.innerHTML = `<ion-icon name="trophy"></ion-icon>`;
        recordContainerTitle.innerHTML = "You win!";
        recordContainerSizeValue.innerHTML = `${size}x${size}`;
        recordContainerDifficultyValue.innerHTML = ["Easy", "Medium", "Hard"][
            parseInt(difficultyOption.value) - 1
        ];
        recordContainerTimeValue.innerHTML = timer.innerHTML;
        overlay.classList.toggle("hidden");
        playAgainBtn.onclick = function () {
            window.location.reload();
        };
    }
}

function checkLose() {
    let emptyBlocks = 0;
    let flag = true;
    for (const block of blocks) {
        if (blockType(block.id) == "empty") {
            emptyBlocks++;
        } else {
            if (
                (countAllBlocks(block).length > 1) &
                (blocksPicked["id"].length == 0 ||
                    blocksPicked["id"].length == 5)
            ) {
                flag = false;
            }
        }
    }
    if ((emptyBlocks == 0) & flag) {
        gameStart = false;
        timerFlag = false;
        hideTimer();
        hideTaskbar();
        pauseContainer.classList.toggle("hidden");
        recordContainer.className = "recordContainer lose";
        recordContainerIcon.innerHTML = `<ion-icon name="sad"></ion-icon>`;
        recordContainerTitle.innerHTML = "You lose!";
        recordContainerSizeValue.innerHTML = `${size}x${size}`;
        recordContainerDifficultyValue.innerHTML = ["Easy", "Medium", "Hard"][
            parseInt(difficultyOption.value) - 1
        ];
        recordContainerTimeValue.innerHTML = timer.innerHTML;
        overlay.classList.toggle("hidden");
        playAgainBtn.onclick = function () {
            window.location.reload();
        };
    }
}

function playAudio(url) {
    if (!muteAudio) {
        new Audio(url).play();
    }
}

function timerRun() {
    let second = 0;
    setInterval(function () {
        if (timerFlag) {
            second++;
            minute = Math.floor(second / 60);
            hour = Math.floor(minute / 60);

            timer.innerHTML = `${hour < 10 ? "0" + hour.toString() : hour}:${
                minute % 60 < 10 ? "0" + (minute % 60).toString() : minute % 60
            }:${
                second % 60 < 10 ? "0" + (second % 60).toString() : second % 60
            }`;
        }
    }, 1000);
}

function countDisableBlocks() {
    let count = 0;
    for (const block of blocks) {
        if (blockType(block.id) == "disable") {
            count++;
        }
    }
    disableBlocks.innerHTML = count;
}

function showMaxLevelBlock() {
    maxLevelBlock.innerHTML = maxLevel;
}

function menu() {
    playBtn.onclick = function () {
        hideMenu();
        setTimeout(function () {
            menuContainer.style.display = "none";

            creatBlocks(
                size,
                difficultyStandard(difficultyOption.value)["Disable"]
            );
            showTimer();
            showTaskbar();
            hover();
            click();
            timerRun();
            countDisableBlocks();
            showMaxLevelBlock();

            state.onclick = function () {
                pause.classList.toggle("hidden");
                play.classList.toggle("hidden");
                overlay.classList.toggle("hidden");
                if (gameStart) {
                    timerFlag = !timerFlag;
                }
            };

            volume.onclick = function () {
                on.classList.toggle("hidden");
                off.classList.toggle("hidden");
                muteAudio = !muteAudio;
            };
        }, 1000);
    };
    optionsBtn.onclick = function () {
        hideMenu();
        setTimeout(function () {
            optionsContainer.style.display = "flex";
            menuContainer.style.background = "#7f8c8d";
            options();
        }, 500);
    };
    tutorialBtn.onclick = function () {
        hideMenu();
        setTimeout(function () {
            tutorialContainer.style.display = "flex";
            menuContainer.style.background = "#7f8c8d";
            options();
        }, 500);
    };
    aboutBtn.onclick = function () {
        hideMenu();
        setTimeout(function () {
            aboutContainer.style.display = "flex";
            menuContainer.style.background = "#7f8c8d";
            options();
        }, 500);
    };
}

function hideMenu() {
    playBtn.style.animation = `slideOutToRight 0.8s ease-out forwards`;
    optionsBtn.style.animation = `slideOutToLeft 0.8s ease-out forwards`;
    tutorialBtn.style.animation = `slideOutToRight 0.8s ease-out forwards`;
    aboutBtn.style.animation = `slideOutToLeft 0.8s ease-out forwards`;
}

function showMenu() {
    playBtn.style.animation = `slideInFromLeft 0.8s ease-out forwards`;
    optionsBtn.style.animation = `slideInFromRight 0.8s ease-out forwards`;
    tutorialBtn.style.animation = `slideInFromLeft 0.8s ease-out forwards`;
    aboutBtn.style.animation = `slideInFromRight 0.8s ease-out forwards`;
    menuContainer.style.background = "#fff";
}

function showTimer() {
    timerContainer.style.animation = `slideToLeft 0.5s ease-out 0.5s forwards`;
}

function hideTimer() {
    timerContainer.style.animation = `hideFromLeft 2.5s ease-in forwards`;
}

function showTaskbar() {
    taskbar.style.animation = `slideToRight 0.5s ease-out 0.5s forwards`;
    home.onclick = function () {
        window.location.reload();
    };
}

function hideTaskbar() {
    taskbar.style.animation = `hideFromRight 2.5s ease-in forwards`;
}

function options() {
    sizeOption.oninput = function () {
        sizeValue.style.left = (this.value - 5) * 1.8 + "rem";
        sizeValue.innerHTML = this.value + " x " + this.value;
        size = this.value;
        maxLevel = difficultyStandard(difficultyOption.value)["MaxLevel"];
    };

    difficultyOption.oninput = function () {
        difficultyValue.style.left = (this.value - 1) * 4.5 + "rem";
        difficultyValue.innerHTML = ["Easy", "Medium", "Hard"][this.value - 1];
        maxLevel = difficultyStandard(difficultyOption.value)["MaxLevel"];
    };

    for (const backToMenuBtn of backToMenuBtns) {
        backToMenuBtn.onclick = function () {
            optionsContainer.style.display = "none";
            tutorialContainer.style.display = "none";
            aboutContainer.style.display = "none";
            showMenu();
        };
    }
}

function difficultyStandard(difficulty) {
    switch (difficulty) {
        case "1":
            return {
                MaxLevel: Math.round(size / 2),
                Disable: Math.round(size * size * 0.04),
            };
        case "2":
            return {
                MaxLevel: Math.round((size * 1.5 - 1) / 2),
                Disable: Math.round(size * size * 0.08),
            };

        case "3":
            return {
                MaxLevel: size - 1,
                Disable: Math.round(size * size * 0.1),
            };
    }
}
