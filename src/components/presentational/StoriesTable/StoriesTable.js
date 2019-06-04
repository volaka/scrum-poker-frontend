import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Table } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const StoriesTable = ({ stories }) => (
  // eslint-disable-next-line no-nested-ternary
  stories.stories.length === 0 && stories.loading ?
    <Dimmer active inverted>
      <Loader />
    </Dimmer> :
    stories.error ?
      <ErrorMessage message={stories.error} /> :
      <Table celled id={'story-table'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Story</Table.HeaderCell>
            <Table.HeaderCell>Story Point</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            stories.stories.map(story => (
              <Table.Row key={story.id}>
                <Table.Cell>{story.name}</Table.Cell>
                <Table.Cell>{story.point || ''}</Table.Cell>
                <Table.Cell>{story.status}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
);

StoriesTable.propTypes = {
  stories: PropTypes.object.isRequired,
};

export default StoriesTable;
