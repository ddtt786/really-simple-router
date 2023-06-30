interface RouteParams {
    [key: string]: string;
}
interface Route {
    path: string;
    cb: (params: RouteParams) => any;
}
declare class Router {
    routes: Route[];
    root: string;
    constructor(root?: string);
    add(path: string, cb: (params: RouteParams) => any): this;
    private realPath;
    private pathCheck;
    check(): void;
    private navigate;
    private handleLinkClick;
}
export { Router };
