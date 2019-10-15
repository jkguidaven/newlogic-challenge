import Home from './components/pages/Home.vue';
import ConsentForm from './components/pages/Form.vue';
import ConsentConfirmation from './components/pages/Confirmation.vue';
import List from './components/pages/List.vue';
import VueRouter from 'vue-router';

export const routes = [
    { path: "/", label: "Home", component: Home },
    { path: "/consents", label: "Consents", component: List },
    { path: "/form", component: ConsentForm, props: true },
    { path: "/confirmation", component: ConsentConfirmation }
];

export const Router = new VueRouter({ routes });
