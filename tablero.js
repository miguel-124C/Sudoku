

class Tablero {

    numberSelect = null;
    #canvasContext;

    #responsiveSize;
    #sizesTablero;

    #_MatrizRegion = [];

    regionSelected = null;

    constructor( sizeCanvas ){
        this.#responsiveSize = new ResponsiveTablero();
        this.#sizesTablero = this.#responsiveSize.getSize(sizeCanvas);

        const canvas = document.createElement('canvas');

        canvas.width = this.#sizesTablero.widthTablero;
        canvas.height = this.#sizesTablero.heightTablero;
        this.#canvasContext = canvas.getContext("2d");

        canvas.addEventListener('click', this.onClickCanvas);
    }

    get MATRIZ(){ return this.#_MatrizRegion };
    get canvas(){ return this.#canvasContext.canvas; }

    set setSizeCanvas( size ){
        this.#sizesTablero = this.#responsiveSize.getSize( size );
        
        this.canvas.width = this.#sizesTablero.widthTablero;
        this.canvas.height = this.#sizesTablero.heightTablero;
    }

    dibujarTablero(){
        this.#_MatrizRegion = [];
        const sizeRegion = this.#sizesTablero.region;
        let coordY = 0;
        for (let i = 0; i < 3; i++) {
            this.#_MatrizRegion.push([]);
            let coordX = 0;
            for (let j = 0; j < 3; j++) {
                const region = new Region(coordX, coordY, sizeRegion, i, j);

                this.#canvasContext.fillRect(coordX, coordY, sizeRegion, sizeRegion);
                this.dibujarCell(coordX, coordY, region);

                this.#_MatrizRegion[i][j] = region;

                coordX += sizeRegion + this.#sizesTablero.spaceRegion;
            }
            coordY += sizeRegion + this.#sizesTablero.spaceRegion;
        }
    }
    
    dibujarCell( coordX, coordY, region ){
        const sizeSquare = this.#sizesTablero.square;
        let COORDY = coordY;
        for (let i = 0; i < 3; i++) {
            let COORDX = coordX;
            for (let j = 0; j < 3; j++) {
                region.addCell( COORDX, COORDY, sizeSquare, i, j );
                this.#canvasContext.fillStyle = "#edf"
                this.#canvasContext.fillRect(COORDX, COORDY, sizeSquare, sizeSquare);
                this.#canvasContext.strokeStyle = "black";
                this.#canvasContext.lineWidth = 1;
                this.#canvasContext.strokeRect(COORDX, COORDY, sizeSquare, sizeSquare);
                COORDX += sizeSquare + this.#sizesTablero.spaceSquare;
            }
            COORDY += sizeSquare + this.#sizesTablero.spaceSquare;
        }
    }

    resaltarRegion(region) {
        const [x, y] = region.positionToDraw;
        const size = region.size;
    
        // Si ya hay una región resaltada, restauramos el fondo de esa región
        if (this.regionSelected) {
            const [oldX, oldY] = this.regionSelected.positionToDraw;
            // Restauramos el fondo que guardamos previamente
            this.#canvasContext.putImageData(this.regionSelected.background, oldX, oldY);
        }
    
        // Guardamos el estado actual de la región donde se va a resaltar
        region.background = this.#canvasContext.getImageData(x, y, size, size);
    
        // Dibujamos el resaltado con el color semitransparente deseado
        this.#canvasContext.fillStyle = "#0003";
        this.#canvasContext.fillRect(x, y, size, size);
    
        // Actualizamos la región seleccionada
        this.regionSelected = region;
    }

    onClickCanvas = ({ offsetX, offsetY }) =>{
        const a = this.MATRIZ.filter((matriz)=>{
            const Region = matriz.filter((region)=>{
                const cell = region.getCellsByPosition(
                    offsetX, offsetY
                );
                
                return cell.length > 0;
            });

            if (Region.length > 0) this.resaltarRegion(...Region);
        });
    }
}