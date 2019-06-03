import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Table } from 'semantic-ui-react';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const StoriesTable = ({ stories, loading, error }) => (
  // eslint-disable-next-line no-nested-ternary
  loading ?
    <Dimmer active inverted>
      <Loader />
    </Dimmer> :
    error ?
      <ErrorMessage message={error} /> :
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Story</Table.HeaderCell>
            <Table.HeaderCell>Story Point</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            stories.map(story => (
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
  stories: PropTypes.array,
};

export default StoriesTable;
