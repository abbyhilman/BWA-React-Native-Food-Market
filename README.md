# React Native Food Market
`Class RN in Build With Angga with back end laravel`

## Preparation
- Installing dependencies : Node, Python2, JDK
- Recommended install with [Chocolatey](https://chocolatey.org/install), Package manager for windows.
- Open CMD (Run as Administrator)

```bash
$ choco install -y nodejs.install python2 jdk8
$ npm install -g react-native-cli
```
- Download and install Android Studio
`Make sure the boxes next to all of the following are checked`:
  - Android SDK
  - Android SDK Platform
  - Performance (Intel ® HAXM)
  - Android Virtual Device
- Install the Android SDK. requires the `Android 6.0 (Marshmallow) SDK` in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.
- Configure the ANDROID_HOME environment variable.
- Run emulator. Only one device which allow debugging.
```bash
$ adb devices
```

## Installation

```bash
$ git clone https://github.com/abbyhilman/BWA-React-Native-Food-Market.git
$ cd BWA-React-Native-Food-Market
$ git checkout dev-ios for run ios || git checkout dev-android for run android
$ npm install
$ npm run android / npm run ios
```

If APK already installed on your emulator

```bash
$ react-native start
```

If something error with `watchman`

```bash
$ watchman watch-del-all
```
more command `$ react-native --help`

## Developer
if needed, made branch for every jobs you do.

```bash
$ git checkout -b [branch_name]
```
format branch : #no_[what did you do]
ex: #24_hotfix_banner

`Manual Update`

```bash
$ git status
$ git add [file_name] [file_name] [file_name]
$ git commit -m "what did you do" -n
$ git add [file_name] [file_name] [file_name]
$ git commit -m "what did you do" -n
...
..
.
$ git push origin [branch_name]
```

## Debugging
- Hot reloading
- Press R (twice & quickly) to refresh your application
