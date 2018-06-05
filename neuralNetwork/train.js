import fs from 'fs';
const brain = require('brain.js');
const net = new brain.NeuralNetwork();
import data from './projects';
//
// function getResourceWeight(stage) {
//   if (stage.children && Array.isArray(stage.children) && stage.children.length > 0) {
//     return stage.children.map(getResourceWeight).reduce((a, b) => a + b, 0);
//   }
//   return stage.resources.map(el => el.value * stage.value).reduce((a, b) => a + b, 0);
// }
function fixLengths(data) {
  let maxLengthInput = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].input.length > maxLengthInput) {
      maxLengthInput = data[i].input.length;
    }
  }
  console.log(maxLengthInput);
  for (let i = 0; i < data.length; i++) {
    while (data[i].input.length < maxLengthInput) {
      data[i].input.push(0);
    }
  }

  return data;
}

function iterateStage(stage) {
  let result = [];
  if (stage.resources) {
    let value = (stage.value || 1) * (stage.resources.map(el => el.value).reduce((a, b) => a + b, 0) || 0);
    // if (value > 1) {
    //   value = 1;
    // }
    result.push(value);
  }
  if (stage.children && Array.isArray(stage.children) && stage.children.length > 0) {
    stage.children.forEach((el) => {
      result = result.concat(iterateStage(el))
    });
  }
  return result
}

export default function () {
  const trainingData = data.map((project) => {
    return {
      output: [project.result,
        // risks: project.risks.map(el => 1 / el),
      ],
      input: iterateStage(project.stages[0]),
    };
  });
  console.log('projects dataset created.');
  console.log(trainingData);
  debugger;
  console.log('start training.');
  net.train(fixLengths(trainingData), {
    errorThresh: 0.01,
    iterations: 20000,
    log: true,
    hiddenSizes:[20,20],
    outputSize: 20,
    inputSize: 20,
    inputRange: 20,
    logPeriod: 100,
    learningRate: 0.01,
  });

  console.log('projects dataset with Brain.js train done.');
  fs.writeFile('./neuralNetwork/network/20Projects_a_query_3000_0.0006.json',
    JSON.stringify(net.toJSON(), null, 2), (err) => {
      console.log(err);
    });
  console.log('project dataset with Brain.js saved to ./neuralNetwork/network/20Projects_a_query_3000_0.0006.json');


  console.log('--------TEST RUN------');
  const testData = iterateStage({
    "resources":[
      {
        "id":3,
        "value":0.18133856279555008
      },
      {
        "id":1,
        "value":0.12560201983616467
      },
      {
        "id":0,
        "value":0.1799393731949595
      }
    ],
    "children":[
      {
        "resources":[
          {
            "id":2,
            "value":0.11654948336885639
          },
          {
            "id":1,
            "value":0.15791828561576643
          },
          {
            "id":0,
            "value":0.10586907231531369
          },
          {
            "id":3,
            "value":0.15539921450018201
          }
        ],
        "children":[
          {
            "resources":[
              {
                "id":1,
                "value":0.19775941766254654
              },
              {
                "id":0,
                "value":0.015677166374606078
              },
              {
                "id":2
              }
            ],
            "children":[
              {
                "resources":[
                  {
                    "id":0,
                    "value":0.11251833734122757
                  },
                  {
                    "id":3,
                    "value":0.15973943240799945
                  }
                ],
                "children":[
                ],
                "value":2
              },
              {
                "resources":[
                  {
                    "id":2,
                    "value":0.015136331192384934
                  },
                  {
                    "id":3,
                    "value":0.1899277474133487
                  }
                ],
                "children":[
                ],
                "value":2
              }
            ],
            "value":1
          }
        ],
        "value":2
      },
      {
        "resources":[
          {
            "id":0,
            "value":0.09628635330630649
          },
          {
            "id":3,
            "value":0.174117981945927
          }
        ],
        "children":[
        ],
        "value":6
      }
    ],
    "value":8
  });
  while (testData.length < 10) {
    testData.push(0);
  }
  console.log(testData);
  console.log(net.run(testData));
  console.log(net.run(testData));
}
