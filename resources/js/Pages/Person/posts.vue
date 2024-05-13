<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <h1>Posts</h1>
                <router-link to="/create-post" class="btn btn-secondary"
                >Create</router-link
                >
            </div>
        </div>
        <div class="card-body">
            <table class="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>age</th>
                    <th>nationalityID</th>
                    <th>birthDate</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(post, key) in posts" :key="post.personal_id">
                    <td>{{ key }}</td>
                    <td>{{ post.name }}</td>
                    <td>{{ post.age }}</td>
                    <td>{{ post.nationalityID }}</td>
                    <td>{{ post.birthDate }}</td>
                    <td>
                        <router-link
                            :to="{
                                name: 'EditPost',
                                params: { id: post.personal_id },
                            }"
                            class="btn btn-info"
                        >Edit</router-link
                        >
                        <button
                            type="button"
                            class="btn btn-danger ms-2"
                            v-on:click="deletePost(post.personal_id)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "../config/axios.js";
import toastr from "toastr";
export default {
    name: "Posts",
    data() {
        return {
            posts: [], // Initial state
        };
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        async getPosts() {
            let res = await axios.get("/api/posts");
            this.posts = res.data.posts;
        },
        async deletePost(id) {
            // Display a confirmation dialog
            if (confirm('Are you sure you want to delete this post?')) {
                try {
                    let res = await axios.get(`/api/posts/delete/${id}`);
                    toastr.success(res.data.message);
                    this.getPosts();
                } catch (error) {
                    let errors = error.response.data.errors;
                    for (let key in errors) {
                        toastr.error(errors[key]);
                    }
                }
            }
        }
    },
};
</script>


