import NProgress from "nprogress"
import "nprogress/nprogress.css"

export const onPreRouteUpdate = () => {
    NProgress.start()
}

export const onRouteUpdate = () => {
    NProgress.done()
}