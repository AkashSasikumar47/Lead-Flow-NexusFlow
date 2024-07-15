const Inquiry = Vue.component('inquiry', {
    template: `<div>  <main id="main" class="main">

    <div class="pagetitle">
        <h1>Inquiries</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item">Management</li>
                <li class="breadcrumb-item active">Inquiries</li>
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Inquiries</h5>
                        <div class="alert alert-danger" v-if="error">
                        {{ error }}
                        </div>
                        <!-- Button to add Inquiry -->
                        <button type="button" class="btn btn-primary mb-3" data-bs-toggle="modal"
                            data-bs-target="#verticalycentered"> Add Inquiry
                        </button>
                        <div>
                        <div class="mb-3">
                            <input type="file" @change="handleFileUpload" accept=".xlsx" class="form-control" id="excelFile">
                            <button @click="uploadExcel" class="btn btn-success mt-2">Upload Excel</button>
                        </div>
                        <div v-if="uploadMessage" class="alert" :class="{'alert-success': !uploadMessage.includes('Error'), 'alert-danger': uploadMessage.includes('Error')}">
                            {{ uploadMessage }}
                        </div>
                        </div>

                        

                        <!-- Data Table -->
                        <div class="table-responsive">
                            <table class="table datatable">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Company Name</th>
                                        <th scope="col">Organizer</th>
                                        <th scope="col">Location/Area</th>
                                        <th scope="col">Number of Pax</th>
                                        <th scope="col">D.O.E</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Contact</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="lead in leads"   >
                                        <th scope="row">{{lead.id}}</th>
                                        <td> {{lead.Company_Name}} </td>
                                        <td>{{lead.Organizer}}</td>
                                        <td>{{lead.Location_Area}}</td>
                                        <td>{{lead.Pax}}</td>
                                        <td>{{lead.date_of_event}}</td>
                                        <td>
                                        <span v-if="lead.progress === 'Confirmed'" class="badge bg-confirmed badge-pill">
                                        <i class="bi bi-emoji-sunglasses me-1"></i> {{ lead.status }}
                                        </span>

                                        <span v-if="lead.progress === 'In progress'" class="badge bg-progress badge-pill"><i
                                        class="bi bi-emoji-neutral me-1"></i> {{lead.status}}</span>

                                        <span v-if="lead.progress === 'Lost'" class="badge bg-lost badge-pill"><i
                                        class="bi bi-emoji-frown me-1"></i> {{lead.status}}</span>
                                    
                                            
                        
                                            <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" :data-bs-target="'#editModal' + lead.id">
                                                <i class="bi bi-pencil-square"></i>
                                            </button> 
                                            
                                        </td>
                                        <td>
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-primary dropdown-toggle" type="button"
                                                    data-bs-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <i class="bi bi-telephone"></i>
                                                </button>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" :href="'mailto:'+lead.email">Email:
                                                        {{lead.email}}</a>
                                                    <a class="dropdown-item" :href="'tel:'+lead.contact_no">Contact Number:
                                                    {{lead.contact_no}}</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-danger" @click="deletelead(lead.id)"> Delete </button>                                                                                                                         
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- End Data Table -->

                    </div>
                </div>
            </div>
        </div>
    </section>

</main>

<div class="modal fade" id="verticalycentered" tabindex="-1">
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Lead Capture Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row g-3">
                <div class="col-md-6">
                <div class="form-floating">
                    <input v-model="Company_Name" type="text" class="form-control" id="floatingCompanyName"
                        placeholder="Company Name" name="floatingCompanyName">
                    <label for="floatingCompanyName">Company Name</label>
                </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating">
                        <input v-model="Organizer" type="text" class="form-control" id="floatingOrganizer"
                            placeholder="Organizer" name="floatingOrganizer">
                        <label for="floatingOrganizer">Organizer</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating">
                        <input v-model="Location_Area" type="text" class="form-control" id="floatingLocationArea"
                            placeholder="Location or Area" name="floatingLocationArea">
                        <label for="floatingLocationArea">Location or Area</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating">
                        <input v-model="Date" type="date" class="form-control" id="floatingEventDate"
                            placeholder="Date of the Event" name="floatingEventDate">
                        <label for="floatingEventDate">Date of the Event</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating">
                        <input v-model="Pax" type="number" class="form-control" id="floatingPax"
                            placeholder="No. of Pax" name="floatingPax">
                        <label for="floatingPax">No. of Pax</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating">
                        <textarea v-model="FoodType" class="form-control" id="floatingFoodType"
                            placeholder="Exact Food Type Required" rows="4" name="floatingFoodType"></textarea>
                        <label for="floatingFoodType">Exact Food Type Required</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating">
                        <input v-model="Email" type="email" class="form-control" id="floatingEmail"
                            placeholder="Email address" name="floatingEmail">
                        <label for="floatingEmail">Email address</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating">
                        <input v-model="ContactNumber" type="tel" class="form-control"
                            id="floatingContactNumber" placeholder="Contact_number"
                            value="+971" name="Contact_number">
                        <label for="floatingContactNumber">Contact number</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating">
                        <div>Status:</div>
                        <div class="form-check form-check-inline">
                            <input v-model="status" class="form-check-input" type="radio" name="status"
                                id="statusInProgress" value="In progress">
                            <label class="form-check-label" for="statusInProgress">In
                                progress</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input v-model="status" class="form-check-input" type="radio" name="status"
                                id="statusConfirmed" value="Confirmed">
                            <label class="form-check-label"
                                for="statusConfirmed">Confirmed</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input v-model="status" class="form-check-input" type="radio" name="status"
                                id="statusLost" value="Lost">
                            <label class="form-check-label"
                                for="statusLost">Lost</label>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <button type="button" @click="addlead" class="btn btn-primary" data-bs-dismiss="modal"  >Submit</button>
                    <!-- <button type="reset" class="btn btn-secondary">Reset</button> -->
                </div>
            </div>
        </div>
    </div>
</div>
</div>


<div v-for="lead in leads" :key="lead.id">
          <div class="modal fade" :id="'editModal' + lead.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="'editModalLabel' + lead.id" aria-hidden="true">
             <div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                      <h1 class="modal-title fs-5" :id="'editModal' + lead.id">Edit Category</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div class="modal-body">
                   <div class="my-3">
                   <label for="title"> Edit Status </label>
                   <select v-model="lead.progress" id="editstatus" class="form-control">
                       <option value="Confirmed">Confirmed</option>
                       <option value="In progress">In progress</option>
                       <option value="Lost">Lost</option>
                   </select>
                    </div>
                   </div>
                   <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" @click="editstatus(lead)" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                   </div>
                </div>
             </div>
          </div>
       </div>





</div>
`,

    data: function () {
        return {
            leads : [],
            Company_Name: null,
            Organizer: null,
            Location_Area: null,
            Date: null,
            Pax: null,
            FoodType: null,
            Email: null,
            ContactNumber: null,
            status: null,
            userRole: localStorage.getItem('role'),
            token: localStorage.getItem('auth-token'),
            error: null,
            selectedFile: null,
            uploadMessage: '',
        }
    },

    methods: {

        async getleads(){
            const res = await fetch("/api/inquiry",
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authentication-Token': this.token,
                    'Authentication-Role': this.userRole,
                },
            });
            if(res.ok){
                const data = await res.json();
                console.log(data);
                this.leads = data;
            }
            else {
                const data = await res.json();
                console.log(data);
                this.error = res.statusText;
            }
        },



        async addlead(){
            const res = await fetch("/api/inquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": this.token,
                    "Authentication-Role": this.userRole,
                },
                body: JSON.stringify({
                    Company_Name: this.Company_Name,
                    Organizer: this.Organizer,
                    Location_Area: this.Location_Area,
                    date_of_event: this.Date,
                    Pax: this.Pax,
                    req_food: this.FoodType,
                    email: this.Email,
                    contact_no: this.ContactNumber,
                    progress: this.status
                }),
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                this.getleads();
            }
            else {
                const data = await res.json();
                console.log(data);
                alert("Error!");
            }
        },

        async deletelead(id) {

            //are you sure?
            if (!confirm("Are you sure you want to delete this lead?")) {
                return;
            }
            const res = await fetch("/api/inquiry/"+id, {
                method: "DELETE", 
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": this.token,
                    "Authentication-Role": this.userRole,
                },
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                this.getleads();
            }
            else {
                const data = await res.json();
                console.log(data);
                alert("Error!");
            }
        },

        async editstatus(lead){
            const res = await fetch("/api/inquiry/"+lead.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": this.token,
                    "Authentication-Role": this.userRole,
                },
                body: JSON.stringify({
                    progress: lead.progress,
                }),
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                this.getleads();
            }
            else {
                const data = await res.json();
                console.log(data);
                alert("Error!");
            }
        },

        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },

        uploadExcel() {
            if (!this.selectedFile) {
                alert('Please select a file first');
                return;
            }

            const formData = new FormData();
            formData.append('file', this.selectedFile);

            fetch('/api/upload-excel', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authentication-Token': this.token,
                    'Authentication-Role': this.userRole,
                }
            })
            .then(response => response.json())
            .then(data => {
                this.uploadMessage = data.message;
                if (!data.message.includes('Error')) {
                    this.getleads(); // Refresh the list after successful upload
                }
            })
            .catch(error => {
                this.uploadMessage = 'An error occurred during upload';
                console.error('Error:', error);
            });
        },
    
    },

    mounted: function () {
        document.title = "Inquiry";
        this.getleads();
    }
});

export default Inquiry;