interface RouteParams {
  [key: string]: string;
}

interface Route {
  path: string;
  cb: (params: RouteParams) => any;
}

class Router {
  self = this;
  routes: Route[] = [];
  root: string = "/";

  constructor(root: string = "/") {
    this.root = root;
    addEventListener("popstate", () => this.check());
    document.addEventListener("click", this.handleLinkClick);
  }

  add(path: string, cb: (params: RouteParams) => any): this {
    this.routes.push({ path, cb });
    return this;
  }

  private realPath(r: string): string {
    return this.root + r.replace(this.root, "");
  }

  private pathCheck(p: string, r: string): boolean {
    const path = p.split("/").filter(Boolean);
    const route = this.realPath(r).split("/").filter(Boolean);

    if (path.length !== route.length) {
      return false;
    }

    return path.every(
      (segment, i) => route[i][0] === ":" || segment === route[i]
    );
  }

  check() {
    const matchingRoute = this.routes.find((route) => {
      const { path } = route;
      const match = this.pathCheck(location.pathname, path);
      return match || path === "_404";
    });

    if (matchingRoute) {
      const { path, cb } = matchingRoute;
      const urlParams = location.pathname.split("/").filter(Boolean);
      const routeParams = this.realPath(path).split("/").filter(Boolean);

      const params: RouteParams = routeParams.reduce((p: any, el, i) => {
        if (el[0] === ":") {
          p[el.slice(1)] = urlParams[i];
        }
        return p;
      }, {});

      cb(params);
    }
  }

  navigate(path: string = "") {
    history.pushState(null, "", this.realPath(path));
    this.check();
  }

  private handleLinkClick = (event: MouseEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    let anchor = event.target;

    const path = (
      event.composedPath ? event.composedPath() : []
    ) as HTMLElement[];

    anchor = path.find(
      ({ nodeName }) => nodeName && nodeName.toLowerCase() === "a"
    ) as HTMLElement;

    if (!anchor) return;

    event.preventDefault();

    this.navigate((<HTMLAnchorElement>anchor).pathname);
  };
}

export { Router };
