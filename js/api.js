"use strict";

const BASEURL = "https://api.pdca.in/";

class APIS {

    // ADMIN PROFILE APIS
    adminLogin = "https://api.pdca.in/Admin/Login";
    adminProfile = "https://api.pdca.in/Admin/MyProfile";
    adminEditProfile = "https://api.pdca.in/Admin/EditProfile";
    adminChangePassword = "https://api.pdca.in/Admin/Changepassword";

    // CLIENT PROFILE APIS
    clientLogin = "https://api.pdca.in/Client/Login";
    clientProfile = "https://api.pdca.in/Client/MyProfile";
    clientEditProfile = "https://api.pdca.in/Client/EditProfile";
    clientChangePassword = "https://api.pdca.in/Client/Changepassword";
    clientListCsvDownload = "https://api.pdca.in/Client/ClientListexport";

    // APIS FOR TEMPLATE FOR SERVICE OFFER
    createTemplateForServiceOffer = "https://api.pdca.in/Admin/CreateTemplateModuleOne";
    createTemplatePriceTable = "https://api.pdca.in/Admin/TemplatePricecreate";
    createTemplateBill = "https://api.pdca.in/Admin/TemplateBillCreate";
    templatesForServiceOffer = "https://api.pdca.in/Admin/TemplateList";
    templateDetailsEditView = "https://api.pdca.in/Admin/TemplateDetails";
    updateTemplateForServiceOffer = "https://api.pdca.in/Admin/UpdateTemplateModuleOne";
    updateTemplatePriceTable = "https://api.pdca.in/Admin/TemplatePriceupdate";
    updateTemplateBill = "https://api.pdca.in/Admin/TemplateBillUpdate";
    templateDelete = "https://api.pdca.in/Admin/DeleteTemplate";
    deletePricingRow = "https://api.pdca.in/Admin/DeleteTemplatePricing";

    // APIS FOR  Proforma Invoice
    createServiceOffer = "https://api.pdca.in/Service/CreateServiceoffer";
    createServiceOfferPriceTable = "https://api.pdca.in/Service/ServiceofferPricecreate";
    createServiceOfferBillCreate = "https://api.pdca.in/Service/ServiceofferBillCreate";
    ServiceOfferList = "https://api.pdca.in/Service/ServiceList";
    serviceOfferDetailsEditView = "https://api.pdca.in/Service/ServiceDetails";
    updateServiceOffer = "https://api.pdca.in/Service/UpdateServiceofferModuleOne";
    updateServiceOfferPriceTable = "https://api.pdca.in/Service/ServicePriceupdate"
    updateServiceOfferBill = "https://api.pdca.in/Service/ServiceBillUpdate";
    deleteServiceOffer = "https://api.pdca.in/Service/DeleteServiceoffer";
    deleteServiceOfferPricingRow = "https://api.pdca.in/Service/DeleteServicePricing";
    serviceOfferRemark = 'https://api.pdca.in/Service/UpdateServiceofferComment';
    proformaListCSvDownload = "https://api.pdca.in/Service/ServiceExport";
    savePIPdf = "https://api.pdca.in/Service/SaveServiceofferPDF";


    // APIS FOR  INVOICE
    createInvoice = "https://api.pdca.in/Invoice/CreateInvoice";
    createInvoicePriceTable = "https://api.pdca.in/Invoice/invoceprice";
    createInvoiceBillCreate = "https://api.pdca.in/Invoice/InvoiceBillCreate";
    invoiceList = "https://api.pdca.in/Invoice/InvoiceList";
    invoiceDetailsEditView = "https://api.pdca.in/Invoice/InvoiceDetails";
    saveInvoicePdf = "https://api.pdca.in/Invoice/SaveTaxInvoicePDF";
    updateInvoice = "https://api.pdca.in/Invoice/UpdateInvoice";
    updateInvoicePricetable = "https://api.pdca.in/Invoice/InvoicePriceupdate";
    updateInvoiceBill = "https://api.pdca.in/Invoice/InvoiceBillUpdate";
    deleteInvoice = "https://api.pdca.in/Invoice/DeleteInvoice";
    deleteInvoicePricingRow = "https://api.pdca.in/Invoice/DeleteInvoicePricing";
    invoiceRemark = "https://api.pdca.in/Invoice/UpdateinvoiceComment";
    invoiceListCsvDownload = "https://api.pdca.in/Service/ServiceList";
    //APIS FOR PRODUCT

    productList = "https://api.pdca.in/Process/ListofProducts";
    deleteProductList = "https://api.pdca.in/Process/Deleteproductlist";


    //APIS FOR LIST OF REPORTS

    serviceList = "https://api.pdca.in/Process/ListofReports";
    createtestDetailsEditView = "https://api.pdca.in/Process/TestReportList"
    deleteProductList = "https://api.pdca.in/Process/Deleteproductlist";
    testReportPreview = "https://api.pdca.in/Process/Testreportpreview";
    saveTRPdf = "https://api.pdca.in/Process/Save_service_testreport_PDF";

    // APIS FOR PO

    // APIS FOR  INVOICE
    createPo = "https://api.pdca.in/PurchaseOrder/CreatePurchaseOrder";
    createPoPriceTable = "https://api.pdca.in/PurchaseOrder/CreatePricingdetail";
    createPoBillCreate = "https://api.pdca.in/PurchaseOrder/CreatePOBill";
    poList = "https://api.pdca.in/PurchaseOrder/PurchaseOrderList";
    poDetailsEditView = "https://api.pdca.in/PurchaseOrder/EditPOList";
    updatePO = "https://api.pdca.in/PurchaseOrder/CreatePurchaseOrder";
    updatePOPricetable = "https://api.pdca.in/PurchaseOrder/CreatePricingdetail";
    updatePOBill = "https://api.pdca.in/PurchaseOrder/CreatePOBill";
    deletePo = "https://api.pdca.in/PurchaseOrder/Delete_PurchaseOrder";
    deletePoPricingRow = "https://api.pdca.in/PurchaseOrder/Delete_POPricing";
    poRemark = "https://api.pdca.in/PurchaseOrder/UpdatePOStatus";
    savePoPDF = "https://api.pdca.in/PurchaseOrder/SavePurchaseOrderPDF";


    // APIS FOR EXPORT

    ServiceExportExport = "https://api.pdca.in/Service/ServiceExport";
    InvoiceListExport = "https://api.pdca.in/Invoice/InvoiceListexport";
    PurchaseOrderExport = "https://api.pdca.in/PurchaseOrder/PurchaseOrderExport";
    EmplistExport = "https://api.pdca.in/Admin/EmployeeListexport";
    ClientExport = "https://api.pdca.in/Client/GetListexport";
    GetjobExportExport = "https://api.pdca.in/Job/GetjobExport";
    GetjobExportExportemp = "https://api.pdca.in/EmpJob/EmpJobsExport";
    qualityExport = "https://api.pdca.in/Quality/QualityJobsExport";
    qualityDocExport = "https://api.pdca.in/NewQualityManagement/ExportQualityDocsCsv";
    ListofProductsexportExport = "https://api.pdca.in/Process/ListofProductsexport";
    ListofReportExportExport = "https://api.pdca.in/Process/ListofReportExport";
    VendorExport = "https://api.pdca.in/Vendor/VendorGetListexport";
    // APIS FOR REGULATORY
    regulatoryListCsvDownload = "https://api.pdca.in/Job/GetjobList";

    // APIS FOR QUALITY
    qualityJobList = "https://api.pdca.in/Role/Assignactivitylist";

    // APIS FOR LIST OF REPORT
    listofreport = "https://api.pdca.in/Process/ListofProducts";

    // Quality Documentation Employees
    getEmployeeData = "https://api.pdca.in/Admin/EmployeeList?id=";

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
    qualityList = "https://api.pdca.in/NewQualityManagement/ListQualityDocs"
    // Purchase order dropdown
    vendorData ="https://api.pdca.in/PurchaseOrder/vendorDropdown"
}


export default new APIS();
