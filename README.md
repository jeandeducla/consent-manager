# consent-manager

Globally manage your consent on the internet.

## browser support

- [x] Firefox
- [ ] Chrome
- [ ] Edge
- [ ] Safari

## install

Clone this repo and run:

```
npm install
```

and then:

```
npm run build
```

which will generate a `./build` directory at the root of this repository.

Then open `about:debugging#/runtime/this-firefox` in Firefox, click the `Load Temporary Add-On...` button and choose the `./build/manifest.json` file.
