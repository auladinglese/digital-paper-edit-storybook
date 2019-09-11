import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import List from './index.js';
import SimpleCard from '../SimpleCard';
import TranscriptCard from '../TranscriptCard';
import { items, transItems, searchActions } from './stories/index.stories';
import { cardActions } from '../SimpleCard/stories/index.stories';

describe('List component', () => {
  const onDelete = sinon.spy();
  const simpleCardList = shallow(<List items={ items } { ...cardActions } { ...searchActions } />);
  const transcriptCardList = shallow(<List { ...cardActions } { ...searchActions } items={ transItems } />);
  const mountedTranscriptCardList = mount(<MemoryRouter><List handleDelete={ onDelete } items={ transItems } /></MemoryRouter>);

  it('Should render correctly with Simple Cards and Transcript Cards', () => {
    expect(simpleCardList).toMatchSnapshot();
    expect(transcriptCardList).toMatchSnapshot();
  });

  it('Should correctly render multiple SimpleCard components', () => {
    expect(simpleCardList.find(SimpleCard).length).toBe(2);
  });

  it('Should correctly render multiple TranscriptCard components', () => {
    expect(transcriptCardList.find(TranscriptCard).length).toBe(3);
    expect(mountedTranscriptCardList.find(TranscriptCard).length).toBe(3);
    expect(mountedTranscriptCardList.find('Button').find({ variant: 'success' }).length).toBe(1);
    expect(mountedTranscriptCardList.find('Button').find({ variant: 'info' }).length).toBe(1);
    expect(mountedTranscriptCardList.find('Button').find({ variant: 'danger' }).length).toBe(1);
  });

  it('Should handle updating after a Simple Card is deleted', () => {
    window.confirm = jest.fn(() => true);
    const clickedComponent = mount(<MemoryRouter><List handleDelete={ onDelete } items={ items }/></MemoryRouter>);
    expect(clickedComponent.find(SimpleCard).length).toBe(2);
    clickedComponent.find('.delete-button').first().simulate('click');
    expect(clickedComponent.find(SimpleCard).length).toBe(1);
  });

  it('Should handle updating after a Transcript Card is deleted', () => {
    window.confirm = jest.fn(() => true);
    expect(mountedTranscriptCardList.find(TranscriptCard).length).toBe(3);
    mountedTranscriptCardList.find('.delete-button').first().simulate('click');
    mountedTranscriptCardList.find('.delete-button').first().simulate('click');
    expect(mountedTranscriptCardList.find(TranscriptCard).length).toBe(1);
  });

  describe('Search component', () => {
    //   Add tests for SearchBar functionality
  });
});