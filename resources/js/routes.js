import PostsList from "./Pages/Post/posts.vue";
import CreatePost from "./Pages/Post/createpost.vue";
import EditPost from "./Pages/Post/editpost.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
export const routes = [
    {
        path: "/",
        name: "PostsList",
        component: PostsList,
    },
    {
        path: "/create-post",
        name: "CreatePost",
        component: CreatePost,
    },
    {
        path: "/edit-post/:id",
        name: "EditPost",
        component: EditPost,
    },


    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})
export default router
