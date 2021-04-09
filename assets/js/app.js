import FEN from "./FEN.js";

document.addEventListener("DOMContentLoaded", () => {

    let fen, config, board;
    const FEN_input = document.querySelector("#input input"),
        FEN_output = document.querySelector("#output input"),
        FEN_regex = /^([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\s[bw-]\s(([a-hkqA-HKQ]{1,4})|(-))\s(([a-h][36])|(-))\s\d+\s\d+$/,
        start_position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1",
        display_output = () => {
            config.position = fen.fenString;
            board = Chessboard("board", config);
            FEN_output.value = fen.fenString;
        }

    fen = new FEN(start_position);
    config = {
        orientation: "white"
    }
    display_output();

    FEN_input.addEventListener("keyup", function () {
        if (FEN_regex.test(this.value)) {
            fen = new FEN(this.value);
        } else {
            fen = new FEN(start_position);
        }
        display_output()
    });

    document.querySelector("#flip-board").addEventListener("click", () => {
        config.orientation = (config.orientation === "white") ? "black" : "white";
        board.flip();
    });

    document.querySelectorAll("#controls button").forEach(button => {
        button.addEventListener("click", () => {
            switch (button.id) {
                case "swap-colors":
                    fen.swapColors();
                    break;
                case "flip-horizontally":
                    fen.flipHorizontally();
                    break;
                case "flip-vertically":
                    fen.flipVertically();
                    break;
                case "on-move":
                    fen.changeSideToMove();
                    break;
            }
            display_output();
        })
    });

    document.querySelector("#output button").addEventListener("click", () => {
        const copy_notif = document.querySelector("#copy-notif");
        copy_notif.style.display = "none";
        FEN_output.select();
        document.execCommand("copy");
        copy_notif.style.display = "block";
    })
})
