"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { getBillData } from './getFormData.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//

// ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
const PAGE_REDIRECTION = reUsableFunctions.pageReDirection;
const PAGE_RELOAD = reUsableFunctions.pageReload;
const CLEAR_STORAGE = reUsableFunctions.clearStorage;
const GET_DATA_FROM_FORM = getBillData;


const ADMIN_AUTH = localStorage.getItem("Admin_auth");

// ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

// ----------------------------------- APIs START ---------------------------------------//


const CREATE_TEMPLATE_BILL_URL = APIS.createTemplateBill;
const UPDATE_TEMPLATE_BILL_URL = APIS.updateTemplateBill;
const CREATE_SERVICE_OFFER_BILL_URL = APIS.createServiceOfferBillCreate;
const UPDATE_SERVICE_BILL_URL = APIS.updateServiceOfferBill
const CREATE_INVOICE_BILL_URL = APIS.createInvoiceBillCreate;
const UPDATE_INVOICE_BILL_URL = APIS.updateInvoiceBill;
const CREATE_PO_BILL_URL = APIS.createPoBillCreate;
const UPDATE_PO_BILL_URL = APIS.createPoBillCreate;


// ----------------------------------- APIs END ---------------------------------------//


// ++++++++++++++++++++++++++++++++++++++++ BILL CREATION METHODS START +++++++++++++++++++++++++++++++++++++++++++++ //


// Method for bill creation

const createBill = (PRICING_id, URL) => {
    let totalAmt = $("#totalAmt").text();
    let templateId = localStorage.getItem("templateID");

    $.ajax({
        url: URL,
        type: "POST",
        data: { "t_pricingid": PRICING_id, "AdminId": ADMIN_AUTH, "TemplateId": templateId, "Amount": Number(totalAmt) },
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            if (data.responsecode === 1) {
                SUCCESS_MESSAGE("Template for Service offer created Successfully");
                CLEAR_STORAGE();
                PAGE_REDIRECTION('./templateList.html');
            } else {
                ERROR_MESSAGE(data.responsemessage);
            }
        }
    });
}


// Method for bill creation

const createBillForServiceOffer = (PRICING_id, URL) => {
    let templateId = localStorage.getItem("templateID");
    let paidAmount = $("#invoicePaidAmt").val();
    let dueAmount = $("#invoiceDueAmt").val();
    const billData = GET_DATA_FROM_FORM();

    $.ajax({
        url: URL,
        type: "POST",
        data: { ...billData, "t_pricingid": PRICING_id, "AdminId": ADMIN_AUTH, "TemplateId": templateId, "balance": Number(dueAmount), "paid": Number(paidAmount) },
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            if (data.responsecode === 1) {
                SUCCESS_MESSAGE("Service offer created Successfully");
                CLEAR_STORAGE();
                PAGE_REDIRECTION('./quotesList.html');
            } else {
                ERROR_MESSAGE(data.responsemessage);
            }
        }
    });
}


// Method for bill creation

const createBillForInvoice = (PRICING_id, URL) => {
    let templateId = localStorage.getItem("templateID");
    let paidAmount = $("#invoicePaidAmt").val();
    let dueAmount = $("#invoiceDueAmt").val();
    const billData = GET_DATA_FROM_FORM();

    $.ajax({
        url: URL,
        type: "POST",
        data: { ...billData, "t_pricingid": PRICING_id, "AdminId": ADMIN_AUTH, "TemplateId": templateId, "balance": Number(dueAmount), "paid": Number(paidAmount) },
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            if (data.responsecode === 1) {
                SUCCESS_MESSAGE("Invoice created Successfully");
                CLEAR_STORAGE();
                PAGE_REDIRECTION('./invoiceList.html');
            } else {
                ERROR_MESSAGE(data.responsemessage);
            }
        }
    });
}


// Method for bill creation

const createBillForPo = (PRICING_id, URL) => {
    let templateId = localStorage.getItem("templateID");
    let paidAmount = $("#invoicePaidAmt").val();
    let dueAmount = $("#invoiceDueAmt").val();
    const billData = GET_DATA_FROM_FORM();

    $.ajax({
        url: URL,
        type: "POST",
        data: { ...billData, "t_pricingid": PRICING_id, "AdminId": ADMIN_AUTH, "TemplateId": templateId, "balance": Number(dueAmount), "paid": Number(paidAmount) },
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            if (data.responsecode === 1) {
                SUCCESS_MESSAGE("PO created Successfully");
                CLEAR_STORAGE();
                PAGE_REDIRECTION('./POList.html');
            } else {
                ERROR_MESSAGE(data.responsemessage);
            }
        }
    });
}

// ++++++++++++++++++++++++++++++++++++++++ BILL CREATION METHODS END +++++++++++++++++++++++++++++++++++++++++++++ //



// ++++++++++++++++++++++++++++++++++++++++ BILL UPDATION METHODS START +++++++++++++++++++++++++++++++++++++++++++++ //
// Method for bill creation

const updateBill = (PRICING_id, URL) => {
    let totalAmt = $("#totalAmt").text();
    let templateId = localStorage.getItem("templateID");
    let billId = localStorage.getItem("billId");

    $.ajax({
        url: URL,
        type: "POST",
        data: { "t_pricingid": PRICING_id, "AdminId": ADMIN_AUTH, "id": billId, "TemplateId": templateId, "Amount": Number(totalAmt) },
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            if (data.responsecode === 1) {
                SUCCESS_MESSAGE("Template for Service offer updated Successfully");
                CLEAR_STORAGE();
                PAGE_REDIRECTION('./templateList.html');
            } else {
                ERROR_MESSAGE(data.responsemessage);
            }
        }
    });
}



// Method for bill creation

const updateBillForServiceOffer = (PRICING_id, URL) => {
    let templateId = localStorage.getItem("templateID");
    const billData = GET_DATA_FROM_FORM();
    let billId = localStorage.getItem("billId");
    let paidAmount = $("#invoicePaidAmt").val();
    let dueAmount = $("#invoiceDueAmt").val();

    $.ajax({
        url: URL,
        type: "POST",
        data: { ...billData, "t_pricingid": PRICING_id, "AdminId": ADMIN_AUTH, "TemplateId": templateId, "id": billId, "balance": Number(dueAmount), "paid": Number(paidAmount) },
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            if (data.responsecode === 1) {
                SUCCESS_MESSAGE("Service offer Updated Successfully");
                PAGE_REDIRECTION('./quotesList.html');
                CLEAR_STORAGE();

            } else {
                ERROR_MESSAGE(data.responsemessage);
            }
        }
    });
}


// Method for bill creation

const updateBillForInvoice = (PRICING_id, URL) => {
    let templateId = localStorage.getItem("templateID");
    const billData = GET_DATA_FROM_FORM();
    let billId = localStorage.getItem("billId");
    let paidAmount = $("#invoicePaidAmt").val();
    let dueAmount = $("#invoiceDueAmt").val();

    $.ajax({
        url: URL,
        type: "POST",
        data: { ...billData, "t_pricingid": PRICING_id, "AdminId": ADMIN_AUTH, "TemplateId": templateId, "id": billId, "balance": Number(dueAmount), "paid": Number(paidAmount) },
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            if (data.responsecode === 1) {
                SUCCESS_MESSAGE("Invoice Updated Successfully");
                PAGE_REDIRECTION('./invoiceList.html');
                CLEAR_STORAGE();

            } else {
                ERROR_MESSAGE(data.responsemessage);
            }
        }
    });
}


// Method for bill creation

const updateBillForPo = (PRICING_id, URL) => {
    let templateId = localStorage.getItem("templateID");
    const billData = GET_DATA_FROM_FORM();
    let billId = localStorage.getItem("billId");
    let paidAmount = $("#invoicePaidAmt").val();
    let dueAmount = $("#invoiceDueAmt").val();

    $.ajax({
        url: URL,
        type: "POST",
        data: { ...billData, "t_pricingid": PRICING_id, "AdminId": ADMIN_AUTH, "TemplateId": templateId, "id": billId, "balance": Number(dueAmount), "paid": Number(paidAmount) },
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            if (data.responsecode === 1) {
                SUCCESS_MESSAGE("PO Updated Successfully");
                PAGE_REDIRECTION('./POList.html');
                CLEAR_STORAGE();

            } else {
                ERROR_MESSAGE(data.responsemessage);
            }
        }
    });
}
// ++++++++++++++++++++++++++++++++++++++++ BILL UPDATION METHODS END +++++++++++++++++++++++++++++++++++++++++++++ //


class commonAjaxCalls {

    // ++++++++++++++++++++++++++++++++++++++++ CREATION METHODS START +++++++++++++++++++++++++++++++++++++++++++++ //

    // Method for Price table creation
    createPrice = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode === 1) {
                    localStorage.setItem("pricingId", data.responseObject);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                };
            }
        });
    }

    // Method for Price table creation
    createServiceOfferPrice = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode === 1) {
                    localStorage.setItem("pricingId", data.responseObject);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                };
            }
        });
    }


    // Method for Price table creation
    createInvoicePrice = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode === 1) {
                    localStorage.setItem("pricingId", data.responseObject);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                };
            }
        });
    }

    createPoPrice = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode === 1) {
                    localStorage.setItem("pricingId", data.responseObject);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                };
            }
        });
    }

    // ++++++++++++++++++++++++++++++++++++++++ CREATION METHODS END +++++++++++++++++++++++++++++++++++++++++++++ //


    // ++++++++++++++++++++++++++++++++++++++++ PRICE AND BILL CREATION AT ONCE METHODS START +++++++++++++++++++++++++++++++++++++++++++++ //

    // Method for price and Bill Creation at once
    // (call if only single row in price table / if last iteration in pricingData array )
    priceAndBillCreationAtOnce = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    createBill(PRICING_id, CREATE_TEMPLATE_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }


    // Method for price and Bill Creation at once
    // (call if only single row in price table / if last iteration in pricingData array )
    priceAndBillCreationAtOnceForServiceOffer = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    createBillForServiceOffer(PRICING_id, CREATE_SERVICE_OFFER_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }

    // Method for price and Bill Creation at once
    // (call if only single row in price table / if last iteration in pricingData array )
    priceAndBillCreationAtOnceForInvoice = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    createBillForInvoice(PRICING_id, CREATE_INVOICE_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }


    // Method for price and Bill Creation at once
    // (call if only single row in price table / if last iteration in pricingData array )
    priceAndBillCreationAtOnceForPo = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    createBillForPo(PRICING_id, CREATE_PO_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }
    // ++++++++++++++++++++++++++++++++++++++++ PRICE AND BILL CREATION AT ONCE METHODS END +++++++++++++++++++++++++++++++++++++++++++++ //


    // ++++++++++++++++++++++++++++++++++++++++ PRICE CREATION AND BILL UPDATION  METHODS START +++++++++++++++++++++++++++++++++++++++++++++ //

    priceCreationAndBillUpdation = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    updateBill(PRICING_id, UPDATE_TEMPLATE_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }

    priceCreationAndBillUpdationForServiceOffer = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    updateBillForServiceOffer(PRICING_id, UPDATE_SERVICE_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }
    priceCreationAndBillUpdationForInvoice = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    updateBillForInvoice(PRICING_id, UPDATE_INVOICE_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }
    priceCreationAndBillUpdationForPo = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    updateBillForInvoice(PRICING_id, UPDATE_PO_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }

    // ++++++++++++++++++++++++++++++++++++++++ PRICE CREATION AND BILL UPDATION  METHODS END +++++++++++++++++++++++++++++++++++++++++++++ //


    // ++++++++++++++++++++++++++++++++++++++++ PRICE AND BILL UPDATION AT ONEC METHODS START +++++++++++++++++++++++++++++++++++++++++++++ //

    // Method for price and Bill Creation at once
    // (call if only single row in price table / if last iteration in pricingData array )
    priceAndBillUpdationAtOnce = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    updateBill(PRICING_id, UPDATE_TEMPLATE_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }


    // Method for price and Bill Creation at once
    // (call if only single row in price table / if last iteration in pricingData array )
    priceAndBillUpdationAtOnceForServiceOffer = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    updateBillForServiceOffer(PRICING_id, UPDATE_SERVICE_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }

    // Method for price and Bill Creation at once
    // (call if only single row in price table / if last iteration in pricingData array )
    priceAndBillUpdationAtOnceForInvoice = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    let PRICING_id = data.responseObject;

                    // calling bill create method
                    updateBillForInvoice(PRICING_id, UPDATE_INVOICE_BILL_URL);
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }

    // ++++++++++++++++++++++++++++++++++++++++ PRICE AND BILL UPDATION AT ONEC METHODS START +++++++++++++++++++++++++++++++++++++++++++++ //

    // ++++++++++++++++++++++++++++++++++++++++ SERVICE OFFER REMARK METHODS START +++++++++++++++++++++++++++++++++++++++++++++ //
    serciveOfferRemark = (data, URL) => {
        $.ajax({
            url: URL,
            type: "POST",
            data: { ...data, "AdminID": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    SUCCESS_MESSAGE("Remark Updated Successfully");
                    PAGE_RELOAD();
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }
    // ++++++++++++++++++++++++++++++++++++++++ SERVICE OFFER REMARK METHODS END +++++++++++++++++++++++++++++++++++++++++++++ //


}


export default new commonAjaxCalls();