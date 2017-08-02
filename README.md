# README #

Shared components to be used in HSL projects. React and styled components.

### Summary of set up ###
- Install Lerna
```
npm install --global lerna

lerna bootstrap
```

### Installing git hooks ###

`hooks/init-hooks`

### Running the web storybook ###

`yarn storybook:web`

### Running the native storybook ###

`yarn storybook`

[Running devices](https://github.com/storybooks/storybook/blob/master/app/react-native/docs/using-devices.md)

#### TL;DR ####

IOS
- ?

Android
- launch emulator/device
- `yarn storybook`
- ```
  adb reverse tcp:8081 tcp:8081
  adb reverse tcp:9001 tcp:9001
  adb reverse tcp:7007 tcp:7007
  yarn run android
  ```

### Usage in application ###

`yarn add hsl-shared-components`

or

`npm i --save hsl-shared-components`

In the desired react class use named imports to get the components needed:
`import {Button} from 'hsl-shared-components';`

### Writing components ###

Make a folderstructure like src/ComponentX/ComponentX.js. (if it needs many files make the ComponentX.js the main one)

When finishing the component add it as an import and a named export to the src/index.js file.

Native components to src/native/index.js

### Update github pages ###
`yarn deploy-storybook`

### Publish package ###
[Bump version](https://docs.npmjs.com/cli/version)

`yarn build`

`cd build && npm publish`

## Documentation
* [Z-Index Index](docs/ZIndex.md)

## Common problems ##

### AVD manager button is disabled ###
- Try running Android Studio in administrator mode
or
- Delete .idea folder
- Reopen the project
- Configure the project when studio suggests it

### Mocking a dependency in tests ###
- Example of mocking Touchable in a test
```
  jest.mock('hsl-shared-components/lib/Touchable/Touchable', () => {
    const View = require.requireActual('hsl-shared-components/lib/View/View');
    return View;
  });
```
