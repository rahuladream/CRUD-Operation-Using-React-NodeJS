var StudentAll = React.createClass({ 

  getInitialState: function (props) {
    return { name: '' ,address: '',email:'',contact:'',id:'',Buttontxt:'Save', data1: [],
    formErrors: {name: '' ,address: '',email:'',contact:''},
      emailValid: false,
      nameValid: false,
      addressValid: false,
      contactValid: false,
      formValid: false,
  };
  },

   handleUserInput: function(e) {

      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},
                  () => { this.validateField(name, value) });
    },

      validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let emailValid = this.state.emailValid;
      let nameValid = this.state.nameValid;
      let addressValid = this.state.addressValid;
      let contactValid = this.state.contactValid;

      switch(fieldName) {
        case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;

        case 'phone':
        phoneValid = value.match(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/);
        fieldValidationErrors.phone = contactValid ? '' : ' number is invalid';
        break;

        case 'name':
        nameValid = value.length >= 4;
        fieldValidationErrors.name = nameValid ? '' : ' is too short';
        break;
        default:
        break;
      }
      this.setState({formErrors: fieldValidationErrors,
        emailValid: emailValid,
        nameValid: nameValid,
        addressValid: addressValid,
        contactValid: contactValid
      }, this.validateForm);
    },

    validateForm() {
      this.setState({formValid: this.state.emailValid && this.state.nameValid && this.state.addressValid && this.state.contactValid});
    },
  componentDidMount() {
 
    $.ajax({
       url: "api/getdata",
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(data) {         
         this.setState({data1: data}); 
         
       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);
           
       }.bind(this)
    });
  },
  
DeleteData(id){
  var studentDelete = {
        'id': id
           };      
    $.ajax({
      url: "/api/Removedata/",
      dataType: 'json',
      type: 'POST',
      data: studentDelete,
      success: function(data) {
        alert(data.data);
         this.componentDidMount();

      }.bind(this),
      error: function(xhr, status, err) {
         alert(err); 
           
          
      }.bind(this),
      });
    },
 


    EditData(item){         
   this.setState({name: item.name,address:item.address,contact:item.contact,email:item.email,id:item._id,Buttontxt:'Update'});
     },

   handleClick: function() {
 
   var Url="";
   if(this.state.Buttontxt=="Save"){
      Url="/api/savedata";
       }
      else{
      Url="/api/Updatedata";
      }
      var studentdata = {
        'name': this.state.name,
        'address':this.state.address,
        'email':this.state.email,
        'contact':this.state.contact,
        'id':this.state.id,
        
    }
    $.ajax({
      url: Url,
      dataType: 'json',
      type: 'POST',
      data: studentdata,
      success: function(data) {       
          alert(data.data);       
          this.setState(this.getInitialState());
          this.componentDidMount();
         
      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);     
      }.bind(this)
    });
  },

  render: function() {
    return ( 
          <div>
         <section id="login">
    <div className="container">
      <div className="row">
          <div className="col-xs-6" style={{marginTop:'50px',marginLeft:'300px'}}>
              <div className="form-wrap">
              <br/>
              <h1> CRUD App to store Data </h1>
      <form>
      <div className="panel-default">
      </div>
      <div className={'form-group ${this.errorClass(this.state.formErrors.name)}'}>
      <label htmlFor="name"> Name </label>
      <input type="text" required className="form-control" name="name" placeholder="Name" value={this.state.name} onChange={this.handleUserInput} />
      </div>
      <div className={'form-group ${this.errorClass(this.state.formErrors.email)}'}>
      <label htmlFor="email"> Email Address </label>
      <input type="email" autoComplete="off" required className="form-control" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleUserInput} />
      </div>

       <div className={'form-group ${this.errorClass(this.state.formErrors.address)}'}>
      <label htmlFor="dob"> Date of Birth </label>
      <input type="text" required  className="form-control" name="address" id="address" placeholder="Date of Birth" value={this.state.address} onChange={this.handleUserInput} />
      </div>

      <div className={'form-group ${this.errorClass(this.state.formErrors.contact)}'}>
      <label htmlFor="phone"> Contact Number </label>
      <input type="text" required className="form-control" name="contact" placeholder="Contact Number" value={this.state.contact} onChange={this.handleUserInput} />
      </div>
      <button type="button" className="btn btn-primary" value={this.state.Buttontxt} onClick={this.handleClick} > Submit </button>
      <hr/>
      </form>
          </div>
        </div> 
      </div>
    </div>

</section>
  


<div className="col-sm-6 col-md-6 " style={{marginTop:'50px',marginLeft:'300px'}} >
 
 <table className="col-sm-6 table"><tbody>
   <tr><th><b>S.No</b></th><th><b>NAME</b></th><th><b>ADDRESS</b></th><th><b>EMAIL</b></th><th><b>CONTACT</b></th><th><b>Edit</b></th><th><b>Delete</b></th></tr>
    {this.state.data1.map((item, index) => (
        <tr key={index}>
           <td>{index+1}</td> 
          <td>{item.name}</td>                      
          <td>{item.address}</td>
          <td>{item.email}</td>
          <td>{item.contact}</td>
           <td> 
          
           <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>    
          </td> 
          <td> 
             <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>
          </td> 
        </tr>
    ))}
    </tbody>
    </table>
     </div>       
      </div>
    );
  }
});

ReactDOM.render(<StudentAll  />, document.getElementById('root'))