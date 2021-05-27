// Custom types so TypeScript won't complain about certain properties that a few types don't have mapped
// or files being imported.

declare module "*.svg" {
    const content: any;
    export default content;
}

declare interface Element {
    value: any;
}