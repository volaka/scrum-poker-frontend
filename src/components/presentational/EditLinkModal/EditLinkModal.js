import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Input, Modal } from 'semantic-ui-react';

const EditLinkModal =
  ({ handleOpen, modalOpen, handleClose, dbLink,
     newLink, handleLinkChange, submitNewLink }) => (
  <Modal
    trigger={<CustomButton handleOpen={handleOpen} />}
    open={modalOpen}
    onClose={handleClose}
    size='tiny'
  >
    <Modal.Content>
      <Input
        label={'/poker-planning-view-as-developer/'}
        placeholder={dbLink}
        value={newLink}
        onChange={handleLinkChange}
        open={modalOpen}
        onClose={handleClose}
      />
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' inverted onClick={handleClose}>
        <Icon name='remove' /> Cancel
      </Button>
      <Button color='green' inverted onClick={submitNewLink}>
        <Icon name='checkmark' /> Save
      </Button>
    </Modal.Actions>
  </Modal>
);

EditLinkModal.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  dbLink: PropTypes.string.isRequired,
  newLink: PropTypes.string,
  handleLinkChange: PropTypes.func.isRequired,
  submitNewLink: PropTypes.func.isRequired,
};

const CustomButton = ({ handleOpen }) => (
  <Button primary inverted animated onClick={handleOpen}>
    <Button.Content hidden>Edit</Button.Content>
    <Button.Content visible>
      <Icon name='edit outline' />
    </Button.Content>
  </Button>
);

CustomButton.propTypes = {
  handleOpen: PropTypes.func.isRequired,
};

export default EditLinkModal;
