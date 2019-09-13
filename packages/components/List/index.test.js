import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import List from './index.js';
import SimpleCard from '../SimpleCard';
import TranscriptCard from '../TranscriptCard';
import SearchBar from './SearchBar/';
import { items, transItems, searchActions } from './stories/index.stories';
import { cardActions } from '../SimpleCard/stories/index.stories';
import addons, { mockChannel } from '@storybook/addons';

addons.setChannel(mockChannel());

describe('List component', () => {
  const onDelete = sinon.spy();
  const simpleCardList = shallow(<List items={ items } { ...cardActions } { ...searchActions } />);
  const transcriptCardList = shallow(<List { ...cardActions } { ...searchActions } items={ transItems } />);

  it('Should render SimpleCards and TranscriptCards', () => {
    expect(simpleCardList.exists()).toBe(true);
    expect(transcriptCardList.exists()).toBe(true);
  });

  it('Simple Cards and TranscriptCards should match snapshots', () => {
    expect(simpleCardList).toMatchSnapshot();
    expect(transcriptCardList).toMatchSnapshot();
  });

  it('Should correctly render multiple SimpleCard components', () => {
    expect(simpleCardList.find(SimpleCard).length).toBe(2);
  });

  it('Should correctly render multiple TranscriptCard components', () => {
    const mountedTranscriptCardList = mount(<MemoryRouter><List handleDelete={ onDelete } items={ transItems } /></MemoryRouter>);
    expect(mountedTranscriptCardList.find(TranscriptCard).length).toBe(3);
    expect(mountedTranscriptCardList.find('Button').find({ variant: 'success' }).length).toBe(1);
    expect(mountedTranscriptCardList.find('Button').find({ variant: 'info' }).length).toBe(1);
    expect(mountedTranscriptCardList.find('Button').find({ variant: 'danger' }).length).toBe(1);
    mountedTranscriptCardList.unmount();
  });

  it('Should handle updating after a Simple Card is deleted', () => {
    window.confirm = jest.fn(() => true);
    const clickedComponent = mount(<MemoryRouter><List handleDelete={ onDelete } items={ items }/></MemoryRouter>);
    expect(clickedComponent.find(SimpleCard).length).toBe(2);
    clickedComponent.find({ 'aria-label': 'Delete button' }).first().simulate('click');
    expect(clickedComponent.find(SimpleCard).length).toBe(1);
    clickedComponent.unmount();
  });

  it('Should handle updating after a Transcript Card is deleted', () => {
    const mountedTranscriptCardList = mount(<MemoryRouter><List handleDelete={ onDelete } items={ transItems } /></MemoryRouter>);
    window.confirm = jest.fn(() => true);
    expect(mountedTranscriptCardList.find(TranscriptCard).length).toBe(3);
    mountedTranscriptCardList.find({ 'aria-label': 'Delete button' }).first().simulate('click');
    mountedTranscriptCardList.find({ 'aria-label': 'Delete button' }).first().simulate('click');
    expect(mountedTranscriptCardList.find(TranscriptCard).length).toBe(1);
    mountedTranscriptCardList.unmount();
  });

  it('Should handle updating after a search', () => {
    const mountedTranscriptCardList = mount(<MemoryRouter><List handleDelete={ onDelete } items={ transItems } /></MemoryRouter>);
    expect(mountedTranscriptCardList.find(TranscriptCard).length).toBe(3);
    mountedTranscriptCardList.find({ 'aria-label': 'search' }).first().simulate('change', {
      target: { value: 'In Progress' }
    });
    expect(mountedTranscriptCardList.find({ 'aria-label': 'search' }).first().props().value).toEqual('In Progress');
    expect(mountedTranscriptCardList.find(TranscriptCard).length).toBe(1);
    mountedTranscriptCardList.unmount();
  });
});

describe('SearchBar component', () => {
  const searchBar = shallow(<SearchBar handleSearch={ () => { } } />);
  it('Should update props when input changes', () => {
    searchBar.find({ 'aria-label': 'search' }).simulate('change', {
      target: { value: 'Title Two' }
    });
    expect(searchBar.find({ 'aria-label': 'search' }).props().value).toEqual('Title Two');
  });
});