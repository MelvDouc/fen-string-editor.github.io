import FEN from "./FEN.js";

document.addEventListener("DOMContentLoaded", () => {

    let config, board;
    const FEN_input = document.querySelector("#input input"),
        FEN_output = document.querySelector("#output input"),
        FEN_regex = /\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\s[bw-]\s(([a-hkqA-HKQ]{1,4})|(-))\s(([a-h][36])|(-))\s\d+\s\d+\s*/,
        display_output = () => {
            board = Chessboard("board", config.fenString);
            FEN_output.value = config.fenString;
        }

    config = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1");
    display_output();

    FEN_input.addEventListener("keyup", function () {
        if (FEN_regex.test(this.value)) {
            config = new FEN(this.value);
            display_output();
        } else {
            board = Chessboard("board", config.fenString);
        }
    });

    document.querySelector("#flip-board").addEventListener("click", () => {
        board.flip()
    });

    document.querySelectorAll("#controls button").forEach(button => {
        button.addEventListener("click", () => {
            switch (button.id) {
                case "swap-colors":
                    config.swapColors();
                    break;
                case "flip-horizontally":
                    config.flipHorizontally();
                    break;
                case "flip-vertically":
                    config.flipVertically();
                    break;
                case "on-move":
                    config.changeSideToMove();
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
