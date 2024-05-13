<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <h1>Create Posts</h1>
                <router-link to="/" class="btn btn-secondary">Back</router-link>
            </div>
        </div>
        <div class="card-body">
            <form action="">
                <div class="form-group">
                    <label for="title">Title;</label>
                    <input type="text" name="title" id="title" class="form-control" v-model="post.title" />
                </div>
                <div class="form-group">
                    <label for="description">Description;</label>
                    <input type="text" name="description" id="description" v-model="post.description"
                           class="form-control" />
                </div>
                <button type="button" class="btn btn-secondary mt-2" v-on:click="savePost()">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "../config/axios.js";
import toastr from "toastr";

export default {
    name: 'Posts',
    data() {
        return {
            post: {} // Initial state
        };
    },
    methods: {
        async savePost() {
            try {

                let res = await axios.post('/api/posts/save', this.post);
                toastr.success('Post saved Successfully')
                this.post = {}

                // Redirect to the home page
                this.$router.push('/');


            } catch (error) {
                let errors = error.response.data.errors
                for (let key in errors) {
                    toastr.error(errors[key])
                }
            }
        },

    }
}
</script>


