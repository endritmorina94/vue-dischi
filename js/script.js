var app = new Vue(
    {
        el: '#root',
        data: {
            dischi: [],
            generi:["All"],
            indexOfGen: -1,
            genreChoosen: false
        },
        methods: {
            changeGenre(){
                this.genreChoosen = true;

                if(true){
                    if(this.indexOfGen < this.generi.length - 1){
                        this.indexOfGen += 1;
                    } else {
                        this.indexOfGen = 0;
                    }
                } else {
                    if(this.indexOfGen < 0){
                        this.indexOfGen -= 1;
                    } else {
                        this.indexOfGen = this.generi.length - 1;
                    }
                }

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
                    result.response.forEach((element) => {
                        element.genreFound = true;
                    });

                    this.dischi = result.response;
                    this.dischi.forEach((element) => {
                        if(!this.generi.includes(element.genre)) {
                            this.generi.push(element.genre);
                        }
                    });

                    console.log(this.generi)
                    console.log(this.dischi)

                });
        }
    }
);
