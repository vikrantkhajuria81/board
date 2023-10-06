<template>
<Header />

<div class="container ">
    <div class="row">
        <div class="col-12 text-center">
            <h4 class="pt-3">OnBoard Student</h4>
        </div>
    </div>
    <ul>
        <li v-for="item in error" v-bind:key="item">
            <p style="color: red;">{{ item }} is not valid</p>
        </li>
    </ul>
    <div class="row">
        <div class="col-3"></div>
        <div class="col-md-6 px-5 px-md-0">
            <form>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="Student.name" />
                </div>
                <div class="form-group">
                    <label for="Category">Choose a Category:</label>
                    <select v-model="Student.Category" name="Category" id="Category" class="form-control" @change="getRequiredDocs">
                        <option value="International">International</option>
                        <option value="Domestic">Domestic</option>
                    </select>
                </div>
                <!-- documents -->
                <div class="form-check">
                    <div v-if="Student.Category !== 'Category'">
                        <div v-for="(value, key) in reqDocuments" :key="key" class="form-control">
                            <input type="checkbox" v-model="Student.Document">
                            {{ key }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>DOB</label>
                    <input type="date" class="form-control" v-model="Student.DOB" />
                </div>
                <div class="form-group">
                    <label>Father Name</label>
                    <input type="text" class="form-control" v-model="Student.FatherName" />
                </div>
                <div class="form-group">
                    <label>Mother Name</label>
                    <input type="text" class="form-control" v-model="Student.MotherName" />
                </div>
                <div class="form-group">
                    <label>Last class Score</label>
                    <input type="number" class="form-control" v-model="Student.LastScore" />
                </div>
                <button type="button" v-on:click="addStudent" class="btn btn-dark">Submit</button>
            </form>
        </div>
        <div class="col-3"></div>
    </div>
</div>
</template>

<script>
import {
    Form,
    Field,
    ErrorMessage
} from 'vee-validate'
import axios from 'axios'
import Header from './Header.vue'
export default {
    name: 'AddStudent',
    components: {
        Header,
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            Student: {
                name: '',
                Category: '',
                Document: [],
                DOB: '',
                FatherName: '',
                MotherName: '',
                LastScore: ''
            },
            reqDocuments: null,
            error: []
        }
    },
    methods: {
        isRequired(value) {
            if (value && value.trim) {
                return true;
            }
            return 'This Field is Reuired'
        },
        async addStudent()  {
            this.error = []
            for (const item in this.Student) {
                if (this.Student[item] === "" || this.Student[item].length === 0) {
                    this.error.push(item)
                } else if (this.error.length === 0) {
                    let result = await axios.post('http://localhost:3000/Student', {
                        name: this.Student.name,
                        Category: this.Student.Category,
                        Document: this.Student.Document,
                        DOB: this.Student.DOB,
                        FatherName: this.Student.FatherName,
                        MotherName: this.Student.MotherName,
                        LastScore: this.Student.LastScore
                    })
                    if (result.status == 201) {
                        alert("Student Added")
                    }     
                }
                 this.$router.push({
                    name: 'Home'
                })
            }

        },
        async getRequiredDocs() {
            let url = "http://localhost:3000/";
            if (this.Student.Category === 'International') {
                url += 'international_docs';
            } else if (this.Student.Category === 'Domestic') {
                url += 'domestic_docs';
            }
            let response = await axios.get(url);
            this.reqDocuments = response.data;
        },
    },
}
</script>

<style scoped>
h4 {
    font-family: 'Roboto', sans-serif;
    color: #484848;
    font-weight: 700;
}
</style>
