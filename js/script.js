var app = new Vue(
    {
        el: '#root',
        data: {
            dischi: []
        },
        methods: {
        },
        mounted() {
            axios
                .get('https://flynn.boolean.careers/exercises/api/array/music')
                .then((response) => {
                    const result = response.data;
                    this.dischi = result.response;
                    console.log(this.dischi);
                });
        }
    }
);
