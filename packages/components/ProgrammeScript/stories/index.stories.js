import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProgrammeScript from '../index.js';

export const handleUpdate = action('Handle reorder');

const programme = {
  elements:
  [
    {
      type: 'title',
      text: 'An immense Achievement'
    },
    {
      type: 'paper-cut',
      id: 1,
      speaker: 'Mr Loud',
      words: [ { text:'Greatest day of my life was when I wrote this text.', start: 0, end: 1 } ]
    },
    {
      type: 'note',
      text: 'Maybe a little bit obnoxious'
    },
    {
      type: 'paper-cut',
      id: 2,
      speaker: 'Mrs Loud',
      words: [ { text:'Greatest day of my life was when I spoke this text.', start: 0, end: 1 } ]
    },
    {
      type: 'voice-over',
      text: 'link: wonderful times of the Loud family'
    },
  ],
  title: 'Something'
};
const annotation = {
  'id':'1idcjw29xii80000ird74yb19swa',
  'start':14.38,
  'end':18.14,
  'labelId':'129cjw29xii80000ird74yb19swa',
  'note':'optional example text description for an annotation - TEST 2'
};

const transcripts = [
  {
    'id':'19cjw29xii80000ird74yb19swa',
    'description':'Transcript zero description',
    'url':'https://download.ted.com/talks/KateDarling_2018S-950k.mp4',
    'clipName':'KateDarling_2018S-950k.mp4',
    'status':'done',
    'transcript':{
      'words':[
        { 'id':0, 'start':13.02, 'end':13.17, 'text':'There' },
        { 'id':1, 'start':13.17, 'end':13.38, 'text':'is' },
        { 'id':2, 'start':13.38, 'end':13.44, 'text':'a' },
        { 'id':3, 'start':13.44, 'end':13.86, 'text':'day.' },
        { 'id':4, 'start':13.86, 'end':14.13, 'text':'About' },
        { 'id':5, 'start':14.13, 'end':14.38, 'text':'ten' },
        { 'id':6, 'start':14.38, 'end':14.61, 'text':'years', 'annotation':annotation },
        { 'id':7, 'start':14.61, 'end':15.15, 'text':'ago', 'annotation':annotation },
        { 'id':8, 'start':15.47, 'end':15.59, 'text':'when', 'annotation':annotation },
        { 'id':9, 'start':15.68, 'end':15.84, 'text':'I', 'annotation':annotation },
        { 'id':10, 'start':15.86, 'end':16.19, 'text':'asked', 'annotation':annotation },
        { 'id':11, 'start':16.19, 'end':16.28, 'text':'a', 'annotation':annotation },
        { 'id':12, 'start':16.28, 'end':16.65, 'text':'friend', 'annotation':annotation },
        { 'id':13, 'start':16.65, 'end':16.74, 'text':'to', 'annotation':annotation },
        { 'id':14, 'start':16.74, 'end':17.2, 'text':'hold', 'annotation':annotation },
        { 'id':15, 'start':17.23, 'end':17.33, 'text':'a', 'annotation':annotation },
        { 'id':16, 'start':17.33, 'end':17.63, 'text':'baby', 'annotation':annotation },
        { 'id':17, 'start':17.63, 'end':18.14, 'text':'dinosaur', 'annotation':annotation },
        { 'id':18, 'start':18.14, 'end':18.59, 'text':'robot' },
        { 'id':19, 'start':18.72, 'end':19.17, 'text':'upside' },
        { 'id':20, 'start':19.17, 'end':19.58, 'text':'down.' },
        { 'id':21, 'start':21.83, 'end':21.9, 'text':'It' },
        { 'id':22, 'start':21.95, 'end':22.09, 'text':'was' },
        { 'id':23, 'start':22.1, 'end':22.22, 'text':'a' },
        { 'id':24, 'start':22.23, 'end':22.68, 'text':'toy' },
        { 'id':25, 'start':22.72, 'end':22.99, 'text':'called' },
        { 'id':26, 'start':23.03, 'end':23.39, 'text':'plea.' },
      ],
      'paragraphs':[
        { 'id':0, 'start':13.02, 'end':13.86, 'speaker':'TBC 0' },
        { 'id':1, 'start':13.86, 'end':19.58, 'speaker':'TBC 1' },
        { 'id':2, 'start':21.83, 'end':23.39, 'speaker':'test' },
      ]
    },
    'projectTitle':'Project title One!',
    'transcriptTitle':'Kate Darling Ted Talk',
    'annotations':[ annotation ]
  }
];

storiesOf('ProgrammeScript', module)
  .add('Default', () =>
    <ProgrammeScript
      programme={ programme }
      transcripts={ transcripts }
      handleUpdate={ handleUpdate }
    />
  );
