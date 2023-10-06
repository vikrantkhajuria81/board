<template>
<Header />
<div class="container px-4">
    <div class="row gx-5 mt-4">
        <div class="btn-group" role="group" aria-label="Basic example">
            <router-link to="add" class="btn btn-dark">On Board Student</router-link>
            <router-link to="/" class="btn btn-light">List of Students</router-link>
        </div>
    </div>
</div>
<div class="container">
    <div class="row" style="  border: 2px solid;">
        <div class="container px-4" style="margin-left: 100px;">
            <div class="row gx-5 mt-4">
                <div class="col">
                    <select class="form-control col-lg-4" v-model="Category" @change="showByCategory" style="border: 2px solid black;">
                        <option selected value="All">All</option>
                        <option value="International">International</option>
                        <option value="Domestic">Domestic</option>
                    </select>
                </div>
                <div class="col">
                    <input v-model="search" placeholder="Search Here" style="width:250px ;border: 2px solid black;">
                </div>
            </div>
        </div>
        <div v-for="item in filteredData" :key="item.id" class="col-lg-4 col-md-6 col-sm-12 item" :style="{ backgroundColor: item.Category === 'International' ? 'lightblue' : 'burlywood' }">
            <div class="qs-right">
                <div class="qs-heading mt-2">{{ item.name }}</div>
                <div class="qs-sub">{{ item.Category }}</div>
                <router-link :to="'/update/' + item.id" class="btn btn-success mx-2 my-4">Edit</router-link>
                <router-link :to="'/view/' + item.id" class="btn btn-secondary mx-2">
                    view
                </router-link>
                <button v-on:click="deleteStudent(item.id)" class="btn btn-danger" type="delete">Delete</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue'
export default {
    name: 'Home',
    data() {
        return {
            StudentData: [],
            allData:[],
            search: '',
            Category: 'All',
            filter:[]
        }
    },
    components: {
        Header
    },

    methods: {
        async deleteStudent(id) {
            const res = confirm("Are you sure you want to delete this item?")
            if (res) {
                await axios.delete("http://localhost:3000/Student/" + id)
            } else {
                return false
            }
            this.laodData()
        },
        async laodData() {
            let result = await axios.get("http://localhost:3000/Student")
            this.allData= this.StudentData = result.data
        },
    },
    mounted() {
        this.laodData()
    },
    computed: {
        filteredData(){
            return this.StudentData.filter(student => student.name.toLowerCase().includes(this.search.toLowerCase()))
        },
        showByCategory() {
            if (this.Category === 'All') {
                this.StudentData = this.allData
            } else if (this.Category === 'International') {
                this.StudentData = this.allData.filter(Student => Student.Category === 'International')
            } else {
                this.StudentData = this.allData.filter(Student => Student.Category === 'Domestic')
            }
        }
    }
}
</script>

<style>
.item {
    width: 355px;
    height: 145px;
    box-shadow: 10px 8px 14px 2px;
    margin: 5px;
    margin-top: 5%;
    margin-left: 10%;
    border-radius: 20px;
    margin-bottom: 40px;
    border: 2px solid gray;

}

.qs-heading {
    font-size: 25px;
    font-weight: bold;
    font-family: Georgia, 'Times New Roman', Times, serif;
}

.qs-sub {
    font-size: 15px;
    font-style: italic;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>
