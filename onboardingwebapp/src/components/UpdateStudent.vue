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
                    <input type="text" class="form-control" v-model="Student.name" required />
                </div>
                <div class="form-group">
                    <label for="Category">Choose a Category:</label>
                    <select v-model="Student.Category" name="Category" id="Category" class="form-control" @change="getRequiredDocs">
                        <option value="International">International</option>
                        <option value="Domestic">Domestic</option>
                    </select>
                </div>
                <div v-if="Student.Category !== 'Category' && reqDocuments!=null">
                <label for="documents" class="col-sm-2 col-form-label">Documents</label>
                 <div v-for="(value, key) in reqDocuments" :key="key">
                        <div class="form-check" style="margin-left: 27%;">
                            <input :value="key" class="form-check-input" type="checkbox" :id="'flexCheckChecked' + key" v-model="Student.Document">
                            <label class="form-check-label " :for="'flexCheckChecked' + key">
                                {{ key }}
                            </label>

                        </div>
                    </div>
                </div> 
                <div class="form-group">
                    <label>DOB</label>
                    <input type="date" class="form-control" v-model="Student.DOB" required />
                </div>
                <div class="form-group">
                    <label>Father Name</label>
                    <input type="text" class="form-control" v-model="Student.FatherName" required />
                </div>
                <div class="form-group">
                    <label>Mother Name</label>
                    <input type="text" class="form-control" v-model="Student.MotherName" required />
                </div>
                <div class="form-group">
                    <label>Last class Score</label>
                    <input type="number" class="form-control" v-model="Student.LastScore" required />
                </div>
                <button type="button" v-on:click="updateStudent" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="col-3"></div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue'
export default {
    name: 'AddStudent',
    components: {
        Header,
    },
    data() {
        return {
            Student: {},
            reqDocuments: []
        }
    },
    methods: {
        async updateStudent() {
            const result = await axios.put("http://localhost:3000/Student/" + this.$route.params.id, {
                name: this.Student.name,
                Category: this.Student.Category,
                Document: this.Student.Document,
                DOB: this.Student.DOB,
                FatherName: this.Student.FatherName,
                MotherName: this.Student.MotherName,
                LastScore: this.Student.LastScore
            });
            if (result.status == 200) {
                alert("Student Added")
            }
            this.$router.push({
                name: 'Home'
            })
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
    async mounted() {
        const result = await axios.get("http://localhost:3000/Student/" + this.$route.params.id);
        console.warn(result)
        this.Student = result.data
        this.getRequiredDocs();
    }

}
</script>

<style>
h4 {
    font-family: 'Roboto', sans-serif;
    color: #484848;
    font-weight: 700;
}
</style>
