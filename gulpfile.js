"use strict";

 var gulp = require("gulp"),
 $ = require("gulp-load-plugins")(),
 del = require("del"),
 config = require("./gulp.config");

 gulp.task("watch", function(){
    gulp.watch(config.rootPath+"/*.js", ["compileTs"]);
    gulp.watch(config.rootPath+"/*.scss", ["sass"]);
 });

gulp.task("sass", function(){
    return gulp.src(config.rootPath+"/*.scss")
    .pipe($.sass().on("error", $.sass.logError))
    .pipe(gulp.dest(config.destPath));
});

gulp.task("compileTs",function(){
    return gulp.src(config.rootPath+"/*.ts")
    .pipe($.typescript())
    .pipe($.concat("app.js"))
    .pipe(gulp.dest(config.destPath));
});

gulp.task("minifyCss", ["sass"], function(){
    gulp.src(config.destPath+"/*app.css")
    .pipe($.cssmin())
    .pipe($.concat("app.min.css"))
    .pipe(gulp.dest(config.distPath));
});

gulp.task("minifyJs", ["compileTs"], function(){
    gulp.src(config.destPath+"/*.js")
    .pipe($.uglify())
    .pipe($.concat("app.min.js"))
    .pipe(gulp.dest(config.distPath));
});

gulp.task("cleanJs", function () {
    del(config.destPath+"/*.{js,css}");
    del(config.distPath+"/*.{js,css}");
});

gulp.task("publish", ["cleanJs", "minifyJs", "minifyCss"]);





