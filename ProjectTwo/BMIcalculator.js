const form = document.querySelector('form');
form.addEventListener('submit',function(e){
    e.preventDefault()

    const height = parseInt(document.querySelector("#height").value);
    const weight = parseInt(document.querySelector("#weight").value);
    const results = document.querySelector("#results");

    if(height === '' || height < 0 || isNaN(height)){
        results.innerHTML = "Please give a valid height";
    }

    else if(weight === '' || weight < 0 || isNaN(weight)){
        results.innerHTML = "Please give a valid weight";
    }
    
    else{
        const bmi = (weight/((height*height)/10000)).toFixed(2);
        results.innerHTML = `<span>${bmi}</span>`;
        let bmiCategory ='';

        if(bmi < 18.6) 
            bmiCategory = "Under Weight";

        else if(bmi > 18.6 && bmi < 24.9)
             bmiCategory = "Normal Weight";

        else
            bmiCategory = "Over Weight";

        results.innerHTML = `<p>Your BMI is <strong>${bmi}</strong></p>`;
        results.innerHTML += `<p>You are classified as: <strong>${bmiCategory}</strong></p>`;
    }
});