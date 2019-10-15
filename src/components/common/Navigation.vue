<template>
    <nav>
        <ul class="nav justify-content-end">
            <li class="nav-item" v-for="item in items" v-bind:key="item.label">
                <router-link class="nav-link" v-bind:to="item.path" v-if="item.label">
                    {{ item.label }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: ['items']
}
</script>

