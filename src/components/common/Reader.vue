<template>
    <div>
        <p
            v-for="(text, index) in data"
            :key="index"
        >
            {{ text }}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'Reader',
        props: {
            language: String,
            data: Array
        },
        mounted: function () {
            // prepare reader here
        }
    };
</script>

