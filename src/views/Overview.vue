<template>
    <div class="content">
        <form action=""><input v-model="name" ref="name" type="text"><button @click.prevent="setName" class="button">submit</button></form>
        <h1>{{name}}</h1>
        <button class="button" @click="removeName">remove</button>
    </div>
</template>
<script>
const storage = window.localStorage;
export default {
    data() {
        return {
            name: ''
        }
    },
    computed: {
        /*name() {
            return storage.getItem('name')
        }*/
    },
    methods: {
        setName() {         
            let name = this.$refs.name.value;
            storage.setItem('name', name);
            this.name = name;
        },
        removeName() {         
            storage.removeItem('name', name);
            this.name = '';
        }
    },
    created() {
            this.name = storage.getItem('name')
    },
    watch: {
        name(newName, oldName) {
            storage.setItem('name', newName);
            return this.name=newName
        }
    }
}
</script>