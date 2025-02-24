class Cell {

    #posX;
    #posY;
    #size;

    #x;
    #y;

    get position(){ return [ this.#x, this.#y ] };
    get positionToDraw(){ return [ this.#posX, this.#posY ] };
    get size(){ return this.#size };

    constructor( posx, posy, size, x, y ){
        this.#posX = posx;
        this.#posY = posy;
        this.#size = size;

        this.#x = x;
        this.#y = y;
    }

    get rangoCell(){
        const x2 = this.#posX + this.#size;
        const y2 = this.#posY + this.#size;

        return [ this.#posX, x2, this.#posY, y2 ];
    }

}