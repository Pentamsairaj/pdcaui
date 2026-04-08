"use strict";

const BASEURL = "https://api.pdca.in/";

class APIS {

   
    // CLIENT PROFILE APIS
    clientLogin = "https://api.pdca.in/Client/Login";
    clientProfile = "https://api.pdca.in/Client/MyProfile";
    clientEditProfile = "https://api.pdca.in/Client/EditProfile";
    clientChangePassword = "https://api.pdca.in/Client/ForgotPassword ";


   

    



      // APIS FOR  INVOICE
      
    invoiceList = "https://api.pdca.in/Client/ClientInvoiceList";

    invoiceDetailsEditView = "https://api.pdca.in/Client/ClientInvoiceDetails";

    //APIS FOR PRODUCT

    productList = "https://api.pdca.in/ClientProcess/ListofProducts";


    //APIS FOR LIST OF REPORTS

    serviceList = "https://api.pdca.in/ClientProcess/ListofReports";
    createtestDetailsEditView = "https://api.pdca.in/ClientProcess/TestReportList"
    testReportPreview = "https://api.pdca.in/ClientProcess/Testreportpreview";
    //APIS FOR PO

    
   
}

export default new APIS();
