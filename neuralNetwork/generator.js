/**
 * Created by ddanilets on 04.06.18.
 */

function generate() {
  const result = stageGenerator();
  depthLevel = 0;
  return result;
}

function stageGenerator() {
  return {
    resources: getResources(),
    children: getChildren(),
    value: getValue(),
  };
}

const resourceCapacity = {
  0: 1,
  1: 1,
  2: 1,
  3: 1
};


let depthLevel = 0;
const maxDepthLevel = 6;

function getResources() {
  const resources = [];
  const usedResources = {};
  let workResource = getResource();
  while (!usedResources[workResource.id]) {
    resources.push(workResource);
    usedResources[workResource.id] = workResource;
    workResource = getResource();
  }
  return resources;
}

function getChildren() {
  if (Math.random() < 0.8 && depthLevel < maxDepthLevel) {
    depthLevel++;
    return new Array(Math.floor(Math.random() * 3)).fill(null).map((el) => {
      return stageGenerator();
    });
  }
}

function getValue() {
  return Math.floor(Math.random() * 10);
}

function getResource() {
  const id = Math.floor(Math.random() * 4);
  const rawValue = Math.random() * 0.2;
  const value = getResourceValue(rawValue, id);
  resourceCapacity[id] -= value;
  return {
    id,
    value,
  };
}

function getResourceValue(value, id) {
  if (value > resourceCapacity[id]) {
    getResourceValue(value / 2, id)
  } else {
    return value;
  }
}