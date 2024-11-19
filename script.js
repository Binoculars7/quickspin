const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
    }
    return colors;
};

let pieColors = generateColors(12);



const questions = [
    "What is the largest planet in the solar system?  Ans: Jupiter",
    "Who wrote 'Romeo and Juliet'?  Ans: William Shakespeare",
    "What is the speed of light? Ans: 3 x 10^8 m/s",
    "What is the square root of 64?  Ans: 8",
    "Who discovered penicillin?  Ans: Alexander Fleming",
    "Name one bird that cannot fly?  Ans: Ostrict, Penguins, Kiwi, Emu etc.",
    "Who painted the Mona Lisa?  Ans: Leonardo da Vinci",
    "What is the smallest country in the world? Ans: Vatican City",
    "What is the longest river in the world? Ans: Nile",
    "Who is known as the 'Father of Computers'?  Ans: Charles Babbage",
    "What is the tallest mountain in the world?  Ans: Mount Everest",
    "Who invented the telephone?  Ans: Alexander Graham Bell",
    "What is the currency of the United States?  Ans: United States Dollar (USD)",
    "What is the boiling point of water? <br> Ans: 100°C"
];

const realquestion = document.getElementById('real-question');


const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 3 },
    { minDegree: 31, maxDegree: 60, value: 2 },
    { minDegree: 61, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 120, value: 12 },
    { minDegree: 121, maxDegree: 150, value: 11 },
    { minDegree: 151, maxDegree: 180, value: 10 },
    { minDegree: 181, maxDegree: 210, value: 9 },
    { minDegree: 211, maxDegree: 240, value: 8 },
    { minDegree: 241, maxDegree: 270, value: 7 },
    { minDegree: 271, maxDegree: 300, value: 6 },
    { minDegree: 301, maxDegree: 330, value: 5 },
    { minDegree: 331, maxDegree: 360, value: 4 },
];

let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [{
            backgroundColor: pieColors,
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        }],
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: { display: false },
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 15 },
          // Controls alignment relative to the anchor

            },
        },
    },
});

const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalValue.innerHTML = `<p><small><b>You selected question ${i.value}</b></small></p>`;
            realquestion.textContent = questions[i.value];
            spinBtn.disabled = false;
            break;
        }
    }
};

let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p><small><b>Spinning the wheel. Good luck!</b></small></p>`;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});