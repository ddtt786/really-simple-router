# simple-typescript-router

A really simple JavaScript/TypeScript router

- ~1kb minified ~0.6kb compressed

npm

```ts
import { Router } from "simple-typescript-router";

const router = new Router();
const title = <HTMLHeadingElement>document.querySelector("#title");

router
  .add("/blog/:id/post/:postid", ({ id, postid }) => {
    title.innerText = `blog ${id} : ${postid}`;
  })
  .add("/", () => {
    title.innerText = "home";
  })
  .add("_404", () => {
    title.innerHTML = "404";
  })
  .check();
```

web

```ts
import { Router } from "https://esm.sh/simple-typescript-router";

const router = new Router();
const title = <HTMLHeadingElement>document.querySelector("#title");

router
  .add("/blog/:username/post/:postid", ({ username, postid }) => {
    title.innerText = `${username} : ${postid}`;
  })
  .add("/", () => {
    title.innerText = "home";
  })
  .add("_404", () => {
    title.innerHTML = "404";
  })
  .check();
```
