const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');
const step5 = document.getElementById('step5');

const radio1 = document.getElementById('Radio1');
const radio2 = document.getElementById('Radio2');
const radio3 = document.getElementById('Radio3');
const radio4 = document.getElementById('Radio4');
const radio5 = document.getElementById('Radio5');

let show_div  = (div) => {

    console.log(div);

    const all_div = [step1 ,step2 , step3 , step4 , step5 ];

    all_div.forEach( block => {

        block.style.display = 'none';

    })


    all_radio = [radio1 , radio2 , radio3 , radio4 , radio5];

    all_radio.forEach( radio => {

        radio.checked = false ; 

    })
   


    

    document.getElementById(`${div}`).style.display = 'block';

    document.getElementById(`Radio${div.charAt(div.length - 1 )}`).checked = true;
}



document.getElementById('Radio1').addEventListener('click' ,() => show_div('step1') );
document.getElementById('Radio2').addEventListener('click' , ()=> show_div('step2') );
document.getElementById('Radio3').addEventListener('click' , ()=> show_div('step3') );
document.getElementById('Radio4').addEventListener('click' , ()=> show_div('step4') );
document.getElementById('Radio5').addEventListener('click' , ()=> show_div('step5') );




let updateSubcategory = () => {

    var subcategory_block = document.getElementById('subcategory');
    var category_value = document.getElementById('category').value ; 

    const subcategories = {

        electronics : ['Mobiles' , 'Laptops' , 'Accesories'] ,
        clothing : [ 'Men' , 'Women' , 'Childs'] , 
        home_Appliances : ['Refrigerator' , 'Washing Machine' , 'TV']

    }


        subcategory_block.innerHTML = '' ;

        const default_option = document.createElement('option');

        default_option.value = 'None';
        default_option.disabled = true ; 
        default_option.selected = true ;
        default_option.textContent = 'Select Subcateory';

        subcategory_block.appendChild(default_option);

        subcategories[category_value].forEach( category => {

            const option = document.createElement('option') ;

            option.value = category ;

            option.textContent = category ; 

            subcategory_block.appendChild(option) ;

        });
    
    


}

let count = 0;

let add_image_block = () => {


    var img_cont = document.getElementById('img-cont');
    
    var img_tag = document.createElement('input');



    if (count < 2) {  

        var del_button = document.createElement('button');

        del_button.id = `button${count}`;
        del_button.textContent = 'Remove';
        del_button.className = 'btn btn-secondary';
        del_button.classList.add('m-3');
        del_button.type = 'button';



        del_button.onclick = () => {

            img_tag.remove();  
            del_button.remove();  
            count = count - 1;
            

        };

        img_cont.appendChild(del_button);

        img_tag.type = 'file';
        img_tag.className = 'form-control';
        img_tag.id = `galleryImages${count}`;
        img_tag.name = `galleryImages${count}`;
        img_tag.accept = 'image/*';
        img_tag.multiple = true;

        img_cont.appendChild(img_tag);

        count = count + 1;

    } else {
        alert("You can only upload up to 3 images.");
    }
}






let show_variant = () => {

    var variantType = document.getElementById('variantType').value ; 

    document.getElementById(`${variantType}`).style.display = 'block';
}


let remove_block = (block) => {

    document.getElementById(`${block}`).style.display = 'none' ; 

}






let nextStep = (step) => {

  

   

    if ( step == 'step1'){ 


        var productName = document.getElementById('productName').value ;

        if ( productName == '' ){

            confirm("Fill all Mandatory Details ");
            return 
        }
        
        show_div('step2');

    }
    else if ( step == 'step2'){

        var shortDescription = document.getElementById('shortDescription').value ; 

        if ( shortDescription == '' ){


            confirm("Fill all Mandatory Details ");
            return 
        }

        show_div('step3');

    }

    else if ( step == 'step3'){

        var mainImage = document.getElementById('mainImage').value ;

        if ( mainImage == '' ){


            confirm("Fill all Mandatory Details ");
            return 
        }

        show_div('step4')  ;

    }

    else if ( step == 'step4'){

        show_div('step5') ;

    }

  

}


let go_back = (step) => {

    show_div(step);

}


let final_calculation = () => {


    var basePrice = parseFloat(document.getElementById('basePrice').value) ; 
    var discount= parseFloat(document.getElementById('discount').value) ;  
    var shippingFee = parseFloat(document.getElementById('shippingFee').value) ; 

    var final_price = 0;
    
    if ( shippingFee ){

        final_price = basePrice - (basePrice * discount / 100) + shippingFee ;

    }
    else{

        final_price = basePrice - (basePrice * discount / 100) ;

    }

    document.getElementById('finalPrice').value = '' ; 
    document.getElementById('finalPrice').value = final_price ; 
} 





document.getElementById('productForm').onsubmit = function(event) {

    event.preventDefault();


    var formData = new FormData(this);


    var formDataObject = {};
    var totalFields = formData.entries().length;

    var fieldsProcessed = 0;

    var filesProcessed = 0;


    formData.forEach((value, key) => {


        if (value instanceof File) {

            var reader = new FileReader();


            reader.onloadend = function() {

                formDataObject[key] = reader.result;

                filesProcessed++;


                fieldsProcessed++;

                if (fieldsProcessed === totalFields && filesProcessed === formData.getAll('productImage').length) {

                    localStorage.setItem('productFormData', JSON.stringify(formDataObject));

                    alert('Form Submitted Successfully');

                }
            };



            reader.readAsDataURL(value);


        } else {

            formDataObject[key] = value;

            fieldsProcessed++;

        }
    });

    if (formData.getAll('productImage').length === 0) {

        localStorage.setItem('productFormData', JSON.stringify(formDataObject));

        alert('Form Submitted Successfully');


    }
};








let formData = JSON.parse(localStorage.getItem('productFormData'));

function createEditableTable() {
    if (formData) {
        let headerRow = document.getElementById('header-row');
        let tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

        for (let key in formData) {
            if (formData.hasOwnProperty(key)) {
                let th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            }
        }

        let dataRow = tableBody.insertRow();
        let entryId = formData.productId || 'uniqueId';

        for (let key in formData) {
            if (formData.hasOwnProperty(key)) {
                let cell = dataRow.insertCell();
                let input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control';
                input.value = formData[key];
                input.onblur = function() {
                    formData[key] = input.value;
                    localStorage.setItem('productFormData', JSON.stringify(formData));
                };
                cell.appendChild(input);
            }
        }
    } else {
        alert("No form data found in localStorage.");
    }
}

createEditableTable();

function saveData() {
    localStorage.setItem('productFormData', JSON.stringify(formData));
    alert('Changes saved successfully!');
}
