import { predict, loadModel } from "./model.js";


// setTimeout(loadModel().then(document.querySelector('.loading').style.display = 'none'),2000);


var image_container = document.getElementById("input_img");
const file_name = document.getElementById("file_name");
const input_file = document.getElementById("input_file")
const predictionBox = document.querySelector(".prediction");


var probabilities = [
    { order: 0, name: 'normal driving', probability: 0.0 },
    { order: 1, name: 'texting - right', probability: 0.0 },
    { order: 2, name: 'talking on the phone - right', probability: 0.0 },
    { order: 3, name: 'texting - left', probability: 0.0 },
    { order: 4, name: 'talking on the phone - left', probability: 0.0 },
    { order: 5, name: 'operating the radio', probability: 0.0 },
    { order: 6, name: 'drinking', probability: 0.0 },
    { order: 7, name: 'reaching behind', probability: 0.0 },
    { order: 8, name: 'hair and makeup', probability: 0.0 },
    { order: 9, name: 'talking to passenger', probability: 0.0 },
];

  


// create the prediction box
probabilities.forEach(({name, probability}) => {
    let container = document.createElement("div")
    let class_name = document.createElement("span");
    let class_probability = document.createElement("span");

    class_name.textContent = name;
    class_probability.textContent = "% "+(100 * probability).toFixed(2);

    container.appendChild(class_name);
    container.appendChild(class_probability);
    predictionBox.appendChild(container);
});


// update the prediction box values and orders
function updatePredictionBox() {
    probabilities.forEach(({order, probability}, index) => {
        let container = predictionBox.children[order];
        container.style.width  = `calc(${probability} * 15vw + 20vw)`;

        probabilities[0].order = index; 

        container.style.order = index;

        let class_probability = container.lastElementChild;
        class_probability.textContent = "% "+(100 * probability).toFixed(2);
    })
}



function updateProbabilties(new_probabilities) {
    for(let i = 0; i < new_probabilities.length; i++) {
        let index = probabilities.find(item => item.order === i).order;
        probabilities[index].probability = new_probabilities[i];
    }
}

input_file.addEventListener("change", () => {
    let img = input_file.files[0];
    let img_name = img["name"];

    file_name.textContent = img_name;
    image_container.src = URL.createObjectURL(img);
    

    // test
    let new_probabilities = [0.223, 0.01,0.01,
                            0.02,0.01,0.5234,
                            0.03,0.05,0.01,
                             0.01]

    // let new_probabilities = predict(img).then();

    updateProbabilties(new_probabilities);
    probabilities = probabilities.sort((a, b) => b.probability - a.probability);
    updatePredictionBox();

})


  
