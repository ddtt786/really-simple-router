class Router {
    self = this;
    routes = [];
    root = "/";
    constructor(root = "/") {
        this.root = root;
        addEventListener("popstate", () => this.check());
        document.addEventListener("click", this.handleLinkClick);
    }
    add(path, cb) {
        this.routes.push({ path, cb });
        return this;
    }
    realPath(r) {
        return this.root + r.replace(this.root, "");
    }
    pathCheck(p, r) {
        const path = p.split("/").filter(Boolean);
        const route = this.realPath(r).split("/").filter(Boolean);
        if (path.length !== route.length) {
            return false;
        }
        return path.every((segment, i) => route[i][0] === ":" || segment === route[i]);
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
            const params = routeParams.reduce((p, el, i) => {
                if (el[0] === ":") {
                    p[el.slice(1)] = urlParams[i];
                }
                return p;
            }, {});
            cb(params);
        }
    }
    navigate(path = "") {
        history.pushState(null, "", this.realPath(path));
        this.check();
    }
    handleLinkClick = (event) => {
        if (event.defaultPrevented) {
            return;
        }
        let anchor = event.target;
        const path = (event.composedPath ? event.composedPath() : []);
        anchor = path.find(({ nodeName }) => nodeName && nodeName.toLowerCase() === "a");
        if (!anchor)
            return;
        event.preventDefault();
        this.navigate(anchor.pathname);
    };
}
export { Router };
