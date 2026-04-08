// --------------------------------------- CONVERT NUMBER INTO WORD START --------------------------------------- //

export function convertIntToEnglish(number) {

    let NS = [
        { value: 10000000, str: "Crore" },
        { value: 100000, str: "Lakh" },
        { value: 1000, str: "Thousand" },
        { value: 100, str: "Hundred" },
        { value: 90, str: "Ninety" },
        { value: 80, str: "Eighty" },
        { value: 70, str: "Seventy" },
        { value: 60, str: "Sixty" },
        { value: 50, str: "Fifty" },
        { value: 40, str: "Forty" },
        { value: 30, str: "Thirty" },
        { value: 20, str: "Twenty" },
        { value: 19, str: "Nineteen" },
        { value: 18, str: "Eighteen" },
        { value: 17, str: "Seventeen" },
        { value: 16, str: "Sixteen" },
        { value: 15, str: "Fifteen" },
        { value: 14, str: "Fourteen" },
        { value: 13, str: "Thirteen" },
        { value: 12, str: "Twelve" },
        { value: 11, str: "Eleven" },
        { value: 10, str: "Ten" },
        { value: 9, str: "Nine" },
        { value: 8, str: "Eight" },
        { value: 7, str: "Seven" },
        { value: 6, str: "Six" },
        { value: 5, str: "Five" },
        { value: 4, str: "Four" },
        { value: 3, str: "Three" },
        { value: 2, str: "Two" },
        { value: 1, str: "One" }
    ];

    let result = '';
    for (let n of NS) {
        if (number >= n.value) {
            if (number <= 99) {
                result += n.str;
                number -= n.value;
                if (number > 0) result += ' ';
            } else {
                let t = Math.floor(number / n.value);
                // console.log(t);
                let d = number % n.value;
                if (d > 0) {
                    return convertIntToEnglish(t) + ' ' + n.str + ' ' + convertIntToEnglish(d);
                } else {
                    return convertIntToEnglish(t) + ' ' + n.str;
                }

            }
        }
    }
    return result;
}

// --------------------------------------- CONVERT NUMBER INTO WORD END --------------------------------------- //




class reUsableFunctions {
    // ---------------------------------------  SUCCESS TOAST MESSAGE START --------------------------------------- //
    SuccessMessage = (messageText) => {
        Toastify({
            text: messageText,
            className: "info",
            duration: 3000,
            close: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast()
    };

    // ---------------------------------------  SUCCESS TOAST MESSAGE END --------------------------------------- //

    // ---------------------------------------  ERROR TOAST MESSAGE START --------------------------------------- //
    ErrorMessage = (messageText) => {
        Toastify({
            text: messageText,
            duration: 3000,
            close: true,
            style: {
                background: "linear-gradient(to right, rgb(253, 160, 133), rgb(246, 211, 101))",
            }

        }).showToast();
    }

    // ---------------------------------------  ERROR TOAST MESSAGE END --------------------------------------- //


    // ---------------------------------------  PAGE RELOAD START --------------------------------------- //
    pageReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    // ---------------------------------------  PAGE RELOAD END --------------------------------------- //


    // ---------------------------------------  PAGE REDIRECTION START --------------------------------------- //

    pageReDirection = (Location) => {
        setTimeout(() => {
            window.location.href = Location;
        }, 1000);
    }

    // ---------------------------------------  PAGE REDIRECTION END --------------------------------------- //

    // ---------------------------------------  CLEAR LOCALSTORAGE START --------------------------------------- //

    clearStorage = () => {
        let removeItems = ["pricingId", "prevAmt", "templateID", "templateData", "totalAmount", "pricingData", "templateLogo", "companyLogo", "signatureLogo", "logo", "billId", "totalAmtArray", "templateTemplateLogo", "templatecompanyLogo", "templatesignatureLogo"];
        removeItems.map((item) => localStorage.removeItem(item));
    }


    // ---------------------------------------  CLEAR LOCALSTORAGE END --------------------------------------- //

    // ---------------------------------------  GET DYNAMIC TABLE DATA START --------------------------------------- //

    getDataFromTable(tableBody) {
        const arr = tableBody
            .map(function () {
                const S_no = $(this).closest("tr").find('[id^=s_no]');
                const service = $(this).closest("tr").find('[id^=product_service]');
                const HSCode = $(this).closest("tr").find('[id^=product_Hscode]');
                const qnty = $(this).closest("tr").find("[id^=product_qnty]");
                const UnitPriceperService = $(this).closest("tr").find("[id^=product_price]");
                const amount = $(this).closest("tr").find("[id^=product_amt]");

                return ({
                    [$(this).attr("id")]: $(this).val(),
                    [S_no.attr("id")]: S_no.val(),
                    [service.attr("id")]: service.val(),
                    [HSCode.attr("id")]: HSCode.val(),
                    [qnty.attr("id")]: qnty.val(),
                    [UnitPriceperService.attr("id")]: UnitPriceperService.val(),
                    [amount.attr("id")]: amount.text()
                })
            })
            .get();
        return arr;
    }

    // ---------------------------------------  GET DYNAMIC TABLE DATA END --------------------------------------- //

    // ---------------------------------------  CALCULATE AMOUNT START --------------------------------------- //

    calAmount = (qnt, price) => {
        return qnt * price;
    }

    // ---------------------------------------  CALCULATE AMOUNT END --------------------------------------- //

    // ---------------------------------------  CALCULATE TOTAL AMOUNT START --------------------------------------- //

    calDiscount = (amount, discount) => {
        return (amount * discount) / 100;
    }

    // ---------------------------------------  CALCULATE TOTAL AMOUNT END --------------------------------------- //


    // ---------------------------------------  CALCULATE TOTAL AMOUNT START --------------------------------------- //

    calGST = (amount, discount) => {
        return (amount * discount) / 100;
    }

    // ---------------------------------------  CALCULATE TOTAL AMOUNT END --------------------------------------- //


    // ---------------------------------------  CALCULATE TOTAL AMOUNT START --------------------------------------- //

    calGrandAmount = () => {

        let amount = $("#totalAmt").text();
        let discount = $("#toatlDiscountAmt").text();

        if (discount !== "") {
            var total = parseInt(amount) - parseFloat(discount);
            localStorage.setItem('total', total);
        } else {
            var total = parseInt(amount);
            localStorage.setItem('total', total);
        }
        let GST = $("#toatlgstAmt").text();
        let distotal = total;
        if (amount != "" && discount != "" && GST != "") {
            let grdtotal = parseInt(distotal) + parseFloat(GST);
            const numberInWords = convertIntToEnglish(Math.round(grdtotal));
            $("#grandTotal").html(Math.round(grdtotal));
            $("#amtInString").val(numberInWords)

        } else if (amount != "" && discount == "" && GST != "") {
            let total = parseInt(amount) + parseFloat(GST);
            const numberInWords = convertIntToEnglish(Math.round(total));
            $("#grandTotal").html(Math.round(total));
            $("#amtInString").val(numberInWords)

        } else if (amount != "" && discount != "" && GST == "") {
            let total = parseInt(amount) - parseFloat(discount);
            const numberInWords = convertIntToEnglish(Math.round(total));
            $("#grandTotal").html(Math.round(total));
            $("#amtInString").val(numberInWords)

        } else {
            let total = parseInt(amount);
            const numberInWords = convertIntToEnglish(Math.round(total));

            $("#grandTotal").html(Math.round(total));
            $("#amtInString").val(numberInWords)

        }
    }

    // ---------------------------------------  CALCULATE TOTAL AMOUNT END --------------------------------------- //


    // --------------------------------------- EMAIL VAIDATION START --------------------------------------- //

    validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    // --------------------------------------- EMAIL VAIDATION END --------------------------------------- //


    // --------------------------------------- PHONE NUMBER VAIDATION START --------------------------------------- //

    validatePhone = (phone) => {
        return phone.match(
            /^([6-9]{1}[0-9]{9})$/
        );
    };


    // --------------------------------------- PHONE NUBER VAIDATION END --------------------------------------- //


    // --------------------------------------- IMAGE FORMATE VAIDATION START --------------------------------------- //
    validateImageFormate(imageId) {
        let allowedExtension = ['jpeg', 'jpg', 'png'];
        let fileExtension = document.getElementById(imageId).value.split('.').pop().toLowerCase();
        let isValidFile = false;

        for (let index in allowedExtension) {

            if (fileExtension === allowedExtension[index]) {
                isValidFile = true;
                break;
            }
        }

        if (!isValidFile) {
            alert('Allowed Extensions are : *.' + allowedExtension.join(', *.'));
        }

        return isValidFile;
    }
    // --------------------------------------- IMAGE FORMATE VAIDATION END --------------------------------------- //



    // --------------------------------------- CONVERT JSON DATE NORMAL DATE START --------------------------------------- //
    ConvertJsonDateString(jsonDate) {
        let shortDate = null;
        if (jsonDate) {
            let regex = /-?\d+/;
            let matches = regex.exec(jsonDate);
            let dt = new Date(parseInt(matches[0]));
            let dateString = new Date(dt).toUTCString();
            dateString = dateString.split(' ').slice(0, 4).join(' ');
            shortDate = dateString;
        }
        return shortDate;
    };

    // --------------------------------------- CONVERT JSON DATE NORMAL DATE END --------------------------------------- //

    // --------------------------------------- CONVERT IMAGE INTO BASE64 START --------------------------------------- //
    convertImageToBase64 = (file, id) => {
        // Get the remote image as a Blob with the fetch API
        fetch(file)
            .then((res) => res.blob())
            .then((blob) => {
                // Read the Blob as DataURL using the FileReader API
                const reader = new FileReader();
                reader.onloadend = () => {
                    localStorage.setItem(id, reader.result)
                };
                reader.readAsDataURL(blob);
            });
    }

    // --------------------------------------- CONVERT IMAGE INTO BASE64 END --------------------------------------- //



}







export default new reUsableFunctions();