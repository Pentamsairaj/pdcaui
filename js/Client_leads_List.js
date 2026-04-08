"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
import { getPagination } from './pagination.js';
import commonAjaxCalls from './commanAjaxCalls.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//

$(() => {
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const PAGE_RELOAD = reUsableFunctions.pageReload;
    const CLEAR_STORAGE = reUsableFunctions.clearStorage;
    const CALCULATE_AMOUNT = reUsableFunctions.calAmount;
    const GET_DATA_FROM_TABLE = reUsableFunctions.getDataFromTable;
    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;
    const GET_DATA_FROM_FORM = getServiceFormData;
    const GET_PAGINATION = getPagination;
    const CONVERT_NUMBER_INTO_STRING = convertIntToEnglish;

    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');

    // Global variable to store DataTable instance
    let dataTable = null;
    let currentSheetType = 'sfl'; // Default to SFL

    // Sheet configurations
    const SHEETS = {
        pfs: {
            name: 'PFS',
            sharingLink: 'https://docs.google.com/spreadsheets/d/1-sLGLLne_-WKvBJTU5XNARxGdnV0P5Be8WaF534BUGQ/edit?usp=sharing',
            csvUrl: 'https://docs.google.com/spreadsheets/d/1-sLGLLne_-WKvBJTU5XNARxGdnV0P5Be8WaF534BUGQ/export?format=csv'
        },
        sfl: {
            name: 'SFL',
            sharingLink: 'https://docs.google.com/spreadsheets/d/1VltIlmq64lsMr1Dnr3VeO66SOx-d9pCMRwjGYC9dORY/edit?usp=sharing',
            csvUrl: 'https://docs.google.com/spreadsheets/d/1VltIlmq64lsMr1Dnr3VeO66SOx-d9pCMRwjGYC9dORY/export?format=csv'
        }
    };

    // Hide add client button for non-admin users
    if (ADMIN_NAME !== "Admin" && ADMIN_NAME !== "Manager") {
        $(".btn-primary").hide();
    }

    // Hide loading spinner initially
    $(".spinner_loading").hide();

    $(document).ready(function () {
        // Load default sheet (SFL)
        getlist('sfl');

        // Dropdown change event
        $("#sheetTypeSelect").on("change", function () {
            const selectedType = $(this).val();
            currentSheetType = selectedType;

            // Update active badge
            const sheetName = selectedType === 'pfs' ? 'PFS' : 'SFL';
            $("#activeSheetBadge").text(`${sheetName} Active`);

            // Clear and reset table before loading new data
            if (dataTable) {
                dataTable.destroy();
                dataTable = null;
            }

            // Clear table content
            $("#clientleadtable thead").html('<tr><th>Loading data...</th></tr>');
            $("#clientleadtable tbody").html('<tr><td class="text-center">Please wait while data loads...</td></tr>');

            // Load selected sheet data
            getlist(selectedType);
        });

        function getlist(sheetType) {
            // Show loading spinner
            $(".spinner_loading").show();

            // Get the CSV URL based on sheet type
            const csvUrl = SHEETS[sheetType].csvUrl;
            const sheetName = SHEETS[sheetType].name;

            console.log(`Loading ${sheetName} data from:`, csvUrl);

            Papa.parse(csvUrl, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    // Hide loading spinner
                    $(".spinner_loading").hide();

                    // Check for parsing errors
                    if (results.errors && results.errors.length > 0) {
                        console.warn("CSV parsing warnings:", results.errors);
                    }

                    if (!results.data || results.data.length === 0) {
                        console.warn(`No data received for ${sheetName}`);
                        $("#clientleadtable tbody").html(`<tr><td colspan="100" class="text-center">No data available for ${sheetName}</td></tr>`);
                        $("#clientleadtable thead").html('<tr><th>No Data</th></tr>');
                        ERROR_MESSAGE(`No ${sheetName} client data found`);
                        return;
                    }

                    let data = results.data;

                    // Clear existing thead completely and rebuild
                    let tableHead = "<tr>";
                    let tableBody = "";

                    // Create headers dynamically
                    let headers = Object.keys(data[0]);
                    headers.forEach(h => {
                        tableHead += `<th>${escapeHtml(h)}</th>`;
                    });

                    // Add Actions column for admin/manager
                    if (ADMIN_NAME === "Admin" || ADMIN_NAME === "Manager") {
                        tableHead += "<th>Actions</th>";
                    }
                    tableHead += "</tr>";

                    // Replace the entire thead content
                    $("#clientleadtable thead").empty().html(tableHead);

                    // Create rows
                    data.forEach((row, index) => {
                        tableBody += "<tr>";
                        headers.forEach(h => {
                            let cellValue = row[h] || "";
                            tableBody += `<td>${escapeHtml(cellValue.toString())}</td>`;
                        });

                        // Add edit button for admin/manager
                        if (ADMIN_NAME === "Admin" || ADMIN_NAME === "Manager") {
                            // Prepare data for edit based on sheet type
                            let editParams = prepareEditParams(row, sheetType);
                            tableBody += `<td class="text-center">
                                <button type="button" class="btn btn-sm btn-primary Edit" data-edit-params='${JSON.stringify(editParams)}' data-sheet-type="${sheetType}">
                                    ADD
                                </button>
                                </td>`;
                        }
                        tableBody += "</tr>";
                    });

                    $("#clientleadtable tbody").html(tableBody);

                    // Initialize or reinitialize DataTable
                    initializeDataTable();

                    SUCCESS_MESSAGE(`Loaded ${data.length} ${sheetName} client records successfully`);
                },
                error: function (err) {
                    // Hide loading spinner on error
                    $(".spinner_loading").hide();
                    console.error("CSV Parse Error:", err);
                    $("#clientleadtable tbody").html(`<tr><td colspan="100" class="text-center text-danger">Error loading ${sheetName} data. Please refresh the page.</td></tr>`);
                    $("#clientleadtable thead").html('<tr><th>Error</th></tr>');
                    ERROR_MESSAGE(`Failed to load ${sheetName} client data: ` + (err.message || "Unknown error"));
                }
            });
        }

        // Function to prepare parameters for edit based on sheet type
        function prepareEditParams(row, sheetType) {
            if (sheetType === 'pfs') {
                // For PFS: Combine first and second name into one name
                const firstName = row['First Name'] || row['FirstName'] || row['first name'] || '';
                const secondName = row['Last Name'] || row['LastName'] || row['Last name'] || '';
                const fullName = (firstName + ' ' + secondName).trim();

                return {
                    name: fullName,
                    companyName: row['Company'] || row['Company'] || row['company'] || '',
                    address: row['Address'] || row['address'] || '',
                    email: row['Email'] || row['email'] || '',
                    phone: row['Phone'] || row['phone'] || row['Contact Number'] || '',
                    gstNumber: row['GST'] || row['GST'] || row['gst'] || '',
                    type: 'pfs'
                };
            } else {
                // For SFL: Combine first and second name into one name
                const firstName = row['First Name'] || row['FirstName'] || row['first name'] || '';
                const secondName = row['Last Name'] || row['LastName'] || row['Last name'] || '';
                const fullName = (firstName + ' ' + secondName).trim();

                return {
                    name: fullName,
                    companyName: row['Company Name'] || row['CompanyName'] || row['company name'] || '',
                    phone: row['Phone'] || row['phone'] || row['Contact Number'] || '',
                    email: row['Email'] || row['email'] || '',
                    type: 'sfl'
                };
            }
        }

        // Function to initialize DataTable with pagination
        function initializeDataTable() {
            // Destroy existing DataTable if it exists
            if (dataTable) {
                dataTable.destroy();
            }

            // Initialize new DataTable
            dataTable = $("#clientleadtable").DataTable({
                pageLength: 10,
                lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                ordering: true,
                searchable: true,
                responsive: true,
                language: {
                    processing: "Processing...",
                    search: "Search:",
                    lengthMenu: "Show _MENU_ entries",
                    info: "Showing _START_ to _END_ of _TOTAL_ entries",
                    infoEmpty: "Showing 0 to 0 of 0 entries",
                    infoFiltered: "(filtered from _MAX_ total entries)",
                    paginate: {
                        first: "First",
                        last: "Last",
                        next: "Next",
                        previous: "Previous"
                    },
                    zeroRecords: "No matching records found"
                },
                drawCallback: function () {
                    // Re-attach edit event handlers after each table draw
                    attachEditHandlers();
                }
            });
        }

        // Function to attach edit handlers
        function attachEditHandlers() {
            $("#clientleadtable").off("click", ".Edit").on("click", ".Edit", function () {
                const editParams = $(this).data("edit-params");
                const sheetType = $(this).data("sheet-type");

                if (editParams) {
                    // Build URL with query parameters
                    let url = `../leadManagement/addClient.html?`;
                    const params = new URLSearchParams();

                    if (sheetType === 'pfs') {
                        // For PFS: Send name, companyName, address, email, phone, gstNumber
                        if (editParams.name) params.append('name', editParams.name);
                        if (editParams.companyName) params.append('companyName', editParams.companyName);
                        if (editParams.address) params.append('address', editParams.address);
                        if (editParams.email) params.append('email', editParams.email);
                        if (editParams.phone) params.append('phone', editParams.phone);
                        if (editParams.gstNumber) params.append('gstNumber', editParams.gstNumber);
                        params.append('type', 'pfs');
                    } else {
                        // For SFL: Send name, companyName, phone, email
                        if (editParams.name) params.append('name', editParams.name);
                        if (editParams.companyName) params.append('companyName', editParams.companyName);
                        if (editParams.phone) params.append('phone', editParams.phone);
                        if (editParams.email) params.append('email', editParams.email);
                        params.append('type', 'sfl');
                    }

                    const finalUrl = url + params.toString();
                    console.log("Redirecting to:", finalUrl);
                    window.location.href = finalUrl;
                } else {
                    ERROR_MESSAGE("Unable to edit: Missing client data");
                }
            });
        }

        // Helper function to prevent XSS attacks
        function escapeHtml(str) {
            if (!str) return "";
            return str.toString()
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }
    });
});