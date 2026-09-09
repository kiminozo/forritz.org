interface MenuConfig {
    name: string;
    link: string;
    active?: string[];
    sub?: MenuConfig[];
}

const menusConfig: MenuConfig[] =
    [{
        name: "首页",
        link: "/"
    }, {
        name: "介绍",
        link: "",
        sub: [{
            name: "详细生平",
            link: "/biography"
        }, {
            name: "音乐年表",
            link: "/performance"
        }, {
            name: "Ritzstar",
            link: "/ritzstar"
        }]
    }, {
        name: "文章",
        link: "/categories",
        sub: [{
            name: "岡崎Today",
            active: ["okazaki-today"],
            link: "/category/okazaki-today/"
        }, {
            name: "Rain or Shine",
            active: ["rain-or-shine"],
            link: "/category/rain-or-shine"
        }, {
            name: "Photo日记",
            active: ["photo-diary"],
            link: "/category/photo-diary"
        }]
    }, {
        name: "唱片集",
        active: ["songs", "composer", "lyricist", "vocal", "arranger"],
        link: "/discography"
    }];

export { MenuConfig, menusConfig }
