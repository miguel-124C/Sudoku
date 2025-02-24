class Region {

    #cells = [];
    #posX;
    #posY;
    #size;

    #x;
    #y;

    background;

    constructor( posx, posy, size, x, y ){
        this.#posX = posx;
        this.#posY = posy;
        this.#size = size;
        this.#x = x;
        this.#y = y;
    }

    get position(){ return [ this.#x, this.#y ] }
    get positionToDraw(){ return [ this.#posX, this.#posY ] }
    get size(){ return this.#size };

    get cells(){ return this.#cells }

    addCell( posx, posy, sizeCell, x, y ){
        const cell = new Cell( posx, posy, sizeCell, x, y );
        this.#cells.push(cell);
    }

    getCellsByPosition( x, y ){
        return this.#cells.filter((cell)=>{
            const [ x1, x2, y1, y2 ] = cell.rangoCell;

            return (x >= x1 && x <= x2) && (y >= y1 && y <= y2);
        });
    }

}