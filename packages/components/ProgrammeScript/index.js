import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import cuid from 'cuid';
import getUserTranscriptSelection from './get-data-from-user-selection.js';
import PropTypes from 'prop-types';
import {
  selectionToParagraphs,
  hasDifferentSpeaker,
} from './divide-words-selections-into-paragraphs/index.js';

import PreviewCanvas from '../PreviewCanvas/';
import ProgrammeScriptContainer from '../ProgrammeScriptContainer';
import Menu from './Menu';

const getInsertPoint = (elements) => {
  const insertPoint = elements.find((el) => el.type === 'insert');

  return elements.indexOf(insertPoint);;
};

const removeInsert = (elements) => {
  const newElements = elements;
  const insertPoint = getInsertPoint();
  newElements.splice(insertPoint, 1);

  return newElements;
};

const addAboveInsertPoint = (element, elements) => {
  const newElements = elements;
  const insertPoint = getInsertPoint();
  newElements.splice(insertPoint, 0, element);

  return newElements;
};

const addPaperCuts = (paperCuts, elements) => {
  const newElements = elements;
  paperCuts
    .reverse()
    .forEach(paperCut => addAboveInsertPoint(paperCut, newElements));

  return newElements;
};

const createPaperCut = (selection, index) => {
  return {
    id: cuid(),
    index: index,
    type: 'paper-cut',
    start: selection.start,
    end: selection.end,
    speaker: selection.speaker,
    words: selection.words,
    transcriptId: selection.transcriptId,
    labelId: []
  };
};

const createPaperCuts = (paragraphs, index) => {
  const i = index;

  return paragraphs.map((paragraph) => {
    const firstWord = paragraph[0];
    const lastWord = paragraph[paragraph.length - 1];
    const selection = {
      start: firstWord.start,
      end: lastWord.end,
      speaker: firstWord.speaker,
      words: paragraph,
      transcriptId: firstWord.transcriptId,
    };

    const paperCut = createPaperCut(selection, i);
    i++;

    return paperCut;
  });
};

const addSelection = (selection, elements) => {
  const words = selection.words;
  const index = elements.length;
  let newElements;

  if (hasDifferentSpeaker(words)) {
    const paragraphs = selectionToParagraphs(words);
    const paperCuts = createPaperCuts(paragraphs, index);
    newElements = addPaperCuts(paperCuts, elements);
  } else {
    const paperCut = createPaperCut(selection, index);
    newElements = addAboveInsertPoint(paperCut, elements);
  }

  return newElements;
};
const ProgrammeScript = (props) => {

  // const fetchPaperEdit = async () => {
  //   const pe = await ApiWrapper.getPaperEdit(props.projectId, props.papereditId);
  //   const newElements = pe.programmeScript.elements;
  //   newElements.push({ type: 'insert', text: 'Insert Point to add selection' });
  //   setElements(newElements);

  //   return (pe.programmeScript);
  // };
  const [ elements, setElements ] = useState(props.programme.elements);
  const [ playlist, setPlaylist ] = useState([]);
  const [ resetPreview, setResetPreview ] = useState(false);

  // if (!programme) {
  // fetchPaperEdit();
  // }
  useEffect(() => {

  }, [ ]);

  // TODO: save to server
  const handleReorder = (items) => {
    setElements(items);
  };

  const handleAddElement = (type) => {
    const text = prompt('Add some text for a section title', 'Some place holder text');
    const insertPoint = getInsertPoint();

    const newElement = {
      id: cuid(),
      index: elements.length,
      type: type,
      text: text
    };

    const newElements = elements;
    newElements.splice(insertPoint, 0, newElement);
    setElements(newElements);
  };

  // TODO: save to server
  const handleDeleteElement = (index) => {
    const newElements = elements;
    newElements.splice(index, 1);
    setElements(newElements);

    // TODO: add a prompt, like are you sure you want to delete, confirm etc..?
    // alert('handle delete');

  };

  const handleEditElement = (index) => {
    const currentElement = elements[index];
    const newText = prompt('Edit', currentElement.text);
    if (newText) {
      currentElement.text = newText;

      const newElements = elements;
      newElements[index] = currentElement;
      setElements(newElements);
      // TODO: consider using set state function to avoid race condition? if needed?
      // this.setState(({ programmeScript }) => {
      //   return {
      //     programmeScript: programmeScript
      //   };
      // });
    }
  };

  const getTranscript = (transcriptId) => {
    return props.transcripts.find((tr) => tr.id === transcriptId );
  };

  const getPlayList = () => {
    let startTime = 0;

    return elements.filter((element) => element.type === 'paper-cut')
      .map((element) => {
        // TODO: handle audio only type (eg for radio), get from transcript json?
        const result = {
          type:'video',
          start: startTime,
          sourceStart: element.start,
          duration: element.end - element.start,
          src: getTranscript(element.transcriptId).url
        };

        startTime += result.duration;

        return result;
      });
  };

  const handleUpdatePreview = async () => {
    const newPlaylist = getPlayList();
    // Workaround to mound and unmount the `PreviewCanvas` component
    // to update the playlist
    setResetPreview(true);
    setPlaylist(newPlaylist);
    setResetPreview(false);
  };

  const handleDoubleClick = (e) => {

    if (e.target.className === 'words') {
      const wordCurrentTime = e.target.dataset.start;
      // TODO: set current time in preview canvas
      // Video context probably needs more info like, which clip/track in the sequence?
      // investigate how to set currentTime in video context
      console.log('wordCurrentTime::', wordCurrentTime);
    }
  };

  const handleSave = async () => {
    if (props.programme) {
      const programme = props.programme;
      programme.elements = removeInsert(elements);
      // wrap apiWrapper into a function with props. projectId + paperEditId
      // const json = await ApiWrapper.updatePaperEdit(props.projectId, props.papereditId, programme);
      const json = await props.handleUpdate(programme);
      if (json.status === 'ok') {
        alert('saved programme script');
      }
      // TODO: figure out how to update preview
      // , () => {
      //   this.handleUpdatePreview();
      // }
      // );

    }
  };

  // TODO: save to server
  // TODO: needs to handle when selection spans across multiple paragraphs
  const handleAddTranscript = () => {
    const selection = getUserTranscriptSelection();
    console.log('selection', selection);
    if (selection) {
      const newElements = addSelection(selection, elements);
      console.log('els', newElements);
      setElements(newElements);
    }
    else {
      alert('Select some text in the transcript to add to the programme script');
    }
  };

  let container = null;
  if (elements) {
    container = (
      <ProgrammeScriptContainer
        items={ elements }
        handleReorder={ handleReorder }
        handleDeleteElement={ handleDeleteElement }
        handleEditElement={ handleEditElement }
      />
    );
  }

  const ProgrammeScriptCardBody = (
    <Card.Body>
      <article
        style={ { height: '60vh', overflow: 'scroll' } }
        onDoubleClick={ handleDoubleClick }
      >
        {container}
      </article>
    </Card.Body>
  );

  const PreviewCardHeader = (
    <Card.Header>
      { !resetPreview ?
        <PreviewCanvas playlist={ playlist } />
        : null }
    </Card.Header>
  );

  const MenuCardHeader = (
    <Card.Header>
      <Menu
        programme={ props.programme }
        transcripts={ props.transcripts }
        handleAddTranscriptSelection={ handleAddTranscript }
        handleAddElement={ handleAddElement }
        handleUpdatePreview={ handleUpdatePreview }
        handleSave={ handleSave }
      />
    </Card.Header>
  );

  const title = props.programme ? props.programme.title : '';

  // information around progressbar in the playlist object
  return (
    <>
      <h2
        className={ 'text-truncate text-muted' }
        title={ `Programme Script Title: ${ title }` }>
        {title}
      </h2>
      <Card>
        {PreviewCardHeader}
        {MenuCardHeader}
        {ProgrammeScriptCardBody}
      </Card>
    </>
  );
};

ProgrammeScript.propTypes = {
  programme: PropTypes.any,
  transcripts: PropTypes.any,
  handleUpdate: PropTypes.any
};

export default ProgrammeScript;
