"use strict";

const BASEURL = "https://api.pioneerfoods.in/";

class APIS {

   
    // CLIENT PROFILE APIS
    clientLogin = "https://api.pioneerfoods.in/Client/Login";
    clientProfile = "https://api.pioneerfoods.in/Client/MyProfile";
    clientEditProfile = "https://api.pioneerfoods.in/Client/EditProfile";
    clientChangePassword = "https://api.pioneerfoods.in/Client/ForgotPassword ";


   

    



      // APIS FOR  INVOICE
      
    invoiceList = "https://api.pioneerfoods.in/Client/ClientInvoiceList";

    invoiceDetailsEditView = "https://api.pioneerfoods.in/Client/ClientInvoiceDetails";

    //APIS FOR PRODUCT

    productList = "https://api.pioneerfoods.in/ClientProcess/ListofProducts";


    //APIS FOR LIST OF REPORTS

    serviceList = "https://api.pioneerfoods.in/ClientProcess/ListofReports";
    createtestDetailsEditView = "https://api.pioneerfoods.in/ClientProcess/TestReportList"
    testReportPreview = "https://api.pioneerfoods.in/ClientProcess/Testreportpreview";
    //APIS FOR PO

    
   
}

export default new APIS();
