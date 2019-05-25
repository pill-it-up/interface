var app = new Vue({
    el: '#app',
    data: {
        title: 'Pill It Up!',
        started: false,
        activateButtons: false,
    },
    methods: {
        updatePill: () => {

        },

        startApp: function () {
            if (this.started) {
                this.activateButtons = false;

                const buttons = this.$el.querySelector('.buttons');
                const startFalse = () => {
                    this.started = false;
                    buttons.removeEventListener('transitionend', startFalse);
                }

                buttons.addEventListener('transitionend', startFalse);

                return;
            }

            this.started = true;

            const transition = this.$el.querySelector('.logo');
            const buttonsTrue = () => {
                this.activateButtons = true;
                transition.removeEventListener('transitionend', buttonsTrue);
            }

            transition.addEventListener('transitionend', buttonsTrue);
        }
    },
})
