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
            changeGenre(){
                //Impostiamo la variabiole genreChoosen a true, inquanto è stato scelto di filtrare i dischi per generi
                this.genreChoosen = true;

                //Se l'argomento passato è true.. aumentiamo l'indice
                if(true){
                    if(this.indexOfGen < this.generi.length - 1){
                        this.indexOfGen += 1;
                    } else {
                        this.indexOfGen = 0;
                    }
                //Altrimenti..
                } else {
                    if(this.indexOfGen < 0){
                        this.indexOfGen -= 1;
                    } else {
                        this.indexOfGen = this.generi.length - 1;
                    }
                }

                //Cicliamo con un foreach gl'elementi dell'array dischi e controlliamo
                //Che il loro genere corrisponda o meno al genere scelto dall'utente,
                //in caso di corrispondenza la key genreFound dell'oggetto ciclato diventerò true.
                //Se l'indice è 0 ("tutti"), tutti gl'oggetti avranno la variabile genreFound true.
                this.dischi.forEach((element) => {
                    if(this.indexOfGen == 0){
                        element.genreFound = true;
                    } else if (this.generi[this.indexOfGen] != element.genre) {
                        element.genreFound = false;
                    } else {
                        element.genreFound = true;
                    }
                });
            }
        },
        mounted() {
            axios
                .get('https://flynn.boolean.careers/exercises/api/array/music')
                .then((response) => {
                    const result = response.data;

                    //Con un ciglio foearch aggiungiamo la key genreFound impostata come true a tutti gli oggetti
                    result.response.forEach((element) => {
                        element.genreFound = true;
                    });

                    //Con la funzione sort li mettiamo in ordine crescente in base alla loro key year
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
