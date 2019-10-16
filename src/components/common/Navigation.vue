<template>
    <header>
        <nav class="nav justify-content-end">
            <li
                class="nav-item"
                v-for="item in items" 
                :key="item.label"
            >
                <router-link
                    class="nav-link"
                    v-bind:to="item.path"
                    v-if="item.label"
                >
                    {{ item.label }}
                </router-link>
            </li>
        </nav>
    </header>
</template>

<script>
    export default {
        name: 'Navigation',
        props: {
            items: Array
        }
    };
</script>

<style scoped>
.nav-link {
    color: black;
}

.nav-link.router-link-exact-active  {
    font-weight: bold;
}
</style>
