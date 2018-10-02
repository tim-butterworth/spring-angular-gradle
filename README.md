## Run Commands

### To clean everything

```
gw cleanAll
```

### To build everything

```
gw buildAll
```

### To test everything

```
gw testAll
```

### To run the app

```
gw buildAndRunServer
```

or if everything is already build:

```
gw bootRun
```

### To copy the angular application into spring

```
gw copyJsToServer
```

or with a watch

```
gw copyJsToServer -t
```

## Live reloading of angular application

This project is setup to run spring boot with angular automatically reloading using 3 gradle tasks running in separate tabs.  The three tasks are:

 - gw bootRun // starts spring
 - gw :applications/angular-app:buildWatch // builds angular on a watch (outputs to dist)
 - gw copyJsToServer -t // copies angular artifacts from dist to spring /resources/public directory (-t is a gradle watch)

It is completely possible to change the output of the angular build to be the spring /resources/public directory and then only need two tasks but this particular build is setup so that angular does not know about spring and spring does not know about angular.

### Spring Changes:

- Add SpringBoot devtools dependency (applications/server/build.gradle)

```
compile("org.springframework.boot:spring-boot-devtools")
```

- Configure bootRun task to add the static resources to the classpath (applications/server/build.gradle)

```
bootRun {
    sourceResources sourceSets.main
}
```

This configuration is appropriate for SpringBoot 2.0.x but it is different for older versions. The documentation can be found [here](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/).

### Angular changes:

- Add livereload (applications/angular-app/main.ts)

```
if (environment.production) {
  enableProdMode();
} else {
   const script = document.createElement('script')
   script.setAttribute('src', 'http://localhost:35729/livereload.js')
   document.body.appendChild(script)
}
```

This works because SpringBoot devtools starts up a live-reload server in the background on a magic port `35729`. Documentation can be found for SpringBoot [here](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html) and for livereload.js [here](https://github.com/livereload/livereload-js).

- Add a build with watch task to angular (applications/angular-app/build.gradle)

```
task buildJsWatch(type: Exec) {
  commandLine('yarn', 'run', 'ng', 'build', '--watch')
}
```