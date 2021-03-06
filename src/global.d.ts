// necessary to make scss module work. See https://github.com/gatsbyjs/gatsby/issues/8144#issuecomment-438206866
declare module '*.sass' {
    const content: { [className: string]: string };
    export = content;
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}