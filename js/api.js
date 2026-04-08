"use strict";

const BASEURL = "https://api.pioneerfoods.in/";

class APIS {

    // ADMIN PROFILE APIS
    adminLogin = "https://api.pioneerfoods.in/Admin/Login";
    adminProfile = "https://api.pioneerfoods.in/Admin/MyProfile";
    adminEditProfile = "https://api.pioneerfoods.in/Admin/EditProfile";
    adminChangePassword = "https://api.pioneerfoods.in/Admin/Changepassword";

    // CLIENT PROFILE APIS
    clientLogin = "https://api.pioneerfoods.in/Client/Login";
    clientProfile = "https://api.pioneerfoods.in/Client/MyProfile";
    clientEditProfile = "https://api.pioneerfoods.in/Client/EditProfile";
    clientChangePassword = "https://api.pioneerfoods.in/Client/Changepassword";


    // APIS FOR TEMPLATE FOR SERVICE OFFER
    createTemplateForServiceOffer = "https://api.pioneerfoods.in/Admin/CreateTemplateModuleOne";
    createTemplatePriceTable = "https://api.pioneerfoods.in/Admin/TemplatePricecreate";
    createTemplateBill = "https://api.pioneerfoods.in/Admin/TemplateBillCreate";
    templatesForServiceOffer = "https://api.pioneerfoods.in/Admin/TemplateList";
    templateDetailsEditView = "https://api.pioneerfoods.in/Admin/TemplateDetails";
    updateTemplateForServiceOffer = "https://api.pioneerfoods.in/Admin/UpdateTemplateModuleOne";
    updateTemplatePriceTable = "https://api.pioneerfoods.in/Admin/TemplatePriceupdate";
    updateTemplateBill = "https://api.pioneerfoods.in/Admin/TemplateBillUpdate";
    templateDelete = "https://api.pioneerfoods.in/Admin/DeleteTemplate";
    deletePricingRow = "https://api.pioneerfoods.in/Admin/DeleteTemplatePricing";

    // APIS FOR  Proforma Invoice
    createServiceOffer = "https://api.pioneerfoods.in/Service/CreateServiceoffer";
    createServiceOfferPriceTable = "https://api.pioneerfoods.in/Service/ServiceofferPricecreate";
    createServiceOfferBillCreate = "https://api.pioneerfoods.in/Service/ServiceofferBillCreate";
    ServiceOfferList = "https://api.pioneerfoods.in/Service/ServiceList";
    serviceOfferDetailsEditView = "https://api.pioneerfoods.in/Service/ServiceDetails";
    updateServiceOffer = "https://api.pioneerfoods.in/Service/UpdateServiceofferModuleOne";
    updateServiceOfferPriceTable = "https://api.pioneerfoods.in/Service/ServicePriceupdate"
    updateServiceOfferBill = "https://api.pioneerfoods.in/Service/ServiceBillUpdate";
    deleteServiceOffer = "https://api.pioneerfoods.in/Service/DeleteServiceoffer";
    deleteServiceOfferPricingRow = "https://api.pioneerfoods.in/Service/DeleteServicePricing";
    serviceOfferRemark = 'https://api.pioneerfoods.in/Service/UpdateServiceofferComment';
    proformaListCSvDownload = "https://api.pioneerfoods.in/Service/ServiceExport";
    savePIPdf = "https://api.pioneerfoods.in/Service/SaveServiceofferPDF";


    // APIS FOR  INVOICE
    createInvoice = "https://api.pioneerfoods.in/Invoice/CreateInvoice";
    createInvoicePriceTable = "https://api.pioneerfoods.in/Invoice/invoceprice";
    createInvoiceBillCreate = "https://api.pioneerfoods.in/Invoice/InvoiceBillCreate";
    invoiceList = "https://api.pioneerfoods.in/Invoice/InvoiceList";
    invoiceDetailsEditView = "https://api.pioneerfoods.in/Invoice/InvoiceDetails";
    saveInvoicePdf = "https://api.pioneerfoods.in/Invoice/SaveTaxInvoicePDF";
    updateInvoice = "https://api.pioneerfoods.in/Invoice/UpdateInvoice";
    updateInvoicePricetable = "https://api.pioneerfoods.in/Invoice/InvoicePriceupdate";
    updateInvoiceBill = "https://api.pioneerfoods.in/Invoice/InvoiceBillUpdate";
    deleteInvoice = "https://api.pioneerfoods.in/Invoice/DeleteInvoice";
    deleteInvoicePricingRow = "https://api.pioneerfoods.in/Invoice/DeleteInvoicePricing";
    invoiceRemark = "https://api.pioneerfoods.in/Invoice/UpdateinvoiceComment";
    invoiceListCsvDownload = "https://api.pioneerfoods.in/Service/ServiceList";
    //APIS FOR PRODUCT

    productList = "https://api.pioneerfoods.in/Process/ListofProducts";
    deleteProductList = "https://api.pioneerfoods.in/Process/Deleteproductlist";


    //APIS FOR LIST OF REPORTS

    serviceList = "https://api.pioneerfoods.in/Process/ListofReports";
    createtestDetailsEditView = "https://api.pioneerfoods.in/Process/TestReportList"
    deleteProductList = "https://api.pioneerfoods.in/Process/Deleteproductlist";
    testReportPreview = "https://api.pioneerfoods.in/Process/Testreportpreview";
    saveTRPdf = "https://api.pioneerfoods.in/Process/Save_service_testreport_PDF";

    // APIS FOR PO

    // APIS FOR  INVOICE
    createPo = "https://api.pioneerfoods.in/PurchaseOrder/CreatePurchaseOrder";
    createPoPriceTable = "https://api.pioneerfoods.in/PurchaseOrder/CreatePricingdetail";
    createPoBillCreate = "https://api.pioneerfoods.in/PurchaseOrder/CreatePOBill";
    poList = "https://api.pioneerfoods.in/PurchaseOrder/PurchaseOrderList";
    poDetailsEditView = "https://api.pioneerfoods.in/PurchaseOrder/EditPOList";
    updatePO = "https://api.pioneerfoods.in/PurchaseOrder/CreatePurchaseOrder";
    updatePOPricetable = "https://api.pioneerfoods.in/PurchaseOrder/CreatePricingdetail";
    updatePOBill = "https://api.pioneerfoods.in/PurchaseOrder/CreatePOBill";
    deletePo = "https://api.pioneerfoods.in/PurchaseOrder/Delete_PurchaseOrder";
    deletePoPricingRow = "https://api.pioneerfoods.in/PurchaseOrder/Delete_POPricing";
    poRemark = "https://api.pioneerfoods.in/PurchaseOrder/UpdatePOStatus";
    savePoPDF = "https://api.pioneerfoods.in/PurchaseOrder/SavePurchaseOrderPDF";


    // APIS FOR EXPORT

    ServiceExportExport = "https://api.pioneerfoods.in/Service/ServiceExport";
    InvoiceListExport = "https://api.pioneerfoods.in/Invoice/InvoiceListexport";
    PurchaseOrderExport = "https://api.pioneerfoods.in/PurchaseOrder/PurchaseOrderExport";
    EmplistExport = "https://api.pioneerfoods.in/Admin/EmployeeListexport";
    ClientExport = "https://api.pioneerfoods.in/Client/GetListexport";
    GetjobExportExport = "https://api.pioneerfoods.in/Job/GetjobExport";
    GetjobExportExportemp = "https://api.pioneerfoods.in/EmpJob/EmpJobsExport";
    qualityExport = "https://api.pioneerfoods.in/Quality/QualityJobsExport";
    qualityDocExport = "http://localhost:56901/NewQualityManagement/ExportQualityDocsCsv";
    ListofProductsexportExport = "https://api.pioneerfoods.in/Process/ListofProductsexport";
    ListofReportExportExport = "https://api.pioneerfoods.in/Process/ListofReportExport";
    VendorExport = "https://api.pioneerfoods.in/Vendor/VendorGetListexport";
    // APIS FOR REGULATORY
    regulatoryListCsvDownload = "https://api.pioneerfoods.in/Job/GetjobList";

    // APIS FOR QUALITY
    qualityJobList = "https://api.pioneerfoods.in/Role/Assignactivitylist";

    // APIS FOR LIST OF REPORT
    listofreport = "https://api.pioneerfoods.in/Process/ListofProducts";

    // Quality Documentation Employees
    getEmployeeData = "https://api.pioneerfoods.in/Admin/EmployeeList?id=";

    // Quality Documentation APIS for 6 tables
    // TAB-1 ( 1.Quality Documentation and Control )
    qualityDocumentationControl = "";
    // TAB-2 ( 2.Training Plan CY )
    trainingPlan = "";
    // TAB-2.1 ( 2.1 Skill matrix Requirement )
    skillMatrixRequirement = "";
    // TAB-3 ( 3.Quality System Execution )
    qualitySystemExecution = "";
    // TAB-4 ( 4.Internal Audit and MRM )
    internalAuditMRM = "";
    // TAB-5 ( 5.External Audit and MRM )
    externalAuditMRM = "";
    // TAB-6 ( 6.Quality Certificate )
    qualityCertificate = "";
    // Quality Lists
    qualityList = "https://api.pioneerfoods.in/NewQualityManagement/ListQualityDocs"
    // Purchase order dropdown
    vendorData ="https://api.pioneerfoods.in/PurchaseOrder/vendorDropdown"
}


export default new APIS();
