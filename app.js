// DOM elements to be used.

const message = document.querySelector('.messages');
const inst = document.querySelector('.instructions');
const boxes = document.querySelectorAll('.box');
const reset = document.querySelector('button');


// Creating noughts, crosses, and toggling between players
let icon = 'X'

const toggle = () => {
    if ( icon === 'X' ) {
        icon = 'O';
        inst.innerHTML = "<p>Nought's turn<p/>";
    }    
    else {
        icon = 'X';
        inst.innerHTML = "<p>Cross's turn<p/>";
    }    
}

// Function to take a go
    // if box empty, write in nought or cross
    // once an icon written in, toggle icon to other player's
    // check for a winner

boxes.forEach( (el) => { el.addEventListener('click', 
    () => {
        if ( !el.innerHTML ) {
            el.innerHTML = `<h1>${icon}</h1>`;
            toggle();
            checkForWinner();
        }
    });
});
    
    
// Function to reset board
    // clear boxes
    // clear highlighting
    // reset message and instruction text to originals
    
const resetBoard = () => {
    boxes.forEach(
        (el) => {
            el.innerHTML = '';
        }
    )
    resetHighlight();
    icon = 'X';
    message.innerHTML = `<h2>Crosses start</h2>`;
    inst.innerHTML = `<p>Click in a box to play</p>`;
    winCode = null;
}
// Event Listener
reset.addEventListener('click', resetBoard)

// Check board for a winning combo

const checkForWinner = () => {
    let xArray = [];
    let oArray = [];
    // create arrays of box numbers for Xs and Os
    boxes.forEach(
        (box) => {
            if ( box.textContent ) {
                if ( box.textContent == 'X' ) {
                    xArray.push(parseInt(box.id));
                }    
                if ( box.textContent == 'O' ) {
                    oArray.push(parseInt(box.id));   
                }    
            }         
        }
    );
    // if one player has 3 or more icons, and it matches a winning array, declare winner.
    if ( xArray.length >= 3 && compareToWinningArrays(xArray) ) {
        return declareWinner("Crosses");
    } else if 
        ( oArray.length >= 3 && compareToWinningArrays(oArray) ) {
        return declareWinner("Noughts");
    } else if 
        ( xArray.length + oArray.length === 9 ) {
        return declareWinner("Nobody");
    }
}

let winCode = null;

// test the 8 winning combos against sample
const compareToWinningArrays = (playerArray) => {
    let final = false;
    winningArrays.forEach(
        (combo) => {
            let outcome = true;
            for(let i = 0; i < 3; i++) {
                if ( playerArray.indexOf(combo[i]) == -1 )
                    return outcome = false;
            }
            if ( outcome ) {
                winCode = combo;
                return final = true;
            }
        } 
    )
    if ( final ) return true;
}

const winningArrays =[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]]

// Function to display winner:
    // set message to wining player
    // set instructions to 'yay'
    // highlight winning boxes

const declareWinner = (win) => {
    message.innerHTML = `<h2>${win} wins!<h2>`;
    inst.innerHTML = 'yay!';
    highlight();
};

// highlight winning combo boxes:
const highlight = () => {
    if (winCode) {
        for(let i = 0; i < 3; i++) {
            let id = `${winCode[i]}`;
            const el = document.getElementById(id);
            el.style.background = "lightcyan";
        } 
    }
}
// remove highlight
const resetHighlight = () => {
    boxes.forEach(
        (box) => {
            box.style.background = "white";
        }
    );

}
