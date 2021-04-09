export default class FEN {
    constructor(fenString) {
        this.fenString = fenString.trim();
        this.space = this.fenString.indexOf(' ');
        this.pieces = this.fenString.substring(0, this.space);
        this.move = this.fenString.substr(this.space);
    }

    changeSideToMove() {
        let newMove;
        if (this.move[1] === 'b') newMove = this.move.replace('b', 'w');
        if (this.move[1] === 'w') newMove = this.move.replace('w', 'b');
        this.fenString = this.pieces + newMove;
        return this.fenString;
    }

    swapColors() {
        this.pieces = this.pieces.split('')
            .map(char => {
                if (char === char.toUpperCase()) return char.toLowerCase();
                else if (char === char.toLowerCase()) return char.toUpperCase();
                else return char;
            })
            .join('');
        this.fenString = this.pieces + this.move;
    }

    flipHorizontally() {
        this.pieces = this.pieces.split('/')
            .map(str => str.split('')
                .reverse()
                .join('')
            )
            .join('/');
        this.fenString = this.pieces + this.move;
    }

    flipVertically() {
        this.pieces = this.pieces.split('/')
            .reverse()
            .join('/');
        this.fenString = this.pieces + this.move;
    }

    changeSideToMove() {
        switch (this.move[1]) {
            case 'b':
                this.move = this.move.replace('b', 'w');
                break;
            case 'w':
                this.move = this.move.replace('w', 'b');
                break;
        }
        this.fenString = this.pieces + this.move;
    }
}