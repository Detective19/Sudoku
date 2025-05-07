let numSelected = null;
let tileSelected = null;
let errors = 0;

const board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

const solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload = function () {
    setGame();
};

function setGame() {
    for (let i = 1; i <= 9; i++) {
        const number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const tile = document.createElement("div");
            tile.id = `${r}-${c}`;

            if (board[r][c] !== "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }

            if (r === 2 || r === 5) tile.classList.add("horizontal-line");
            if (c === 2 || c === 5) tile.classList.add("vertical-line");

            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected) {
        numSelected.classList.remove("number-selected");
    }

    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (!numSelected) return;

    if (tileSelected) {
        tileSelected.classList.remove("tile-selected");
    }

    tileSelected = this;
    tileSelected.classList.add("tile-selected");

    if (tileSelected.innerText !== "") return;

    const [r, c] = tileSelected.id.split("-").map(Number);

    if (solution[r][c] === numSelected.id) {
        tileSelected.innerText = numSelected.id;
        document.getElementById("message").innerText = "";
    } else {
        errors++;
        tileSelected.classList.add("error-tile");
        setTimeout(() => {
            tileSelected.classList.remove("error-tile");
        }, 500);

        document.getElementById("errors").innerText = errors;
        document.getElementById("message").innerText = "Wrong move!";
    }
}

