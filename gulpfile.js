var gulp = require("gulp"),
	fileinclude = require('gulp-file-include'),
    replace = require("gulp-replace"),
    less = require("gulp-less"),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin');

gulp.task("html",function(){
	gulp.src(["src/**/*.html","!src/public/*.html"])
		.pipe(fileinclude({
			prefix: "@@",
			basepath: "@file",
			context:{
				slidebar:true//控制是否显示slidebar菜单栏
			}
		}).on("error",function(err){
			console.log(err);
		}))
		.pipe(gulp.dest("dist"));

});

gulp.task("css",function(){
	gulp.src("src/**/*.less")
	    .pipe(less())
	    .pipe(autoprefixer({ //自动为css添加兼容前缀
		    browsers: ['Explorer >= 9.0', 'Firefox >= 11.0','Chrome >= 17.0'],
		    remove:true //是否去掉不必要的前缀 默认：true 
		}))
	    .pipe(cssmin()) 
	    .pipe(gulp.dest("dist"));
});


gulp.task("image",function(){
	gulp.src("src/img/*")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/img"));
});
gulp.task("lyx",["html","css","image"]); 

gulp.task("default",["lyx"],function(){
	gulp.watch(["src/**/*.html"],["html"]);
	gulp.watch(["src/**/*.less"],["css"]);
});


