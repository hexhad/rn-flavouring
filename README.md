# Configuring Environment Flavors in React Native

This guide demonstrates how to configure environment flavors for a React Native project to manage different settings for development, UAT (User Acceptance Testing), and production environments. This setup allows you to easily switch between environments without changing the codebase, a common requirement for apps that need separate configurations for different stages of deployment.

## Step 1: Install React Native Config

First, add react-native-config to your project:

```bash
yarn add react-native-config
```

## Step 2: Create Environment Configuration Files
Create four configuration files at the root of your project:

* `.env` (default environment)
* `.env.development` (for development)
* `.env.uat` (for User Acceptance Testing)
* `.env.production` (for production)

## Android Configuration

Modify `app/build.gradle`
Add the following configurations in your `app/build.gradle` file:

```groovy
apply plugin: "com.android.application"

// Define paths to environment config files
project.ext.envConfigFiles = [
   productiondebug: ".env.production",
   productionrelease: ".env.production",
   developmentrelease: ".env.development",
   developmentdebug: ".env.development",
   uatrelease: ".env.uat",
   uatdebug: ".env.uat"
]

// Apply the dotenv gradle file
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"

```
Then, define your product flavors inside the `android` block:

```groovy
android {
    ...
    flavorDimensions "default"
    productFlavors {
        production {
            minSdkVersion rootProject.ext.minSdkVersion
            applicationId "com.flavouring"
            targetSdkVersion rootProject.ext.targetSdkVersion
            versionCode 1
            versionName "1.0"
            resValue "string", "build_config_package", "com.flavouring"
        }
        uat {
            minSdkVersion rootProject.ext.minSdkVersion
            applicationId "com.flavouring.uat"
            targetSdkVersion rootProject.ext.targetSdkVersion
            versionCode 1
            versionName "1.0"
            resValue "string", "build_config_package", "com.flavouring.uat"
        }
        development {
            minSdkVersion rootProject.ext.minSdkVersion
            applicationId "com.flavouring.development"
            targetSdkVersion rootProject.ext.targetSdkVersion
            versionCode 1
            versionName "1.0"
            resValue "string", "build_config_package", "com.flavouring.development"
        }
    }
    ...
    buildTypes {
        debug {
            ...
            matchingFallbacks = ['debug', 'release']
        }
        ...
    }
}

```

## iOS Configuration
Modify `Podfile`

### Open code with `Xcode`
1. create targets by duplicating main app traget in my case `Flavouring`
![](/img/targets.png)

2. then go to the `schemes` and manage schemes and remove automatically added schemes when duplicated tragets and add `+` icons then automatically `Xcode` will show given duplicated tragets
![](/img/manage_schemes.png)

3. after finishing that Edit Scheme like this, with my case i have done this and added below line
```bash
echo ".env.production" > /tmp/envfile
```
* Development Scheme
![](/img/pre-action-dev.png)

* UAT Scheme
![](/img/pre-action-uat.png)

* Production Scheme
![](/img/pre-action-production.png)

4. after those config you will get the schemes like this 
![](/img/schemes.png)

### After `Xcode` configs do below `Podfile` config

Update your `Podfile` to include the `react-native-config` pod for different targets:

```ruby
...
target 'Flavouring' do
  ...
  pod 'react-native-config', :path => '../node_modules/react-native-config'
  pod 'react-native-config/Extension', :path => '../node_modules/react-native-config'
  ...
end

target 'FlavouringTests' do
  inherit! :complete
  # Pods for testing
end

target 'FlavouringDev' do
  # Specific configurations for Development
end

target 'FlavouringUat' do
  # Specific configurations for UAT
end
...

```

### Install Pods

```bash
npx pod-install ios/
```
### or 

```bash
cd ios && pod install
```

## Integrating Environment Variables in Your App
Finally, to use your environment variables within your React Native app, import and utilize `Config` from `react-native-config `in your App.js or any other component as needed:

```js
import Config from 'react-native-config';

const ENVIRONMENT = Config.ENV;
```

This setup allows you to manage and access environment-specific variables easily across your React Native application, streamlining the process of configuring different environments for development, testing, and production.