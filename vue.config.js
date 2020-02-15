module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `   
                    @import "~bulma/sass/utilities/_all";
                    @import "@/style/_palette.scss";
                    @import "bulma";
                    @import "~buefy/src/scss/buefy";
                    @import "@/style/main.scss";
                    `
      }
    }
  }
};