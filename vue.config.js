module.exports = {
  css: {
    loaderOptions: {
      css: {
        data: `@import "@mdi/font";`
      },
      sass: {
        data: `   
                    @import "https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css";
                    @import "~bulma/sass/utilities/_all";
                    @import "@/style/_palette.scss";
                    @import "bulma";
                    @import "~buefy/src/scss/buefy";
                    @import "@/style/main.scss";
                    `
      }
    }
  },
  devServer: {
    hot: true,
  },
  pluginOptions: {
    electronBuilder: {
      outputDir: `./dist_electron/version ${process.env.npm_package_version}`,
      extraResources: ['./src/data/*']
    }
  }
};