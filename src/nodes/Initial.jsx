import { useState } from "react";
import TextUpdaterNode from "./TextUpdaterNode";


export const initialNodes = [
  {
    id: '1',
    position: {x:0, y:0},
    data: {label: "bruh"},
    type: 'input',
    sourcePosition: 'bottom'
  },
  {
    id: '2',
    position: {x: 200, y: 80},
    data: {label: '2'},
    targetPosition: 'left'
  },
  {
    id: '3',
    type: 'textUpdater',
    data: {label: "BRUH"},
    position: {x: 100, y: 200}
  }
];

export const initialEdges = [
  {id: '1-2', source: '1', target: '2', type: 'step'},
  {id: '2-3', source: '2', target: '3', data: {label: "Cringe"}}
]

export const nodeTypes = { textUpdater: TextUpdaterNode};
