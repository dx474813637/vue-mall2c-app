
const px2rem = require("postcss-px2rem");
const path = require("path");

module.exports = {
	pluginOptions: {
		"style-resources-loader": {
			preProcessor: "less",
			patterns: [path.resolve(__dirname, "./src/common/main.less")],
		},
	},
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					px2rem({
						remUnit: 37.5,
					}),
				],
			},
		},
	},
};
