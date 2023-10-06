<template>
<Header />
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">OnBoard Student</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-md-6 px-5 px-md-0">
                <form>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" disabled v-model="Student.name" required />
                    </div>
                    <div class="form-group">
                        <label for="Category">Choose a Category:</label>
                        <select v-model="Student.Category" name="Category" id="Category" disabled class="form-control">
                            <option value="International">International</option>
                            <option value="Domestic">Domestic</option>
                        </select>
                    </div>
                    <!-- documents -->

                <div v-if="Student.Category !== 'Category'">

                    <label for="documents" class="col-sm-2 col-form-label">Documents</label>

                    <div v-for="(value, key) in Student.Document" :key="key">

                        <div class="form-check" style="margin-left: 27%;">
                            <input :value="value" class="form-check-input" type="checkbox" :id="'flexCheckChecked' + key" v-model="Student.Document">
                            <label class="form-check-label " :for="'flexCheckChecked' + key">
                                {{ value }}
                            </label>
    
                        </div>
                    </div>
                </div>
                    <div class="form-group">
                        <label>DOB</label>
                        <input type="date" class="form-control" disabled v-model="Student.DOB" required />
                    </div>
                    <div class="form-group">
                        <label>Father Name</label>
                        <input type="text" class="form-control" disabled v-model="Student.FatherName" required />
                    </div>
                    <div class="form-group">
                        <label>Mother Name</label>
                        <input type="text" class="form-control" disabled v-model="Student.MotherName" required />
                    </div>
                    <div class="form-group">
                        <label>Last class Score</label>
                        <input type="number" class="form-control" disabled v-model="Student.LastScore" required />
                    </div>
                    <button type="button" v-on:click="addStudent" disabled class="btn btn-primary">Submit</button>
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
    props: ["Student"],
    data() {
        return {
            Student: {},
            reqDocuments:null
        }
    },

    async mounted() {
        const result = await axios.get("http://localhost:3000/Student/" + this.$route.params.id);
        this.Student = result.data
    },
}
</script>

<style>
h4 {
    font-family: 'Roboto', sans-serif;
    color: #484848;
    font-weight: 700;
}
</style>
