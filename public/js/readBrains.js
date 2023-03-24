// function to read the bug brain for the first bug
function readBrainOne(input) {
    const file = input.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const file = event.target.result;
        const allLines = file.split(/\r\n|\n/);

        for (let i = 0; i < allLines.length; i++) {
            const line = allLines[i];
            const commentIndex = line.indexOf(';');
            // Extract the portion of the line up to the ";" character
            let content = line.substring(0, commentIndex !== -1 ? commentIndex : line.length);
            content = content.trim();
            brain1.instruction.push(content);
        }
        if (!parseBrain(brain1)) {
            clearValueOfElement("brainOneInput");
            brain1.instruction = [];
        };
    }
    reader.readAsText(file);
}

// function to read the bug brain for the second bug
function readBrainTwo(input) {
    const file = input.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const file = event.target.result;
        const allLines = file.split(/\r\n|\n/);
        if (allLines == undefined) {
            console.log("no lines");
        }
        for (let i = 0; i < allLines.length; i++) {
            const line = allLines[i];
            const commentIndex = line.indexOf(';');
            // Extract the portion of the line up to the ";" character
            let content = line.substring(0, commentIndex !== -1 ? commentIndex : line.length);
            content = content.trim();
            brain2.instruction.push(content);
        }
        if (!parseBrain(brain2)) {
            clearValueOfElement("brainTwoInput");
            brain2.instruction = [];
        };
    }
    reader.readAsText(file);
}

// function to parse the commands and store them in the brain if there are no errors
function parseBrain(brain) {
    braincheck: {
        // looping all the lines
        for (let i = 0; i < brain.instruction.length; i++) {
            let words = brain.instruction[i].split(" ");
            if (words[0] == '') {
                alert("Error: lack of instructions!")
                break braincheck;
            }
            // parsing the line for an instruction of type "Sense". Lines parsed are saved
            // as a 5-tuple of [instruction type, direction to sense, s1, s2,condition type]
            if (words[0] == instruction[0]) {
                switch (words[1]) {
                    case senseDir[0]:
                        if (condCheck(words[4])) {
                            let a = parseInt(words[2]);
                            let b = parseInt(words[3]);
                            if (a == NaN || b == NaN) {
                                typoError();
                                break braincheck;
                            } else if (a > brain.instruction.length || b > brain.instruction.length) {
                                lineError();
                                break braincheck;
                            } else {
                                brain.instruction[i] = [0, 0, a, b, words[4]];

                            } break;
                        } else {
                            typoError();
                            break braincheck;
                        }
                    case senseDir[1]:
                        if (condCheck(words[4])) {
                            let a = parseInt(words[2]);
                            let b = parseInt(words[3]);
                            if (a == NaN || b == NaN) {
                                typoError();
                                break braincheck;
                            } else if (a > brain.instruction.length || b > brain.instruction.length) {
                                lineError();
                                break braincheck;
                            } else {
                                brain.instruction[i] = [0, 1, a, b, words[4]];

                            } break;
                        } else {
                            typoError();
                            break braincheck;
                        }
                    case senseDir[2]:
                        if (condCheck(words[4])) {
                            let a = parseInt(words[2]);
                            let b = parseInt(words[3]);
                            if (a == NaN || b == NaN) {
                                typoError();
                                break braincheck;
                            } else if (a > brain.instruction.length || b > brain.instruction.length) {
                                lineError();
                                break braincheck;
                            } else {
                                brain.instruction[i] = [0, 2, a, b, words[4]];
                            } break;
                        } else {
                            typoError();
                            break braincheck;
                        }
                    case senseDir[3]:
                        if (condCheck(words[4])) {
                            let a = parseInt(words[2]);
                            let b = parseInt(words[3]);
                            if (a == NaN || b == NaN) {
                                typoError();
                                break braincheck;
                            } else if (a > brain.instruction.length || b > brain.instruction.length) {
                                lineError();
                                break braincheck;
                            } else {
                                brain.instruction[i] = [0, 3, a, b, words[4]];

                            } break;
                        } else {
                            typoError();
                            break braincheck;
                        }
                    default:
                        typoError();
                        break braincheck;
                }
            }
            // parsing the line for instruction of type "Mark". Lines parsed are saved as
            // a 3-tuple of [instruction type, mark, s]
            else if (words[0] == instruction[1]) {
                let m = parseInt(words[1]);
                if (m >= 0 && m < 6) {
                    let a = parseInt(words[2])
                    if (a == NaN) {
                        typoError();
                        break braincheck;
                    } else if (a > brain.instruction.length) {
                        lineError();
                        break braincheck;
                    } else {
                        brain.instruction[i] = [1, m, a];
                    } break;
                } else {
                    typoError();
                    break braincheck;
                }
            }
            // parsing the line for instruction of type "Unmark". Lines parsed are saved as
            // a 3-tuple of [instruction type, mark, s]
            else if (words[0] == instruction[2]) {
                let m = parseInt(words[1]);
                if (m >= 0 && m < 6) {
                    let a = parseInt(words[2])
                    if (a == NaN) {
                        typoError();
                        break braincheck;
                    } else if (a > brain.instruction.length) {
                        lineError();
                        break braincheck;
                    } else {
                        brain.instruction[i] = [2, m, a];
                    } break;
                } else {
                    typoError();
                    break braincheck;
                }
            }
            // parsing the line for instruction of type "Pickup". Lines parsed are saved as
            // a 3-tuple of [instruction type, s1, s2]
            else if (words[0] == instruction[3]) {
                let a = parseInt(words[1]);
                let b = parseInt(words[2]);
                if (a == NaN || b == NaN) {
                    typoError();
                    break braincheck;
                } else if (a > brain.instruction.length || b > brain.instruction.length) {
                    lineError();
                    break braincheck;
                } else {
                    brain.instruction[i] = [3, a, b];
                }
            }
            // parsing the line for instruction of type "Drop". Lines parsed are saved as
            // a 2-tuple of [instruction type, s]
            else if (words[0] == instruction[4]) {
                let a = parseInt(words[1]);
                if (a == NaN) {
                    typoError();
                    break braincheck;
                } else if (a > brain.instruction.length) {
                    lineError();
                    break braincheck;
                } else {
                    brain.instruction[i] = [4, a];
                }
            }
            // parsing the line for instruction of type "Turn". Lines parsed are saved as
            // a 3-tuple of [instruction type, left/right "-1/1", s]
            else if (words[0] == instruction[5]) {
                if (words[1] == "Right") {
                    let a = parseInt(words[2]);
                    if (a == NaN) {
                        typoError();
                        break braincheck;
                    } else if (a > brain.instruction.length) {
                        lineError();
                        break braincheck;
                    } else {
                        brain.instruction[i] = [5, 1, a];
                    }
                } else if (words[1] == "Left") {
                    let a = parseInt(words[2]);
                    if (a == NaN) {
                        typoError();
                        break braincheck;
                    } else if (a > brain.instruction.length) {
                        lineError();
                        break braincheck;
                    } else {
                        brain.instruction[i] = [5, -1, a];
                    }
                } else {
                    typoError();
                    break braincheck;
                }

            }
            // parsing the line for instruction of type "Move". Lines parsed are saved as
            // a 3-tuple of [instruction type, s1, s2]
            else if (words[0] == instruction[6]) {
                let a = parseInt(words[1]);
                let b = parseInt(words[2]);
                if (a == NaN || b == NaN) {
                    typoError();
                    break braincheck;
                } else if (a > brain.instruction.length || b > brain.instruction.length) {
                    lineError();
                    break braincheck;
                } else {
                    brain.instruction[i] = [6, a, b];
                }
            }
            // parsing the line for instruction of type "Flip". Lines parsed are saved as
            // a 4-tuple of [instruction type, p, s1, s2]
            else if (words[0] == instruction[7]) {
                let a = parseInt(words[1]);
                let b = parseInt(words[2]);
                let c = parseInt(words[3]);
                if (a == NaN || b == NaN || c == NaN) {
                    typoError();
                    break braincheck;
                } else if (b > brain.instruction.length || c > brain.instruction.length) {
                    lineError();
                    break braincheck;
                } else {
                    brain.instruction[i] = [7, a, b, c];
                }
            }
            // parsing the line for instruction of type "Direction". Lines parsed are saved as
            // a 4-tuple of [instruction type, direction, s1, s2]
            else if (words[0] == instruction[8]) {
                let d = parseInt(words[1]);
                if (d >= 0 && d < 6) {
                    let a = parseInt(words[1]);
                    let b = parseInt(words[2]);
                    if (a == NaN || b == NaN) {
                        typoError();
                        break braincheck;
                    } else if (a > brain.instruction.length || b > brain.instruction.length) {
                        lineError();
                        break braincheck;
                    } else {
                        brain.instruction[i] = [8, d, a, b];
                    }
                } else {
                    typoError();
                    break braincheck;
                }
            } else {
                typoError();
                break braincheck;
            }
        }
        return true;
    }
    return false;
}

// checking if the condition matches on of the 10 conditions we can check for
function condCheck(cond) {
    let c = 0;
    for (let i = 0; i < 10; i++) {
        if (cond == conditions[i]) {
            c++;
        }
    }
    if (c == 1) {
        return true;
    } else {
        return false;
    }
}

// throws a typo error and resets all brains
function typoError() {
    alert("Error: typo/missing tokens!")
}

// throws a line error and resets all brains
function lineError() {
    alert("Error: link to a non-existent line!")
}