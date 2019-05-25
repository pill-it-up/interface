var app = new Vue({
  el: "#app",
  data: {
    title: "Pill It Up!",
    started: false,
    clicked: false,
    activateButtons: false,
    currentPill: "¯\\_(ツ)_/¯",
    cameraClicked: false,
    loading: false
  },
  methods: {
    updatePill: function() {
      if (this.loading) {
        return;
      }

      this.cameraClicked = true;
      setTimeout(() => {
        this.cameraClicked = false;
        this.currentPill = "?";
      }, 300);

      this.loading = true;
      axios
        .get("http://127.0.0.1:5000/newpill")
        .then(response => {
          console.log(response.data);
          this.currentPill = response.data.medication;
        })
        .catch(error => {
          console.log(error);
          this.currentPill = "?";
        })
        .finally(() => (this.loading = false));
    },

    startApp: function() {
      this.clicked = true;
      setTimeout(() => {
        this.clicked = false;
      }, 300);

      if (this.started) {
        axios
          .get("http://127.0.0.1:5000/stop")
          .then(response => {
            console.log(response.data);
            this.activateButtons = false;

            setTimeout(() => {
              this.started = false;
            }, 200);
          })
          .catch(error => {
            console.log(error);
          });

        return;
      }

      this.currentPill = "¯\\_(ツ)_/¯";

      axios
        .get("http://localhost:5000/start")
        .then(response => {
          console.log(response.data);
          this.started = true;

          setTimeout(() => {
            this.activateButtons = true;
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});
