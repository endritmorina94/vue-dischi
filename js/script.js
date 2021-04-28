var app = new Vue(
    {
        el: '#root',
        data: {
            //Stabilisco un array vuoto per metterci i vari dischi
            dischi: [],
            //Creo un array per i generi musicali che poi verrà popolato con quelli dei dischi forniti dalla API
            generi:["All"],
            //Imposto un indice per l'array generi a -1
            indexOfGen: -1,
            //Creo una variabile flag per stabilire se un filtro genere è stato scelto o meno
            genreChoosen: false
        },
        methods: {

            //Questa funzione che viene passata con parametro true o false, stabilisce se l'indice indexOfGen deve aumentare o diminuire
            changeGenre(forward){
                //Impostiamo la variabiole genreChoosen a true, inquanto è stato scelto di filtrare i dischi per generi
                this.genreChoosen = true;

                //Se l'argomento passato è true.. aumentiamo l'indice
                if(forward){
                    if(this.indexOfGen < this.generi.length - 1){
                        this.indexOfGen += 1;
                    } else {
                        this.indexOfGen = 0;
                    }
                //Altrimenti..
                } else {
                    if(this.indexOfGen > 0){
                        this.indexOfGen -= 1;
                    } else {
                        this.indexOfGen = this.generi.length - 1;
                    }
                }
            },

            //Con questa funzione controllo se il genere dell'oggetto corrisponde al genre attuale,
            //se c'è corrispondenza, torno true mostrandolo altrimenti torno false nascondendolo
            //indexOfDisco ==> idice del disco
            filterByGenre(indexOfDisco) {
                if (this.dischi[indexOfDisco].genre == this.generi[this.indexOfGen] || this.indexOfGen == -1 || this.indexOfGen == 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        mounted() {
            axios
                .get('https://flynn.boolean.careers/exercises/api/array/music')
                .then((response) => {
                    const result = response.data;

                    //Con la funzione sort mettiamo in ordine crescente gl'oggetti in base alla loro key year
                    result.response.sort((a, b) => parseFloat(a.year) - parseFloat(b.year));

                    //Ora assegnamo tutti gl'oggetti al nostro array dischi
                    this.dischi = result.response;

                    //Con un foreach cicliamo tutti gli oggetti dell'array dischi
                    this.dischi.forEach((element) => {
                        //..e pushiamo tutti i generi che non sono ancora presenti al suo interno
                        if(!this.generi.includes(element.genre)) {
                            this.generi.push(element.genre);
                        }
                    });
                });
        }
    }
);
