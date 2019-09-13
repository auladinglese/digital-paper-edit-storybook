import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleUp,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../Breadcrumb/';
import PropTypes from 'prop-types';

import Transcripts from '../Transcripts/';
import ProgrammeScript from '../ProgrammeScript/';

const PaperEdit = (props) => {
  const projectId = props.match.params.projectId;
  const papereditId = props.match.params.papereditId;
  const [ isTranscriptsShown, setIsTranscriptsShown ] = useState(true);
  const [ isProgramScriptShown, setIsProgramScriptShown ] = useState(true);

  // ApiWrapper.get_ProgrammeScriptAndTranscripts(this.state.projectId, this.state.papereditId)

  const toggleTranscripts = () => {
    if (isProgramScriptShown ) {
      setIsTranscriptsShown(!isTranscriptsShown);
    }
  };

  const toggleProgramScript = () => {
    if (isTranscriptsShown ) {
      setIsProgramScriptShown(!isProgramScriptShown);
    }
  };

  return (
    <Container style={ { marginBottom: '5em' } } fluid>
      <br/>
      <Row>
        <Col sm={ 12 } md={ 12 } ld={ 12 } xl={ 12 }>
          <Breadcrumb
            items={ [ {
              name: 'Projects',
              link: '/projects'
            },
            {
              name: `Project: ${ props.projectTitle }`,
              link: `/projects/${ projectId }`
            },
            {
              name: 'PaperEdits',
            },
            {
              name: `${ props.programmeTitle }`
            }
            ] }
          />
        </Col>
      </Row>

      <Container fluid={ true }>
        <div className="d-flex flex-column">
          <ButtonGroup
            size="sm" className="mt-12"
          >
            <Button
              onClick={ toggleTranscripts }
              variant={ isTranscriptsShown ? 'secondary' : 'outline-secondary' }
            >
              {/* Transcripts <FontAwesomeIcon icon={ isTranscriptsShown ? faAngleDown : faAngleUp } /> { isTranscriptsShown ? 'hide' : 'show'} */}
            </Button>
            <Button
              onClick={ toggleProgramScript }
              variant={ isProgramScriptShown ? 'secondary' : 'outline-secondary' }
            >
                 Program Script  <FontAwesomeIcon icon={ isProgramScriptShown ? faAngleDown : faAngleUp } />  { isProgramScriptShown ? 'hide' : 'show'}
            </Button>
          </ButtonGroup>
        </div>

        <Row>
          <Col
            xs={ { span: 12, offset:0 } }
            sm={ {
              span: isProgramScriptShown ? 7 : 12,
              offset: isProgramScriptShown ? 0 : 0
            } }
            md={ {
              span: isProgramScriptShown ? 7 : 12,
              offset: isProgramScriptShown ? 0 : 0
            } }
            lg={ {
              span: isProgramScriptShown ? 7 : 10,
              offset: isProgramScriptShown ? 0 : 1
            } }
            xl={ {
              span: isProgramScriptShown ? 7 : 10,
              offset: isProgramScriptShown ? 0 : 1
            } }
            style={ { display: isTranscriptsShown ? 'block' : 'none' } }
          >
            {/* { props.transcripts.length ?
              <Transcripts
                projectId={ projectId }
                transcripts={ props.transcripts }
                labelsOptions={ props.labelsOptions }
                videoHeight={ props.videoHeight }
              />
              : <><br/><br/><i>No Transcripts, create a transcript to get started</i></>} */}
          </Col>
          <Col
            xs={ { span: 12, offset:0 } }
            sm={ {
              span: isTranscriptsShown ? 5 : 12,
              offset: isTranscriptsShown ? 0 : 0
            } }
            md={ {
              span: isTranscriptsShown ? 5 : 12,
              offset: isTranscriptsShown ? 0 : 0
            } }
            lg={ {
              span: isTranscriptsShown ? 5 : 10,
              offset: isTranscriptsShown ? 0 : 1
            } }
            xl={ {
              span: isTranscriptsShown ? 5 : 8,
              offset: isTranscriptsShown ? 0 : 2
            } }
            style={ { display: isProgramScriptShown ? 'block' : 'none' } }
          >
            <ProgrammeScript
              projectId={ projectId }
              papereditId={ papereditId }
              transcripts={ props.transcripts }
              videoHeight={ props.videoHeight }
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

PaperEdit.defaultProps = {
  projectTitle: '',
  programmeTitle: '',
  transcripts: [],
  labelsOptions: []
};

PaperEdit.propTypes = {
  match: PropTypes.any,
  videoHeight: PropTypes.any,
  projectTitle: PropTypes.string,
  programmeTitle: PropTypes.string,
  transcripts: PropTypes.any,
  labelsOptions: PropTypes.any
};

export default PaperEdit;
