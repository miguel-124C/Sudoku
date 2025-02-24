
class ResponsiveTablero {

    constructor(){
        
    }

    #big = {
        widthTablero: 500,
        heightTablero: 500,
        region: 165,
        spaceRegion: 2.5,
        square: 55,
        spaceSquare: 0,
    }

    #medium = {
        widthTablero: 300,
        heightTablero: 300,
        region: 100,
        spaceRegion: 0,
        square: 33,
        spaceSquare: 0
    }

    #low = {
        widthTablero: 250,
        heightTablero: 250,
        region: 82,
        spaceRegion: 2,
        square: 26,
        spaceSquare: 2
    }

    getSize( type ){
        if( type == 1 ) return this.#low;
        if( type == 2 ) return this.#medium;
        if( type == 3 ) return this.#big;
    }

}